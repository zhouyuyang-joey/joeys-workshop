import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo, useCallback, useRef, useState } from 'react';
import * as core from '@strudel/core';
import { noteToMidi, Pattern, valueToMidi, evalScope, silence, _mod } from '@strudel/core';
import { getDrawContext } from '@strudel/draw';
import { transpiler } from '@strudel/transpiler';
import { registerSynthSounds, registerZZFXSounds, samples, aliasBank, initAudioOnFirstClick, getAudioContext, webaudioOutput } from '@strudel/webaudio';
import { StrudelMirror } from '@strudel/codemirror';
import { f as createComponent, m as maybeRenderHead, n as renderSlot, o as renderComponent, r as renderTemplate } from './astro/server_CEMT5ie6.mjs';
import LightBulbIcon from '@heroicons/react/20/solid/LightBulbIcon';

function Icon({ type }) {
  if (type === "skip") {
    return /* @__PURE__ */ jsx(
      "svg",
      {
        fillRule: "evenodd",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        height: "16",
        width: "10",
        viewBox: "0 0 320 512",
        children: /* @__PURE__ */ jsx("path", { d: "M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" })
      }
    );
  }
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: {
    refresh: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",
        clipRule: "evenodd"
      }
    ),
    play: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",
        clipRule: "evenodd"
      }
    ),
    pause: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",
        clipRule: "evenodd"
      }
    ),
    stop: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z",
        clipRule: "evenodd"
      }
    )
  }[type] });
}

async function prebake() {
  // dynamically import optional modules and ignore failures so prebake
  // works even when some @strudel/* packages are not installed.
  // Use a runtime import wrapper to avoid Vite's static import analysis
  const dynamicImport = async (specifier) => {
    try {
      // prevent bundlers from statically resolving the import
      return await new Function('s', 'return import(s)')(specifier);
    } catch (e) {
      return null;
    }
  };

  const maybeImports = [
    dynamicImport('@strudel/draw'),
    dynamicImport('@strudel/mini'),
    dynamicImport('@strudel/tonal'),
    dynamicImport('@strudel/webaudio'),
    dynamicImport('@strudel/codemirror'),
    dynamicImport('@strudel/hydra'),
    dynamicImport('@strudel/soundfonts'),
    dynamicImport('@strudel/midi'),
  ];
  const loaded = await Promise.all(maybeImports);
  const modulesLoading = evalScope(core, ...loaded.filter(Boolean));

  // sample manifests hosted on GitHub
  const ds = 'https://raw.githubusercontent.com/felixroos/dough-samples/main';
  const ts = 'https://raw.githubusercontent.com/todepond/samples/main';
  const tc = 'https://raw.githubusercontent.com/tidalcycles/uzu-drumkit/main';

  await Promise.all([
    modulesLoading,
    registerSynthSounds(),
    registerZZFXSounds(),
    // dynamic register of soundfonts (avoid server-side import issues)
    import('@strudel/soundfonts').then(({ registerSoundfonts }) => registerSoundfonts()),
    samples(`${ds}/tidal-drum-machines.json`),
    samples(`${ds}/piano.json`),
    samples(`${ds}/Dirt-Samples.json`),
    samples(`${ds}/vcsl.json`),
    samples(`${ds}/mridangam.json`),
    samples(`${tc}/strudel.json`),
  ]);

  // alias mapping for drum machine names
  aliasBank(`${ts}/tidal-drum-machines-alias.json`);
}

const maxPan = noteToMidi('C8');
const panwidth = (pan, width) => pan * width + (1 - width) / 2;

Pattern.prototype.piano = function () {
  return this.fmap((v) => ({ ...v, clip: v.clip ?? 1 }))
    .s('piano')
    .release(0.1)
    .fmap((value) => {
      const midi = valueToMidi(value);
      const pan = panwidth(Math.min(Math.round(midi) / maxPan, 1), 0.5);
      return { ...value, pan: (value.pan || 1) * pan };
    });
};

async function loadModules() {
  const modules = [
    import('@strudel/core'),
    import('@strudel/draw'),
    import('@strudel/tonal'),
    import('@strudel/mini'),
    import('@strudel/webaudio'),
    import('@strudel/codemirror'),
  ];

  const { evalScope } = await import('@strudel/core');
  return evalScope({}, ...modules);
}

function setVersionDefaultsFrom(code) {
  // Optional: can be used to extract version info from code if needed
}

