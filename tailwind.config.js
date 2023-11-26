/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
