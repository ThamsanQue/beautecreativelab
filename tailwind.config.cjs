/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        primary: "#1A1A1A",
        secondary: "#666666",
      },
      fontFamily: {
        sans: ["neue-haas-grotesk-display", "system-ui", "sans-serif"],
        serif: ["Times New Roman", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#1A1A1A",
            "--tw-prose-headings": "#1A1A1A",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
