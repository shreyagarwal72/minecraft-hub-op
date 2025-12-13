import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Patch = lazy(() => import("./pages/Patch"));
const Shaders = lazy(() => import("./pages/Shaders"));
const Worlds = lazy(() => import("./pages/Worlds"));
const BulkyStarWorlds = lazy(() => import("./pages/BulkyStarWorlds"));
const Modpacks = lazy(() => import("./pages/Modpacks"));
const Downloads = lazy(() => import("./pages/Downloads"));
const FAQ = lazy(() => import("./pages/FAQ"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-gaming-bg flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/patch" element={<Patch />} />
            <Route path="/shaders" element={<Shaders />} />
            <Route path="/worlds" element={<Worlds />} />
            <Route path="/worlds/bulky-star" element={<BulkyStarWorlds />} />
            <Route path="/modpacks" element={<Modpacks />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
