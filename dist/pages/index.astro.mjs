/* empty css                                        */
import { _ as __astro_tag_component__, k as createVNode, l as Fragment } from '../chunks/astro/server_CEMT5ie6.mjs';
import { $ as $$BlogLayout } from '../chunks/BlogLayout_CO_WkYVv.mjs';
export { renderers } from '../renderers.mjs';

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$BlogLayout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    'server:root': true,
    children
  });
};
const frontmatter = {
  "layout": "../layouts/BlogLayout.astro",
  "title": "Joey's Strudel Workshop",
  "description": "Learn live coding with Strudel"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "getting-started",
    "text": "Getting Started"
  }, {
    "depth": 3,
    "slug": "featured-articles",
    "text": "Featured Articles"
  }, {
    "depth": 2,
    "slug": "about-strudel",
    "text": "About Strudel"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    span: "span",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Welcome to Joey’s Strudel Workshop! This is a collection of interactive examples and tutorials for learning live coding with Strudel."
    }), "\n", createVNode(_components.h2, {
      id: "getting-started",
      children: ["Getting Started", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#getting-started",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Use the interactive code boxes throughout this workshop to explore and learn. Press ", createVNode(_components.code, {
        children: "Ctrl+Enter"
      }), " to run the code, or click the play button."]
    }), "\n", createVNode(_components.h3, {
      id: "featured-articles",
      children: ["Featured Articles", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#featured-articles",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/articles/first-sounds",
          children: "First Sounds"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/articles/patterns",
          children: "Patterns and Rhythm"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "about-strudel",
      children: ["About Strudel", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#about-strudel",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Strudel is a browser-based music live coding environment that brings the power of TidalCycles to the web. Learn more at ", createVNode(_components.a, {
        href: "https://strudel.cc",
        children: "strudel.cc"
      }), "."]
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

const url = "";
const file = "/Users/zhouyuyang/joeys-strudel-workshop/src/pages/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/zhouyuyang/joeys-strudel-workshop/src/pages/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
