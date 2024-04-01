import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import cookieconsent from "@jop-software/astro-cookieconsent";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://rasmusj.dk',
  integrations: [starlight({
    plugins: [starlightImageZoom()],
    title: 'Rasmus Brøgger Jørgensen',
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
    }]
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
            // footer: `
            //             <a href="#link">Privacy Policy</a>
            //             <a href="#link">Impressum</a>
            //         `,
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            sections: [{
              title: 'Cookie usage',
              description: 'We are using Vercel Web Analytics and Speed Insights.'
            },
            // {
            //   title: 'Strictly necessary cookies',
            //   description:
            //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            //   linkedCategory: 'necessary',
            // },
            // {
            //   title: 'Performance and analytics cookies',
            //   description:
            //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            //   linkedCategory: 'analytics',
            //   cookieTable: {
            //     headers: {
            //       name: 'Cookie',
            //       domain: 'Domain',
            //       desc: 'Description',
            //     },
            //     body: [
            //       {
            //         name: '_ga',
            //         domain: 'yourdomain.com',
            //         desc: 'description ...',
            //       },
            //       {
            //         name: '_gid',
            //         domain: 'yourdomain.com',
            //         desc: 'description ...',
            //       },
            //     ],
            //   },
            // },
            // {
            //   title: 'Advertisement and targeting cookies',
            //   description:
            //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            //   linkedCategory: 'ads',
            // },
            {
              title: 'More information',
              description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.'
            }]
          }
        }
      }
    }
  }), sitemap()],
  output: "server",
  adapter: vercel()
});