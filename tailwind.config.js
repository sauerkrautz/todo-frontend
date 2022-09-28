/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/*.{js,jsx}", "./public/*.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        main: "#2E3642",
        back: "#282E38",
        secback: "#121212",
        secmain: "#202020",
        complete: "#9ECB2D",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
