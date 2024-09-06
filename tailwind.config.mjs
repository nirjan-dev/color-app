/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        Background: {
          50: "oklch(97.78% 0.0108 220 / <alpha-value>)",
          100: "oklch(93.56% 0.0321 220 / <alpha-value>)",
          200: "oklch(88.11% 0.0609 220 / <alpha-value>)",
          300: "oklch(82.67% 0.0908 220 / <alpha-value>)",
          400: "oklch(74.22% 0.1398 220 / <alpha-value>)",
          500: "oklch(64.78% 0.1472 220 / <alpha-value>)",
          600: "oklch(57.33% 0.1299 220 / <alpha-value>)",
          700: "oklch(46.89% 0.1067 220 / <alpha-value>)",
          800: "oklch(39.44% 0.0898 220 / <alpha-value>)",
          900: "oklch(32% 0.0726 220 / <alpha-value>)",
        },
        Primary: {
          50: "oklch(97.78% 0.0108 270 / <alpha-value>)",
          100: "oklch(93.56% 0.0321 270 / <alpha-value>)",
          200: "oklch(88.11% 0.0609 270 / <alpha-value>)",
          300: "oklch(82.67% 0.0908 270 / <alpha-value>)",
          400: "oklch(74.22% 0.1398 270 / <alpha-value>)",
          500: "oklch(64.78% 0.1472 270 / <alpha-value>)",
          600: "oklch(57.33% 0.1299 270 / <alpha-value>)",
          700: "oklch(46.89% 0.1067 270 / <alpha-value>)",
          800: "oklch(39.44% 0.0898 270 / <alpha-value>)",
          900: "oklch(32% 0.0726 270 / <alpha-value>)",
        },
        Secondary: {
          50: "oklch(97.78% 0.0108 200 / <alpha-value>)",
          100: "oklch(93.56% 0.0321 200 / <alpha-value>)",
          200: "oklch(88.11% 0.0609 200 / <alpha-value>)",
          300: "oklch(82.67% 0.0908 200 / <alpha-value>)",
          400: "oklch(74.22% 0.1398 200 / <alpha-value>)",
          500: "oklch(64.78% 0.1472 200 / <alpha-value>)",
          600: "oklch(57.33% 0.1299 200 / <alpha-value>)",
          700: "oklch(46.89% 0.1067 200 / <alpha-value>)",
          800: "oklch(39.44% 0.0898 200 / <alpha-value>)",
          900: "oklch(32% 0.0726 200 / <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