let prebaked, modulesLoading, audioReady;
if (typeof window !== "undefined") {
  prebaked = prebake();
  modulesLoading = loadModules();
  audioReady = initAudioOnFirstClick();
}
function MiniRepl({
  tune,
  tunes,
  hideHeader = false,
  canvasHeight = 100,
  onTrigger,
  punchcard,
  punchcardLabels = true,
  maxHeight,
  autodraw,
  drawTime,
  dirt = false
}) {
  const code = tunes ? tunes[0] : tune;
  const id = useMemo(() => s4(), []);
  const shouldShowCanvas = !!punchcard;
  const canvasId = shouldShowCanvas ? useMemo(() => `canvas-${id}`, [id]) : null;
  autodraw = !!punchcard || !!autodraw;
  drawTime = drawTime ?? punchcard ? [0, 4] : [-2, 2];
  const init = useCallback(({ code: code2, autodraw: autodraw2 }) => {
    const drawContext = canvasId ? document.querySelector("#" + canvasId)?.getContext("2d") : getDrawContext();
    const editor = new StrudelMirror({
      id,
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime,
      transpiler,
      autodraw: autodraw2,
      root: containerRef.current,
      initialCode: "// LOADING",
      pattern: silence,
      drawTime,
      drawContext,
      editPattern: (pat, id2) => {
        if (onTrigger) {
          pat = pat.onTrigger(onTrigger, false);
        }
        if (punchcard) {
          pat = pat.punchcard({ labels: !!punchcardLabels });
        }
        return pat;
      },
      prebake: async () => Promise.all([modulesLoading, prebaked]),
      onUpdateState: (state) => {
        setReplState({ ...state });
      },
      onToggle: (playing) => {
      },
      beforeStart: () => audioReady,
      afterEval: ({ code: code3 }) => setVersionDefaultsFrom()
    });
    editor.setCode(code2);
    editorRef.current = editor;
    if (editor.editor) {
      const handleStopKeydown = (e) => {
        const isStopKey = e.key === "." && (e.metaKey || // Cmd on macOS
        e.ctrlKey || // Ctrl on Windows/Linux
        e.altKey);
        if (isStopKey) {
          e.preventDefault();
          e.stopPropagation?.();
          editor.stop?.();
        }
      };
      editor.editor.contentDOM.addEventListener("keydown", handleStopKeydown, true);
      if (!editor._stopKeyHandler) {
        editor._stopKeyHandler = handleStopKeydown;
      }
    }
  }, []);
  const [replState, setReplState] = useState({});
  const { started, isDirty, error } = replState;
  const editorRef = useRef();
  const containerRef = useRef();
  const [tuneIndex, setTuneIndex] = useState(0);
  const changeTune = (index) => {
    index = _mod(index, tunes.length);
    setTuneIndex(index);
    editorRef.current?.setCode(tunes[index]);
    editorRef.current?.evaluate();
  };
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-t-md bg-background border border-lineHighlight", children: [
    !hideHeader && /* @__PURE__ */ jsxs("div", { className: "flex justify-between bg-lineHighlight", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: cx(
              "cursor-pointer w-16 flex items-center justify-center p-1 border-r border-lineHighlight text-foreground bg-lineHighlight hover:bg-background",
              started ? "animate-pulse" : ""
            ),
            "aria-label": started ? "stop" : "play",
            onClick: () => editorRef.current?.toggle(),
            children: /* @__PURE__ */ jsx(Icon, { type: started ? "stop" : "play" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: cx(
              "w-16 flex items-center justify-center p-1 text-foreground border-lineHighlight bg-lineHighlight",
              isDirty ? "text-foreground hover:bg-background cursor-pointer" : "opacity-50 cursor-not-allowed"
            ),
            "aria-label": "update",
            onClick: () => editorRef.current?.evaluate(),
            children: /* @__PURE__ */ jsx(Icon, { type: "refresh" })
          }
        )
      ] }),
      tunes && /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "cursor-pointer w-16 flex items-center justify-center p-1 border-r border-lineHighlight text-foreground bg-lineHighlight hover:bg-background",
            "aria-label": "previous example",
            onClick: () => changeTune(tuneIndex - 1),
            children: /* @__PURE__ */ jsx("div", { className: "rotate-180", children: /* @__PURE__ */ jsx(Icon, { type: "skip" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "cursor-pointer w-16 flex items-center justify-center p-1 border-r border-lineHighlight text-foreground bg-lineHighlight hover:bg-background",
            "aria-label": "next example",
            onClick: () => changeTune(tuneIndex + 1),
            children: /* @__PURE__ */ jsx(Icon, { type: "skip" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-auto relative p-1", style: maxHeight ? { maxHeight: `${maxHeight}px` } : {}, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: (el) => {
            if (!editorRef.current) {
              containerRef.current = el;
              init({ code, autodraw });
            }
          }
        }
      ),
      error && /* @__PURE__ */ jsx("div", { className: "text-right p-1 text-md text-red-200", children: error.message })
    ] }),
    shouldShowCanvas && /* @__PURE__ */ jsx(
      "canvas",
      {
        id: canvasId,
        className: "w-full pointer-events-none border-t border-lineHighlight",
        height: canvasHeight,
        ref: (el) => {
          if (el && el.width !== el.clientWidth) {
            el.width = el.clientWidth;
          }
        }
      }
    )
  ] });
}
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
function s4() {
  return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
}

const $$Box = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="py-1 px-6 pr-10 bg-lineHighlight relative mb-4 rounded"> <div>${renderSlot($$result, $$slots["default"])}</div> ${renderComponent($$result, "LightBulbIcon", LightBulbIcon, { "className": "w-5 h-5 absolute top-4 right-4" })} </div>`;
}, "/Users/zhouyuyang/joeys-strudel-workshop/src/components/Box.astro", void 0);

export { $$Box as $, MiniRepl as M };
