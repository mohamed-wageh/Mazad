/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#323232",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
