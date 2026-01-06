/* empty css                                           */
import { _ as __astro_tag_component__, k as createVNode, l as Fragment } from '../../chunks/astro/server_CEMT5ie6.mjs';
import { $ as $$BlogLayout } from '../../chunks/BlogLayout_CO_WkYVv.mjs';
import { M as MiniRepl, $ as $$Box } from '../../chunks/Box_CIHYinmS.mjs';
export { renderers } from '../../renderers.mjs';

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
  "title": "Patterns and Rhythm",
  "layout": "../../layouts/BlogLayout.astro"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "patterns-and-rhythm",
    "text": "Patterns and Rhythm"
  }, {
    "depth": 2,
    "slug": "basic-patterns",
    "text": "Basic Patterns"
  }, {
    "depth": 2,
    "slug": "repeating-sounds",
    "text": "Repeating Sounds"
  }, {
    "depth": 2,
    "slug": "adding-variations",
    "text": "Adding Variations"
  }, {
    "depth": 2,
    "slug": "combining-with-effects",
    "text": "Combining with Effects"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h1: "h1",
    h2: "h2",
    p: "p",
    span: "span",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "patterns-and-rhythm",
      children: ["Patterns and Rhythm", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#patterns-and-rhythm",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: "Learn how to create patterns and rhythms with Strudel."
    }), "\n", createVNode(_components.h2, {
      id: "basic-patterns",
      children: ["Basic Patterns", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#basic-patterns",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: "Let’s start with a simple pattern:"
    }), "\n", createVNode(MiniRepl, {
      "client:visible": true,
      tune: `sound("bd").rarely(rev)`,
      "client:component-path": "/Users/zhouyuyang/joeys-strudel-workshop/src/docs/MiniRepl",
      "client:component-export": "MiniRepl",
      "client:component-hydration": true
    }), "\n", createVNode($$Box, {
      children: createVNode(_components.p, {
        children: "This example introduces some new concepts. Try experimenting with different sounds and effects!"
      })
    }), "\n", createVNode(_components.h2, {
      id: "repeating-sounds",
      children: ["Repeating Sounds", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#repeating-sounds",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: "Create patterns by repeating sounds:"
    }), "\n", createVNode(MiniRepl, {
      "client:visible": true,
      tune: `sound("bd hh sd hh")`,
      "client:component-path": "/Users/zhouyuyang/joeys-strudel-workshop/src/docs/MiniRepl",
      "client:component-export": "MiniRepl",
      "client:component-hydration": true
    }), "\n", createVNode($$Box, {
      children: createVNode(_components.p, {
        children: "Each sound in the sequence will play in turn. This creates a basic drum pattern."
      })
    }), "\n", createVNode(_components.h2, {
      id: "adding-variations",
      children: ["Adding Variations", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#adding-variations",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: "Make your patterns more interesting:"
    }), "\n", createVNode(MiniRepl, {
      "client:visible": true,
      tune: `sound("bd sd bd sd")`,
      "client:component-path": "/Users/zhouyuyang/joeys-strudel-workshop/src/docs/MiniRepl",
      "client:component-export": "MiniRepl",
      "client:component-hydration": true
    }), "\n", createVNode($$Box, {
      children: createVNode(_components.p, {
        children: "Try changing the order of sounds or replacing them with different drum components to create new rhythmic patterns."
      })
    }), "\n", createVNode(_components.h2, {
      id: "combining-with-effects",
      children: ["Combining with Effects", createVNode(_components.a, {
        "aria-hidden": "true",
        tabindex: "-1",
        href: "#combining-with-effects",
        children: createVNode(_components.span, {
          class: "icon icon-link"
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: "Add effects to make things more interesting:"
    }), "\n", createVNode(MiniRepl, {
      "client:visible": true,
      tune: `sound("bd").room(0.5)`,
      "client:component-path": "/Users/zhouyuyang/joeys-strudel-workshop/src/docs/MiniRepl",
      "client:component-export": "MiniRepl",
      "client:component-hydration": true
    }), "\n", createVNode($$Box, {
      children: createVNode(_components.p, {
        children: ["Effects like ", createVNode(_components.code, {
          children: "room"
        }), ", ", createVNode(_components.code, {
          children: "delay"
        }), ", and ", createVNode(_components.code, {
          children: "gain"
        }), " can transform your sounds in creative ways."]
      })
    }), "\n", createVNode(_components.p, {
      children: "Keep exploring and have fun creating rhythms!"
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

const url = "/articles/patterns";
const file = "/Users/zhouyuyang/joeys-strudel-workshop/src/pages/articles/patterns.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/zhouyuyang/joeys-strudel-workshop/src/pages/articles/patterns.mdx";
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
