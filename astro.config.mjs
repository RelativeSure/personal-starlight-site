import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
	output: 'static',
  adapter: vercel({
		imageService: true,
    imagesConfig: {
      sizes: [320, 640, 1280],
    },
	}),
	integrations: [
		starlight({
			plugins: [starlightImageZoom()],
			title: 'Rasmus Brøgger Jørgensen',
			social: {
				github: 'https://github.com/RelativeSure',
				mastodon: 'https://infosec.exchange/@relativesure',
				twitter: 'https://twitter.com/RelativeSure',
				linkedin: 'https://www.linkedin.com/in/rjørgensen',
			},
			sidebar: [
				{
					label: 'IT Security',
					autogenerate: { directory: 'it-security' },
				},
				{
					label: 'Kubernetes',
					autogenerate: { directory: 'kubernetes' },
				},
				{
					label: 'Linux',
					autogenerate: { directory: 'linux' },
				},
				{
					label: 'Windows',
					autogenerate: { directory: 'windows' },
				},
			],
		}),
	],
});
