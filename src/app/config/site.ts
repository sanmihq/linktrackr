export const siteConfig = {
  name: "LinkTrackr",
  title: "LinkTrackr - Smart Link Logging",
  url: "https://linktrackr.vercel.app",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Generate trackable links to log visitor data before redirecting to the original URL.",
  links: {
    x: "https://x.com/sanmi_hq",
    github: "https://github.com/sanmihq/linktrackr",
  },
  domain: "http://localhost:3000",
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
