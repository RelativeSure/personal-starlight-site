import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://rasmusj.dk",
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    routes: {
      extend: {
        include: [
          { pattern: '/static' }, // Route a prerended page to the SSR function for on-demand rendering
          { pattern: '/dist' }    // Route a prerended page to the SSR function for on-demand rendering
        ],
        exclude: [{ pattern: '/pagefind/*' }], // Use Starlight's pagefind search, which is generated statically at build time
      }
    },
  }),
  prerender: false,
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:path', 'node:url', 'node:stream'],
    },
    resolve: {
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
  redirects: {
      "/linkedin": "https://www.linkedin.com/in/rasmusbroeggerjoergensen/"
  },
  integrations: [
    starlight({
      title: "Rasmus Brøgger Jørgensen",
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      lastUpdated: true,
      logo: {
        src: './src/assets/favicon.svg',
      },
      editLink: {
        baseUrl: 'https://github.com/RelativeSure/personal-starlight-site/edit/main/',
      },
      expressiveCode: {
        themes: ['material-theme-ocean', 'material-theme-lighter'],
      },
      customCss: [
        // Path to your Tailwind base styles:
        './src/tailwind.css',
        // Relative path to your custom CSS file
        './src/styles/custom.css',
        // './src/styles/global.css',
        // Fontsource files for to regular and semi-bold font weights.
        "@fontsource/fira-mono/400.css",
        "@fontsource/fira-mono/500.css",
        "@fontsource/fira-mono/700.css",
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
    icon(),
    sitemap(),
    mdx(),
    react(),
    robotsTxt(),
  ],
});
