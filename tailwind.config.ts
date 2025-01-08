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
        mainButton: "#181818",
        lightGreen: "#A0CBAA",
        brown: "#8B5B29",
        yellow: "#E1C12B",
        lightGrayButton: "#5e5e5e",
        mediumGray: "#B0B0B0",
        darkGray: "#7E7E7E",
        softRed: "#D9534F",
        softBlue: "#5BC0DE",
        semiHitHorange: "#f3722c",
        missRed: "#f94144",
        hitGreen: "#90be6d",
        tableBg: "#181818",
        filterBg: "#181818",
        highcoreTableBg: "#030303",
        minigameHeader: "#FFFFFF",
        paleYellow: "#F7EA00",
        teal: "#20B2AA",
        finishButton: "#FFFFFF",
        additionalCenterButton: "#181818",
        modal: "#111111",
        mainButtonHover: "#5e5e5e",
        secondaryButtonHover: "#B0B0B0"
      },
    },
  },
  plugins: [],
};
export default config;
