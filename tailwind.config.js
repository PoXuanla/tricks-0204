const { blackA, green, grass, mauve, teal } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.vue", "./pages/**/*.vue", "./app.vue"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...teal,
        ...green,
        ...grass,
        ...mauve,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".fixed-center": {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      });
    },
  ],
};
