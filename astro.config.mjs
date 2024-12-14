import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://rasmusj.dk',
  adapter: cloudflare({
     imageService: 'cloudflare'
  }),
  output: 'server',
  vite: {
    ssr: {
      external: ['node:buffer', 'node:path', 'node:url'],
    },
  },
  integrations: [starlight({
    plugins: [starlightImageZoom()],
    title: 'Rasmus Brøgger Jørgensen',
    lastUpdated: true,
    social: {
      github: 'https://github.com/RelativeSure',
      mastodon: 'https://infosec.exchange/@relativesure',
      twitter: 'https://twitter.com/RelativeSure',
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
    }
  ]
  }),
  sitemap()]
});
