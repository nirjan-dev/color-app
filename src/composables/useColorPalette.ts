import { ref } from "vue";

export function useColorPalette() {
  const palette = ref<{
    name: string;
    colors: { name: string; lch: [number, number, number] }[];
  }>({
    name: "",
    colors: [
      {
        name: "Background",
        lch: [0.2, 0.5, 220],
      },
      {
        name: "Primary",
        lch: [0.2, 0.5, 270],
      },
      {
        name: "Secondary",
        lch: [0.2, 0.5, 320],
      },
    ],
  });

  function deleteColor(colorName: string) {
    palette.value.colors = palette.value.colors.filter(
      (color) => color.name !== colorName
    );
  }

  function addColor(color: { name: string; lch: [number, number, number] }) {
    palette.value.colors.unshift(color);
  }

  function updateColor(color: { name: string; lch: [number, number, number] }) {
    const colorIndex = palette.value.colors.findIndex(
      (c) => c.name === color.name
    );
    palette.value.colors[colorIndex] = color;
  }

  return { palette, deleteColor, addColor, updateColor };
}
