import { useEffect } from "react";

const Patch = () => {
  useEffect(() => {
    // Redirect to the external Mrpack to zip converter
    window.location.href = "https://mrpacktozip.vercel.app/";
  }, []);

  return (
    <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Redirecting to Mrpack to Zip Converter...
          </h1>
          <p className="text-gaming-text">
            If you're not redirected automatically, 
            <a 
              href="https://mrpacktozip.vercel.app/" 
              className="text-primary hover:text-primary-glow ml-1 underline"
            >
              click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Patch;