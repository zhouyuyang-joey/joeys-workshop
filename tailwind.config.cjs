/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#222222',
        lineHighlight: '#000000ff',
        primary: '#9cdbfb',
        secondary: '#cae797',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
