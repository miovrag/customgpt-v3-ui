import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // CustomGPT design tokens
        cgpt: {
          primary:    "#7367F0",
          success:    "#28C76F",
          danger:     "#EA5455",
          warning:    "#FF9F43",
          info:       "#0076E4",
          secondary:  "#A8AAAE",
          teal:       "#46AEAE",
        },
      },
    },
  },
  plugins: [],
};

export default config;
