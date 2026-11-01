import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import SEOHead from "@/components/SEOHead";
import { SITE_URL } from "@/config/site";

const Index = () => (
  <Layout flush>
    <SEOHead
      path="/"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Minecraft Java Hub",
        url: `${SITE_URL}/`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      }}
    />
    <Hero />
    <Showcase />
  </Layout>
);

export default Index;
