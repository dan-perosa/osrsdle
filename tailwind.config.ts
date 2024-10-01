import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkBackground: "#1E1E1E",
        darkGreen: "#3E6E15",
        lightGreen: "#A0CBAA",
        brown: "#8B5B29",
        yellow: "#E1C12B",
        lightGray: "#F5F5DC",
      },
    },
  },
  plugins: [],
};
export default config;
