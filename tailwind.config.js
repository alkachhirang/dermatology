/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['"Archivo", sans-serif;'],
        kaushan: ['"Kaushan Script", cursive;'],
      },
      fontSize:{
        md:'32px',
      },
      colors:{
        lightGreen:'#679277',
        darkGreen:'#001008',
        darkgrey:'#001008b2',
        lightgrey:'#0010080f',
        offgrey:'#696969',

      },
    },
  },
  plugins: [],
};
