import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
// import tailwind from '@astrojs/tailwind';
import starlightPlugin from '@astrojs/starlight-tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://rasmusj.dk',
  adapter: cloudflare({
     imageService: 'passthrough',
     platformProxy: {
      enabled: true,
    },
  }),
  output: 'server',
  vite: {
    ssr: {
      external: ['node:buffer', 'node:path', 'node:url'],
    },
  },
  integrations: [starlight({
    plugins: [
      starlightImageZoom(),
      starlightPlugin()
    ],
    title: 'Rasmus Brøgger Jørgensen',
    customCss: [
      'src/styles/globals.css',
    ],
    lastUpdated: true,
    social: {
      github: 'https://github.com/RelativeSure',
      mastodon: 'https://infosec.exchange/@relativesure',
      "x.com": 'https://x.com/RelativeSure',
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
  }), 
  tailwind({
    applyBaseStyles: false,
  }),
  sitemap(), mdx(), react()]
});
