export async function loadModules() {
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

export function setVersionDefaultsFrom(code) {
  // Optional: can be used to extract version info from code if needed
}
