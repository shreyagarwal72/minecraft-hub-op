import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, OG_IMAGE, OG_IMAGE_ALT,
} from "@/config/site";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  /** Route path like "/worlds". Defaults to the current route. */
  path?: string;
  ogImage?: string;
  noindex?: boolean;
  type?: "website" | "article";
  structuredData?: object | object[];
  /** Label used in the breadcrumb trail for this page. */
  breadcrumb?: string;
}

const clean = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""));

const SEOHead = ({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  keywords = SITE_KEYWORDS,
  path,
  ogImage = OG_IMAGE,
  noindex = false,
  type = "website",
  structuredData,
  breadcrumb,
}: SEOHeadProps) => {
  const location = useLocation();
  const route = clean(path ?? location.pathname);
  const url = `${SITE_URL}${route === "/" ? "/" : route}`;

  const crumbs: { name: string; item: string }[] = [{ name: "Home", item: `${SITE_URL}/` }];
  if (route !== "/") {
    const parts = route.split("/").filter(Boolean);
    parts.forEach((_, i) => {
      const isLast = i === parts.length - 1;
      const href = `${SITE_URL}/${parts.slice(0, i + 1).join("/")}`;
      const raw = parts[i].replace(/-/g, " ");
      crumbs.push({
        name: isLast && breadcrumb ? breadcrumb : raw.replace(/\b\w/g, (c) => c.toUpperCase()),
        item: href,
      });
    });
  }
  const breadcrumbLd = route === "/" || noindex ? null : {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  };

  const ld = [
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : []),
    ...(breadcrumbLd ? [breadcrumbLd] : []),
  ];

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

      {ld.map((d, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
