import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primaryGold: "#f3a928",
        primaryGoldLight: "#f8f295",
        deepGold: "#FFB92E",
        midGold: "#FFC247",
        lightGold: "#FFD37A",
        xlGold: "#FFE4AD",
        whiteGold: "#FFF5E0",
        darkGold: "#251f14",

        // gray
        semiGrey: "#757575",

        // black
        darkBrown: "#191307",

        // dark
        secondaryDark: "#33270E",
      },
    },
  },
  plugins: [],
};
export default config;
