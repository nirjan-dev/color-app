<template>
  <div>
    <AddColor :existingColors="existingColors" @addColor="handleColorAdd" />
    <ColorSwatch
      v-for="color in colorPalette.palette.value.colors"
      :key="color.name"
      :colorName="color.name"
      :defaultColor="color.lch"
      @deleteColor="handleColorDelete"
      @updateColor="handleColorUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import ColorSwatch from "@/components/ColorSwatch.vue";
import AddColor from "@/components/AddColor.vue";
import { useColorPalette } from "@/composables/useColorPalette";
import { computed } from "vue";
const colorPalette = useColorPalette();

const existingColors = computed(() => {
  return colorPalette.palette.value.colors;
});

function handleColorDelete(colorName: string) {
  colorPalette.deleteColor(colorName);
}

function handleColorAdd(lch: [number, number, number], newColorName: string) {
  let name = newColorName;

  if (name === "") {
    name = `Color no. ${colorPalette.palette.value.colors.length + 1}`;
  }

  colorPalette.addColor({
    name,
    lch,
  });
}

function handleColorUpdate(lch: [number, number, number], name: string) {
  colorPalette.updateColor({
    lch,
    name,
  });
}
</script>

<style scoped></style>
