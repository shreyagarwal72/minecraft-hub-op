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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI assistant for the Minecraft Java Hub website. You only answer questions about this website and its features.

Website Information:
- Minecraft Java Hub is a professional gaming platform for Minecraft Java Edition content
- Features include:
  * Worlds: Custom Minecraft worlds like Bulky Star (15K blocks), Infinity Castle, and more
  * Modpacks: Curated modpacks for enhanced gameplay
  * Shaders: Visual enhancement shaders including BSL Shaders, Photon Shader, Complementary Shaders
  * Downloads: Best Minecraft launchers including Modrinth Launcher, Legacy Launcher, and TLauncher
  * Community: Join our gaming community

- Available Pages:
  * Home: Overview and featured content
  * Worlds: Browse custom Minecraft worlds
  * Modpacks: Discover modpacks
  * Shaders: Visual enhancement options
  * Downloads: Get the best Minecraft launchers
  * Community: Connect with other players
  * FAQ: AI-powered help center (this page)

- Key Features:
  * Professional-grade content for Minecraft Java Edition
  * Free downloads for launchers
  * High-quality custom worlds and content
  * Regular updates and new content
  * Safe and verified downloads

Keep responses clear, concise, and helpful. If asked about topics outside this website, politely redirect users to website-related questions. Always maintain a professional and friendly tone.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
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
