<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Chroma from "chroma-js";

const Props = defineProps<{
  defaultColor: number[];
  colorName: string;
  disableDelete?: boolean;
}>();
const emit = defineEmits<{
  (e: "deleteColor", colorName: string): void;
  (e: "updateColor", color: [number, number, number], colorName: string): void;
}>();

const { defaultColor, colorName } = Props;

const lightness = ref(defaultColor[0] ?? 0);
const chroma = ref(defaultColor[1] ?? 0);
const hue = ref(defaultColor[2] ?? 0);

const hexColor = computed(() =>
  Chroma.oklch(lightness.value, chroma.value, hue.value)
);

const oklchCSSColor = computed(() => {
  return `oklch(${lightness.value} ${chroma.value} ${hue.value})`;
});

watch([lightness, chroma, hue], () => {
  emit("updateColor", [lightness.value, chroma.value, hue.value], colorName);
});
</script>

<template>
  <div class="flex gap-2 flex-col items-start">
    <div class="w-16 h-10" :style="{ backgroundColor: oklchCSSColor }"></div>

    <label for="background">{{ colorName }} color: {{ hexColor }} </label>

    <label
      >Lightness {{ lightness }}

      <input
        class="block"
        type="range"
        name="lightness"
        id="lightness"
        step="0.01"
        min="0"
        max="1"
        v-model.number="lightness"
      />
    </label>

    <label
      >Chroma {{ chroma }}

      <input
        class="block"
        type="range"
        name="chroma"
        id="chroma"
        step="0.01"
        min="0"
        max="0.5"
        v-model.number="chroma"
      />
    </label>

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

    <button
      v-if="!disableDelete"
      type="button"
      @click="emit('deleteColor', colorName)"
      class="bg-red-500 text-gray-50 px-3 py-2 rounded-sm inline my-2"
    >
      Delete color
    </button>
  </div>
</template>
