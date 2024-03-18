/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    darkMode: 'classic',
    extend: {
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
        customYellow: {
          DEFAULT: '#F6F6E8', // Corrected syntax
        },
        customBrown: { // Changed name to camelCase for consistency
          DEFAULT: '#474141',
        }
      },
      transitionDuration: {
        '9': '9000ms', // Enclosed key in quotes for consistency
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    'prettier-plugin-tailwindcss'
  ],
};
