/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"], // Ensure Tailwind processes the correct files
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        firaSans: ["Fira Sans", "sans-serif"],
        rubikVinyl: ["Rubik Vinyl", "sans-serif"],
      },
    },
  },
  plugins: [],
};
