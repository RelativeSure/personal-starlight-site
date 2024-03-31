import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom'

// https://astro.build/config
export default defineConfig({
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
				// {
				// 	label: 'Guides',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Example Guide', link: '/guides/example/' },
				// 	],
				// },
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
