import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Nunito Sans"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          '"Playfair Display"',
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
      backgroundImage: {
        hero: "url('/images/hero.webp')",
        categories:"url('/images/categories.webp')",
        ingredients:"url('/images/ingredients.webp')",
        areas:"url('/images/areas.webp')",
        
      },
    
    },
  },
  plugins: [],
} satisfies Config;
