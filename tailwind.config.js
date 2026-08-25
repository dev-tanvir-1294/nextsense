/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2438",
        "ink-soft": "#3A4055",
        lavender: "#AAA8FF",
        cream: "#FAFAF7",
      },
      fontFamily: {
        body: ["Inter", "system-ui", "sans-serif"],
        display: ["'Instrument Serif'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
