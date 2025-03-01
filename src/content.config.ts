// import { defineCollection, z } from "astro:content";
import { defineCollection } from "astro:content";
// import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';


// For pages
// const pages = defineCollection({
//   loader: glob({ pattern: "**/*.astro", base: "./src/pages" }),
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//   }),
// });

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

// export const collections = { pages, docs };
export const collections = { docs };
