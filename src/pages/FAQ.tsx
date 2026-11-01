import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import { SOCIAL } from "@/data/site";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/** Pre-written answers: used offline, and rendered on the page (and as FAQ structured data) for search engines. */
const FAQ_ANSWERS: Record<string, string> = {
  "How do I install a shader?": "Install Iris (or OptiFine), put the shader .zip in the shaderpacks folder, then pick it in Video Settings > Shader Packs.",
  "Which launcher should I use?": "Start with the official Minecraft Launcher. Modrinth App and Prism Launcher are good for mods and modpacks.",
  "What is the latest Minecraft version?": "The Downloads and Patch pages show the latest release and snapshot, read live from Mojang's version manifest.",
  "What does the 'unverified' badge mean?": "It marks a mirror on Google Drive, MediaFire or a direct link. We cannot check those files automatically, so scan them and keep backups.",
  "How do I use a Pojav modpack?": "Download the pack, import it in Pojav Launcher, and pick a matching Minecraft version. The Mrpack to Zip converter on the Patch page helps with .mrpack files.",
  "Is this an official Minecraft site?": "No. It is not an official Minecraft product and is not approved by or associated with Mojang or Microsoft.",
  "How do I contact you?": `Email ${SOCIAL.email}, or find Nextup Studio on YouTube (@nextupstudioyt) and Instagram (@vanshu_ag_72).`,
};

const SUGGESTED = Object.keys(FAQ_ANSWERS);

const offlineAnswer = (question: string): string | null => {
  const q = question.trim().toLowerCase();
  for (const [key, value] of Object.entries(FAQ_ANSWERS)) if (key.toLowerCase() === q) return value;
  if (q.includes("shader")) return FAQ_ANSWERS["How do I install a shader?"];
  if (q.includes("launcher")) return FAQ_ANSWERS["Which launcher should I use?"];
  if (q.includes("version") || q.includes("latest") || q.includes("snapshot")) return FAQ_ANSWERS["What is the latest Minecraft version?"];
  if (q.includes("unverified") || q.includes("safe") || q.includes("virus")) return FAQ_ANSWERS["What does the 'unverified' badge mean?"];
  if (q.includes("pojav") || q.includes("modpack")) return FAQ_ANSWERS["How do I use a Pojav modpack?"];
  if (q.includes("official")) return FAQ_ANSWERS["Is this an official Minecraft site?"];
  if (q.includes("contact") || q.includes("support")) return FAQ_ANSWERS["How do I contact you?"];
  return null;
};

/** Safe renderer for **bold** and newlines (no innerHTML). */
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split("\n").map((line, li) => {
      const parts: ReactNode[] = line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith("**") && part.endsWith("**") ? <b key={pi}>{part.slice(2, -2)}</b> : <Fragment key={pi}>{part}</Fragment>,
      );
      return (
        <Fragment key={li}>
          {li > 0 && <br />}
          {parts}
        </Fragment>
      );
    })}
  </>
);

const FAQ = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! Ask me about worlds, shaders, modpacks or launchers on Minecraft Java Hub." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const streamChat = async (history: Message[]): Promise<boolean> => {
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/faq-chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) return false;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      setMessages((p) => [...p, { role: "assistant", content: "" }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const delta = JSON.parse(json).choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((p) => {
                const n = [...p];
                n[n.length - 1] = { role: "assistant", content: acc };
                return n;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      return acc.length > 0;
    } catch {
      return false;
    }
  };

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    const user: Message = { role: "user", content: q };
    const history = [...messages, user].filter((m) => m.content);
    setMessages((p) => [...p, user]);
    setInput("");
    setLoading(true);
    const fallback = offlineAnswer(q);
    let ok = false;
    if (aiAvailable) ok = await streamChat(history);
    if (!ok) {
      setAiAvailable(false);
      setMessages((p) => {
        const base = p[p.length - 1]?.role === "assistant" && p[p.length - 1].content === "" ? p.slice(0, -1) : p;
        return [...base, { role: "assistant", content: fallback ?? "I couldn't reach the server. Try one of the questions below!" }];
      });
    }
    setLoading(false);
  };

  return (
    <Layout background="deep">
      <SEOHead
        {...ROUTE_SEO["/faq"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: Object.entries(FAQ_ANSWERS).map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }}
      />
      <div className="mc-container mc-container--narrow">
        <PageHead icon="lapis" title="Chat" subtitle="Ask about worlds, shaders, modpacks and launchers." />
        {!aiAvailable && <p className="mc-center t-gold" style={{ marginBottom: 12 }}>Offline mode: showing pre-written answers.</p>}

        <section className="mc-chat" aria-label="Chat with the Nextup AI assistant">
          <div className="mc-chat__log" ref={logRef} role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className="mc-chat__line">
                <span className={m.role === "assistant" ? "mc-chat__name mc-chat__name--ai" : "mc-chat__name"}>
                  {"<"}{m.role === "assistant" ? "Nextup AI" : "You"}{">"}
                </span>{" "}
                <Rich text={m.content} />
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="mc-chat__line">
                <span className="mc-chat__name mc-chat__name--ai">{"<Nextup AI>"}</span> <span className="mc-chat__typing">thinking</span>
              </div>
            )}
          </div>
          <form className="mc-chat__form" onSubmit={(e) => { e.preventDefault(); void send(); }}>
            <label className="mc-sr" htmlFor="chat-input">Your message</label>
            <textarea
              id="chat-input"
              ref={inputRef}
              className="mc-chat__input"
              rows={1}
              value={input}
              disabled={loading}
              placeholder="Ask about shaders, launchers, modpacks..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
            />
            <McButton type="submit" variant="green" disabled={!input.trim() || loading}>Send</McButton>
          </form>
        </section>

        <section style={{ marginTop: 28 }} aria-labelledby="common-q">
          <h2 id="common-q" className="mc-h2 mc-h2--light">COMMON QUESTIONS</h2>
          <div className="mc-book">
            {SUGGESTED.map((q) => (
              <details key={q}>
                <summary>{q}</summary>
                <p style={{ fontSize: 22, padding: "4px 4px 8px 22px" }}>{FAQ_ANSWERS[q]}</p>
                <McButton size="sm" variant="dark" onClick={() => { setInput(q); inputRef.current?.focus(); }}>Ask the chat</McButton>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;
