import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import cookieconsent from "@jop-software/astro-cookieconsent";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://rasmusj.dk',
  integrations: [starlight({
    plugins: [starlightImageZoom()],
    title: 'Rasmus Brøgger Jørgensen',
    lastUpdated: true,
    social: {
      github: 'https://github.com/RelativeSure',
      mastodon: 'https://infosec.exchange/@relativesure',
      twitter: 'https://twitter.com/RelativeSure',
      linkedin: 'https://www.linkedin.com/in/rjørgensen'
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
  }), cookieconsent({
    guiOptions: {
      consentModal: {
        layout: 'cloud',
        position: 'bottom center',
        equalWeightButtons: true,
        flipButtons: false
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: false
      }
    },
    categories: {
      necessary: {
        readOnly: true,
        enabled: true
      },
      analytics: {
        autoClear: {
          cookies: [{
            name: /^(_ga|_gid)/
          }]
        }
      },
      ads: {}
    },
    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: "Hello traveller, it's cookie time!",
            description: 'Our website uses essential cookies and Vercel Web Analytics, Speed Insights to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
            acceptAllBtn: 'Accept',
            acceptNecessaryBtn: 'Reject',
            showPreferencesBtn: 'Manage preferences',
            closeIconLabel: 'Reject all and close'
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            sections: [{
              title: 'Cookie usage',
              description: 'We are using Vercel Web Analytics and Speed Insights.'
            }]
          }
        }
      }
    }
  }), sitemap()],
    output: "server",
    adapter: cloudflare({
      routes: {
        extend: {
          exclude: [{ pattern: '/pagefind/*' }, { pattern: '/dist/*' }], // Use Starlight's pagefind search, which is generated statically at build time
        }
      },
    }),
    vite: {
      ssr: {
        external: ['node:url', 'node:path', 'node:child_process'],
      },
      // build: {
      //   minify: false,
      // },
    },
});
