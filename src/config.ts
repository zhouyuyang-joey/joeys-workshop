export const SITE = {
  title: "Joey's Workshop",
  description: 'Learn live coding with Strudel through interactive examples.',
  defaultLanguage: 'en',
};

export const OPEN_GRAPH = {
  image: {
    src: '/favicon.png',
    alt: "Joey's Workshop Logo",
  },
};

export type Frontmatter = {
  title: string;
  description?: string;
  layout: string;
  image?: { src: string; alt: string };
};
