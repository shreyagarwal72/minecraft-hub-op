import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const apiKey = Deno.env.get("AI_API_KEY") || Deno.env.get("OPENAI_API_KEY") || Deno.env.get("OPENROUTER_API_KEY");
    
    if (!apiKey) {
      throw new Error("AI_API_KEY or OPENAI_API_KEY is not configured");
    }

    const apiUrl = Deno.env.get("AI_GATEWAY_URL") || Deno.env.get("OPENAI_BASE_URL") || "https://api.openai.com/v1/chat/completions";
    const model = Deno.env.get("AI_MODEL") || "gpt-4o-mini";

    const systemPrompt = `You are a helpful AI assistant for the Minecraft Java Hub website. You only answer questions about this website and its features.

Website Information:
- Minecraft Java Hub (https://java-minecraft.vercel.app) lists Minecraft Java Edition worlds, shaders, modpacks and launchers
- Pages: Home, Worlds, Modpacks (Resource Packs screen), Shaders, Downloads (launcher screen), Patch (latest versions from Mojang plus a Mrpack to Zip converter), FAQ
- Launchers listed: the official Minecraft Launcher, Modrinth App and Prism Launcher. Do not recommend unofficial launchers.
- Shaders (BSL, Complementary Reimagined, Photon) link to official Modrinth or author pages and need Iris or OptiFine
- Every download shows a source badge. Green means a provider we can query (Mojang, Modrinth, GitHub). Red means an unverified mirror (Google Drive, MediaFire, direct link).
- Version numbers on the site come from Mojang's manifest. Never state a version number yourself, tell users to check the Downloads or Patch page.
- This is not an official Minecraft product and is not associated with Mojang or Microsoft.

Keep responses clear, concise, and helpful. If asked about topics outside this website, politely redirect users to website-related questions. Always maintain a professional and friendly tone.`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("FAQ chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
