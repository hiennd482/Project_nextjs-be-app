import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "subscibe-footer": "url(../assets/footer.jpg)",
        banner: "url(../assets/banner.jpg)",
        section1: "url(../assets/section1.jpg)",
        section2: "url(../assets/section2.jpg)",
        sectionabout: "url(../assets/sectionaboutus.png)",
      },
      colors: {
        "blue-custom": "#274C5B",
        "green-custom": "#7EB693",
        "yellow-custom": "#EFD372",
        "gray-custom": "#D4D4D4",
        "milk-custom": "#EFF6F1",
        "black-custom": "#525C60",
      },
    },
    animation: {
      wiggle: "wiggle 3s ease-in-out 1",
      fadene: "fadene 0.2s ease-in-out 1",
      modal: "modal 0.2s ease  1",
      boxJump: "boxJump 4s infinite ",
      leftrans: "leftrans 1s  1 ",
      trans: "trans 0.5s ease-in-out 1",
      trip: "trip 1s linear infinite",
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "translate(280px,80px)" },
        "50%": { transform: "translate(80px,10px)" },
      },
      fadene: {
        "0%": {
          opacity: `0`,
        },
        "100%": {
          opacity: `1`,
        },
      },
      modal: {
        "0%": {
          opacity: `0`,
          transform: "scale(0.95)",
        },
        "100%": {
          opacity: `1`,
          transform: "scale(1)",
        },
      },
      trans: {
        "0%": {
          width: "0px",
          // opacity: `0`,
        },
        "100%": {
          width: "250px",
          // opacity: `1`,
        },
      },
      leftrans: {
        "0%": {
          left: "-60px",
          // opacity: `0`,
        },
        "100%": {
          left: "60px",
          // opacity: `1`,
        },
      },
      boxJump: {
        "0%": {
          transform: " translate(0px,0px)",
        },
        "25%": {
          transform: "translate(40px, -120px)",
        },
        "50%": {
          transform: " translate(80px, 0px)",
        },
        "75%": {
          transform: "translate(40px, -120px)",
        },
        "100%": {
          transform: "translate(0px, 0px)",
        },
      },
      trip: {
        "0%": {
          backgroundPosition: "50px 0",
        },
        "100%": {
          backgroundPosition: "0 0",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
    nextui(),
  ],
};
