import type { Color } from "@/types/color";
import { ref } from "vue";
import {
  defaultChromaScale,
  defaultLightnessScale,
} from "@/utils/defaultScaleValues";
import { generateColorID } from "@/utils/colorFunctions";

export function useColorPalette() {
  const palette = ref<{
    name: string;
    colors: Color[];
  }>({
    name: "",
    colors: [
      {
        id: generateColorID(),
        name: "Background",
        baseHue: 220,
        lightnessScale: [...defaultLightnessScale],
        chromaScale: [...defaultChromaScale],
      },
      {
        id: generateColorID(),
        name: "Primary",
        baseHue: 270,
        lightnessScale: [...defaultLightnessScale],
        chromaScale: [...defaultChromaScale],
      },
      {
        id: generateColorID(),
        name: "Secondary",
        baseHue: 320,
        lightnessScale: [...defaultLightnessScale],
        chromaScale: [...defaultChromaScale],
      },
    ],
  });

  function deleteColor(id: string) {
    palette.value.colors = palette.value.colors.filter(
      (color) => color.id !== id
    );
  }

  function addColor(color: Color) {
    palette.value.colors.unshift(color);
  }

  function updateHue(hue: number, id: string) {
    const colorIndex = palette.value.colors.findIndex((c) => c.id === id);
    if (colorIndex === -1 || !palette.value.colors[colorIndex]) return;

    palette.value.colors[colorIndex].baseHue = hue;
  }

  return { palette, deleteColor, addColor, updateHue };
}
