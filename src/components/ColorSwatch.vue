<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Chroma from "chroma-js";

const Props = defineProps<{
  defaultColor: number[];
  colorName: string;
}>();

const { defaultColor, colorName } = Props;

const lightness = ref(defaultColor[0] ?? 0);
const chroma = ref(defaultColor[1] ?? 0);
const hue = ref(defaultColor[2] ?? 0);

const hexColor = computed(() =>
  Chroma.oklch(lightness.value, chroma.value, hue.value)
);
</script>

<template>
  <div class="flex gap-2 flex-col items-start">
    <input
      type="color"
      readonly
      :value="hexColor"
      name="background"
      id="background"
      disabled
    />
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
  </div>
</template>
