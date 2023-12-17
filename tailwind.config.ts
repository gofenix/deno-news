import { type Config } from "tailwindcss";
import daisyui from 'daisyui'

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],

  //@ts-ignore
  plugins: [daisyui],
} satisfies Config;
