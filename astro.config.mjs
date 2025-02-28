import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import { ion } from "starlight-ion-theme";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://rasmusj.dk",
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
      "/linkedin": "https://www.linkedin.com/in/rasmusbroeggerjoergensen/"
  },
  integrations: [
    starlight({
      plugins: [
        starlightImageZoom(),
        ion()
      ],
      title: "Rasmus Brøgger Jørgensen",
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      lastUpdated: true,
      logo: {
        src: './src/assets/favicon.svg',
      },
      expressiveCode: {
        themes: ['material-theme-ocean', 'material-theme-lighter'],
      },
      customCss: [
        // Fontsource files for to regular and semi-bold font weights.
        "@fontsource/fira-mono/400.css",
        "@fontsource/fira-mono/500.css",
        "@fontsource/fira-mono/700.css",
        // Relative path to your custom CSS file
        './src/styles/custom.css',
        './src/styles/globals.css',
      ],
      social: {
        github: "https://github.com/RelativeSure",
        mastodon: "https://infosec.exchange/@relativesure",
        "x.com": "https://x.com/RelativeSure",
        linkedin: "https://www.linkedin.com/in/rasmusbroeggerjoergensen/",
      },
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
        // {
        //   label: "Kubernetes",
        //   autogenerate: {
        //     directory: "kubernetes",
        //   },
        // },
        {
          label: "Linux",
          autogenerate: {
            directory: "linux",
          },
        },
        // {
        //   label: "Windows",
        //   autogenerate: {
        //     directory: "windows",
        //   },
        // },
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
    icon(),
    sitemap(),
    mdx(),
    react(),
    robotsTxt(),
  ],
});
