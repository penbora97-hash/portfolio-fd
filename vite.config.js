import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
     theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',      // ខ្មៅជ្រៅ
          card: '#141414',    // ខ្មៅស្រាល (សម្រាប់ Card)
          border: '#262626',  // ព្រំដែន
        },
        gold: {
          DEFAULT: '#f59e0b', // មាស
          light: '#fbbf24',   // មាសស្រាល
          dark: '#d97706',    // មាសចាស់
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
  },
  plugins: [react(), tailwindcss()],
});
