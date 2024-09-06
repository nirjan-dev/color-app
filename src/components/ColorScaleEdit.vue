<template>
  <div v-if="color" class="flex gap-2">
    <div
      v-for="(_value, index) in color.lightnessScale"
      class="flex flex-col gap-2"
    >
      <form>
        <label>lightness</label>
        <input
          class="max-w-24 mt-1 mb-4"
          type="number"
          v-model="color.lightnessScale[index]"
          max="100"
          min="0"
          step="0.1"
        />

        <label>chroma</label>
        <input
          class="max-w-24 mt-1 mb-4"
          type="number"
          min="0"
          max="0.4"
          step="0.001"
          v-model="color.chromaScale[index]"
        />
      </form>
      <div
        class="w-full h-20"
        :style="{
          backgroundColor: `oklch(${color.lightnessScale[index]}% ${color.chromaScale[index]} ${color.baseHue})`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Color } from "@/types/color";
import { toRefs } from "vue";
const Props = defineProps<{
  color?: Color;
}>();

const color = defineModel<Color>("color");

// const { color } = toRefs(Props);

const emit = defineEmits<{
  (e: "updateColor", color: Color): void;
}>();

function handleColorUpdate(color: Color) {}
</script>

<style scoped></style>
