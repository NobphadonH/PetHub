/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pethub-color1': '#E16200',
        'pethub-color2': '#EB8B30',
        'pethub-color3': '#F3A62A',
        'pethub-color4': '#F69A5E',
        'pethub-color5': '#FEBE98',
        'pethub-color6': '#10375C',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["bumblebee"],
  },
}
