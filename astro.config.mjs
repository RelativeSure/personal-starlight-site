import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://rasmusj.dk",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "Rasmus Brøgger Jørgensen",
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      lastUpdated: true,
      logo: {
        src: "./src/assets/favicon.svg",
      },
      editLink: {
        baseUrl:
          "https://github.com/RelativeSure/personal-starlight-site/edit/main/",
      },
      expressiveCode: {
        themes: ["material-theme-ocean", "material-theme-lighter"],
      },
      customCss: [
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
        // Relative path to your custom CSS file
        "./src/styles/global.css",
        // Fontsource files for to regular and semi-bold font weights.
        "@fontsource/fira-mono/400.css",
        "@fontsource/fira-mono/500.css",
        "@fontsource/fira-mono/700.css",
      ],
      social: [
        { icon: github, label: GitHub, href: "https://github.com/RelativeSure" },
        { icon: mastodon, label: Mastodon, href: "https://infosec.exchange/@relativesure" },
        { icon: "x.com", label: X, href: "https://x.com/RelativeSure" },
        { icon: linkedin, label: LinkedIn, href: "https://www.linkedin.com/in/rasmusbroeggerjoergensen/" },
      ],
      sidebar: [
        {
          label: "Bookmarks",
          collapsed: true,
          autogenerate: {
            directory: "bookmarks",
          },
        },
        {
          label: "Good Stuff",
          autogenerate: {
            directory: "goodstuff",
          },
        },
        {
          label: "Linux",
          autogenerate: {
            directory: "linux",
          },
        },
        {
          label: "Projects",
          autogenerate: {
            directory: "projects",
          },
        },
        {
          label: "Website",
          autogenerate: {
            directory: "website",
          },
        },
      ],
    }),
    mdx(),
    react(),
    robotsTxt(),
  ],
});
