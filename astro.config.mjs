import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://rasmusj.dk',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    starlight({
      plugins: [starlightImageZoom()],
      title: 'Rasmus Brøgger Jørgensen',
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      lastUpdated: true,
      social: {
        github: 'https://github.com/RelativeSure',
        mastodon: 'https://infosec.exchange/@relativesure',
        'x.com': 'https://x.com/RelativeSure',
        linkedin: 'https://www.linkedin.com/in/rasmusbroeggerjoergensen/'
      },
      sidebar: [{
        label: 'IT Security',
        autogenerate: {
          directory: 'it-security'
        }
      }, {
        label: 'Kubernetes',
        autogenerate: {
          directory: 'kubernetes'
        }
      }, {
        label: 'Linux',
        autogenerate: {
          directory: 'linux'
        }
      }, {
        label: 'Windows',
        autogenerate: {
          directory: 'windows'
        }
      }, {
        label: 'Bookmarks',
        autogenerate: {
          directory: 'bookmarks'
        }
      }, {
        label: 'Projects',
        autogenerate: {
          directory: 'projects'
        }
      }
    ]
  }), sitemap(), mdx(), react(), tailwind()]
});
