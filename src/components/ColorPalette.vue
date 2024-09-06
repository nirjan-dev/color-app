<template>
  <div>
    <AddColor :existingColors="existingColors" @addColor="handleColorAdd" />
    <div class="flex gap-4">
      <div>
        <ColorSwatch
          class="mb-8"
          v-for="color in colorPalette.palette.value.colors"
          :key="color.id"
          :color="color"
          @deleteColor="handleColorDelete"
          @update-hue="handleHueUpdate"
          :mode="color.id === selectedColorId ? 'edit' : 'view'"
          @editColor="selectedColorId = color.id"
        />
      </div>
      <ColorScaleEdit v-model:color="selectedColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorSwatch from "@/components/ColorSwatch.vue";
import ColorScaleEdit from "@/components/ColorScaleEdit.vue";
import AddColor from "@/components/AddColor.vue";
import { useColorPalette } from "@/composables/useColorPalette";
import { computed, ref } from "vue";
import type { Color } from "@/types/color";
const colorPalette = useColorPalette();

const selectedColorId = ref(colorPalette.palette.value.colors[0]?.id);

const selectedColor = computed(() => {
  const color = colorPalette.palette.value.colors.find(
    (color) => color.id === selectedColorId.value
  );

  if (!color) {
    return colorPalette.createColor({ name: "default", baseHue: 0 });
  }
  return color;
});

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
