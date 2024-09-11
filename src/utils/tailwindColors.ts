import colors from "tailwindcss/colors";
import type { DefaultColors } from "tailwindcss/types/generated/colors";

export const allTailwindColors = colors;

const colorsToExclude: (keyof DefaultColors)[] = [
  // deprecated
  "lightBlue",
  "warmGray",
  "trueGray",
  "coolGray",
  "blueGray",

  // no scale
  "black",
  "inherit",
  "current",
  "transparent",
  "black",
  "white",
];

export const tailwindColors = Object.fromEntries(
  Object.entries(allTailwindColors).filter(
    ([key]) => !colorsToExclude.includes(key as keyof DefaultColors)
  )
);

export const tailwindColorNames = Object.keys(tailwindColors);

export type TailwindColorName = (typeof tailwindColorNames)[number];

export type TailwindColor = (typeof tailwindColors)[TailwindColorName];
