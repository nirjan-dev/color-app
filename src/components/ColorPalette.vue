<template>
  <div>
    <AddColor :existingColors="existingColors" @addColor="handleColorAdd" />
    <ColorSwatch
      v-for="color in colorPalette.palette.value.colors"
      :key="color.id"
      :color="color"
      @deleteColor="handleColorDelete"
      @update-hue="handleHueUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import ColorSwatch from "@/components/ColorSwatch.vue";
import AddColor from "@/components/AddColor.vue";
import { useColorPalette } from "@/composables/useColorPalette";
import { computed } from "vue";
import type { Color } from "@/types/color";
const colorPalette = useColorPalette();

const existingColors = computed(() => {
  return colorPalette.palette.value.colors;
});

function handleColorDelete(colorName: string) {
  colorPalette.deleteColor(colorName);
}

function handleColorAdd(color: Color) {
  colorPalette.addColor(color);
}

function handleHueUpdate(hue: number, id: string) {
  colorPalette.updateHue(hue, id);
}
</script>

<style scoped></style>
