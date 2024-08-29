<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Chroma from "chroma-js";
import type { Color } from "@/types/color";

const Props = defineProps<{
  color: Color;
  disableDelete?: boolean;
}>();
const emit = defineEmits<{
  (e: "deleteColor", colorName: string): void;
  (e: "updateHue", hue: number, colorName: string): void;
}>();

const { color } = Props;

const lightness = ref(color.lightnessScale[4] ?? 0);
const chroma = ref(color.chromaScale[4] ?? 0);
const hue = ref(color.baseHue ?? 0);

const lightnessScale = ref(color.lightnessScale);
const chromaScale = ref(color.chromaScale);

const colorScale = computed(() => {
  const scale = lightnessScale.value.map((lightness, index) => {
    return [lightness, chromaScale.value[index], hue.value];
  });

  return scale;
});

const hexColor = computed(() =>
  Chroma.oklch(lightness.value, chroma.value, hue.value)
);

const oklchCSSColor = computed(() => {
  return `oklch(${lightness.value} ${chroma.value} ${hue.value})`;
});

watch([hue], () => {
  emit("updateHue", hue.value, color.id);
});
</script>

<template>
  <div class="flex gap-2 flex-col items-start">
    <div class="w-16 h-10" :style="{ backgroundColor: oklchCSSColor }"></div>

    <label for="background">{{ color.name }} color: {{ hexColor }} </label>

    <label
      >Hue {{ hue }}

      <input
        class="block"
        type="range"
        name="hue"
        id="hue"
        step="0.1"
        min="0"
        max="360"
        v-model.number="hue"
      />
    </label>

    <div class="flex gap-2">
      <div
        v-for="scaleValue in colorScale"
        :key="scaleValue"
        class="w-16 h-10"
        :style="{
          backgroundColor: `oklch(${scaleValue[0]}% ${scaleValue[1]} ${scaleValue[2]})`,
        }"
      ></div>
    </div>

    <button
      v-if="!disableDelete"
      type="button"
      @click="emit('deleteColor', color.id)"
      class="bg-red-500 text-gray-50 px-3 py-2 rounded-sm inline my-2"
    >
      Delete color
    </button>
  </div>
</template>
