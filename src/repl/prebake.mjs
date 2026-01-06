import { noteToMidi, valueToMidi, Pattern, evalScope } from '@strudel/core';
import { aliasBank, registerSynthSounds, registerZZFXSounds, samples } from '@strudel/webaudio';
import * as core from '@strudel/core';

export async function prebake() {
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
