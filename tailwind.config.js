/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        chibi: {
          pink: "#F9D6D8",
          cream: "#FFFDF6",
          sage: "#D4E3A9",
          brown: "#4A423E",
          orange: "#FBC02D",
          tan: "#B5A49D",
          "pink-light": "#F7C3C7",
        },
      },
      fontFamily: {
        chibi: ["ChibiFont", "sans-serif"], // Placeholder for when fonts are confirmed
      },
      borderRadius: {
        "chibi-sm": "10px",
        "chibi-md": "20px",
        "chibi-lg": "30px",
      },
    },
  },
  plugins: [],
};
