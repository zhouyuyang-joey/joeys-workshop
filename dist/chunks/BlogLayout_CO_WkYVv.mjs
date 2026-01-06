import { e as createAstro, f as createComponent, h as addAttribute, p as renderHead, n as renderSlot, r as renderTemplate } from './astro/server_CEMT5ie6.mjs';
/* empty css                                */

const SITE = {
  title: "Joey's Strudel Workshop",
  description: "Learn live coding with Strudel through interactive examples."};

const $$Astro = createAstro("https://username.github.io");
const $$BlogLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`<html lang="en" class="initial dark"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${frontmatter.title ? `${frontmatter.title} - Joey's Strudel Workshop` : "Joey's Strudel Workshop"}</title><meta name="description"${addAttribute(frontmatter.description || SITE.description, "content")}>${renderHead()}</head> <body class="min-h-screen bg-background text-gray-50"> <header class="border-b border-lineHighlight"> <nav class="max-w-6xl mx-auto px-6 py-6"> <h1 class="text-2xl font-bold text-primary"> <a href="/">${SITE.title}</a> </h1> </nav> </header> <main class="max-w-6xl mx-auto px-6 py-12"> <article class="prose prose-invert max-w-none"> <h1>${frontmatter.title}</h1> ${renderSlot($$result, $$slots["default"])} </article> </main> <footer class="border-t border-lineHighlight mt-12"> <div class="max-w-6xl mx-auto px-6 py-6 text-center text-gray-400 text-sm"> <p>© 2024 Joey's Strudel Workshop. Based on <a href="https://strudel.cc" class="text-primary hover:underline">Strudel</a></p> </div> </footer> </body></html>`;
}, "/Users/zhouyuyang/joeys-strudel-workshop/src/layouts/BlogLayout.astro", void 0);

export { $$BlogLayout as $ };
