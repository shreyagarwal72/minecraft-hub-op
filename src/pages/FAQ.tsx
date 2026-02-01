import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LiquidGlassHeader from "@/components/LiquidGlassHeader";
import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import { cn } from "@/lib/utils";
import SEOHead from "@/components/SEOHead";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const FAQ = () => {
  const { isLiquidGlass } = useLiquidGlass();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const recommendedQuestions = [
    "What features does Minecraft Java Hub offer?",
    "How do I download a Minecraft launcher?",
    "What are the best shaders available?",
    "Tell me about the custom worlds",
    "How do I join the community?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: Message) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/faq-chat`;
    
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429 || resp.status === 402) {
          const errorData = await resp.json();
          throw new Error(errorData.error || "Service temporarily unavailable");
        }
        throw new Error("Failed to get response");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              // Update the last message with accumulated content
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      // Remove the empty assistant message on error
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
  };

  const handleRecommendedClick = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      <SEOHead
        title="FAQ - AI Help Center | Minecraft Java Hub"
        description="Get instant answers about Minecraft Java Hub features, downloads, worlds, shaders, and modpacks with our AI-powered help center."
        keywords="minecraft faq, minecraft help, ai chatbot, minecraft support, launcher help, shader help"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <LiquidGlassHeader />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              AI-Powered FAQ
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ask me anything about Minecraft Java Hub and I'll help you find what you need!
            </p>
          </div>

          {/* Chat Container */}
          <Card className={cn(
            "border-2 shadow-xl overflow-hidden transition-all duration-300",
            isLiquidGlass ? "liquid-glass-card border-primary/20" : "border-border/50"
          )}>
            {/* Messages Area */}
            <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <Sparkles className="w-12 h-12 text-primary/50" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Welcome to the FAQ Assistant!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try asking one of these questions to get started:
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                    {recommendedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left h-auto py-3 px-4 hover:bg-primary/5 hover:border-primary/50 transition-all"
                        onClick={() => handleRecommendedClick(question)}
                      >
                        <span className="text-sm">{question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg px-4 py-3 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary animate-pulse" />
                      </div>
                      <div className="bg-secondary rounded-lg px-4 py-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4 bg-card/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Minecraft Java Hub..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  data-magnetic
                  className={cn(
                    isLiquidGlass ? "liquid-glass-button" : "bg-primary hover:bg-primary-hover"
                  )}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Recommended Questions (shown when chat has messages) */}
          {messages.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3 text-center">
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {recommendedQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleRecommendedClick(question)}
                    disabled={isLoading}
                    className="hover:bg-primary/5 hover:border-primary/50"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default FAQ;
