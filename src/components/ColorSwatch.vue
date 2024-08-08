<script setup lang="ts">
import { ref, watch } from "vue";
import Chroma from "chroma-js";

const Props = defineProps<{
  defaultColor: number[];
  colorName: string;
}>();

const okLCHColor: any = ref<number[]>([...Props.defaultColor]);

const hexColor = ref(
  Chroma.oklch(
    okLCHColor.value[0],
    okLCHColor.value[1],
    okLCHColor.value[2]
  ).hex()
);

const lightness = ref(okLCHColor.value[0]);
const chroma = ref(okLCHColor.value[1]);
const hue = ref(okLCHColor.value[2]);

watch([hue, lightness, chroma], () => {
  okLCHColor.value = [lightness.value, chroma.value, hue.value];
  const newHexColor = Chroma.oklch(
    okLCHColor.value[0],
    okLCHColor.value[1],
    okLCHColor.value[2]
  ).hex();

  if (hexColor.value !== newHexColor) {
    hexColor.value = newHexColor;
  }
});
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
