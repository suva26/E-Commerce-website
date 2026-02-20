/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e0bf6a",
          dark: "#a8892e",
        },
        dark: {
          DEFAULT: "#0d0d0d",
          100: "#141414",
          200: "#1a1a1a",
          300: "#2a2a2a",
          400: "#3a3a3a",
        },
        cream: {
          DEFAULT: "#e8e0d5",
          dark: "#d0c8b0",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translate(-50%, 20px)" },
          "100%": { opacity: 1, transform: "translate(-50%, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        cartSlide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.4s ease forwards",
        marquee: "marquee 20s linear infinite",
        fadeIn: "fadeIn 1.2s cubic-bezier(0.4,0,0.2,1) forwards",
        cartSlide: "cartSlide 0.5s cubic-bezier(0.4,0,0.2,1) forwards",
      },
    },
  },
  plugins: [],
};
