import type { Color, TailwindConfigExport } from "@/types/color";
import { computed, ref } from "vue";
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
      createColor({
        name: "Background",
        baseHue: 220,
      }),
      createColor({
        name: "Primary",
        baseHue: 270,
      }),
      createColor({
        name: "Secondary",
        baseHue: 200,
      }),
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

  function createColor(config: { name?: string; baseHue?: number }) {
    let name = config.name || `Color #${palette.value.colors.length + 1} `;
    const baseHue = config.baseHue || 23;
    const newColor: Color = {
      id: generateColorID(),
      name,
      baseHue,
      lightnessScale: [...defaultLightnessScale],
      chromaScale: [...defaultChromaScale],
    };
    return newColor;
  }

  const tailwindScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const tailwindConfig = computed<TailwindConfigExport>(() => {
    console.log(palette.value.colors);
    const colors: Record<string, Record<number, string>> = {};
    palette.value.colors.forEach((color) => {
      const colorScale: Record<number, string> = {};

      tailwindScale.forEach((scaleItem, index) => {
        colorScale[
          scaleItem
        ] = `oklch(${color.lightnessScale[index]}% ${color.chromaScale[index]} ${color.baseHue} / <alpha-value>)`;
      });

      colors[color.name] = colorScale;
    });

    return {
      colors,
    };
  });

  return {
    palette,
    deleteColor,
    addColor,
    updateHue,
    createColor,
    tailwindConfig,
  };
}
