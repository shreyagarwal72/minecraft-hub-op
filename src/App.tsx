import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LibraryProvider } from "@/hooks/useLibrary";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Patch = lazy(() => import("./pages/Patch"));
const Shaders = lazy(() => import("./pages/Shaders"));
const Worlds = lazy(() => import("./pages/Worlds"));
const BulkyStarWorlds = lazy(() => import("./pages/BulkyStarWorlds"));
const Modpacks = lazy(() => import("./pages/Modpacks"));
const Downloads = lazy(() => import("./pages/Downloads"));
const FAQ = lazy(() => import("./pages/FAQ"));

const App = () => (
  <HelmetProvider>
    <LibraryProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="mc-app mc-bg-dirt mc-loading-page" role="status">Loading chunks...</div>}>
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
    </LibraryProvider>
  </HelmetProvider>
);

export default App;
