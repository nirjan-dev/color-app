import colors from "tailwindcss/colors";
import { ref } from "vue";

export function useTailwindColorPalette() {
  const colorPalette = ref<
    {
      name: string;
      color: string;
    }[]
  >([
    {
      name: "Primary",
      color: colors.blue[500],
    },
  ]);

  return {
    colorPalette,
  };
}
