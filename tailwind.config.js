/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "mainpage-first-section": "url('/public/images/first-section-bg.png')",
        "mainpage-second-section":
          "url('/public/images/second-section-bg.png')",
        "mainpage-third-section": "url('/public/images/third-section-bg.png')",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/line-clamp"),
  ],
};
