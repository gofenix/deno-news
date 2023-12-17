import { type Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },

  //@ts-ignore
  plugins: [daisyui, typography],
} satisfies Config;
