/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "color-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(255, 0, 0, 0.8)" }, // Red
          "25%": { boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)" }, // Green
          "50%": { boxShadow: "0 0 15px rgba(0, 0, 255, 0.8)" }, // Blue
          "75%": { boxShadow: "0 0 15px rgba(255, 255, 0, 0.8)" }, // Yellow
        },
      },
      animation: {
        "color-glow": "color-glow 2s infinite",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },
  plugins: [],
};
