<template>
  <template
    v-if="
      ['analogous', 'triad', 'complimentary', 'tetrad'].includes(inputFormat)
    "
  >
    <fieldset class="flex flex-col items-center">
      <legend>Select Base color</legend>

      <div v-for="color in existingColors" :key="color.name">
        <label
          class="flex gap-2 my-2 items-center"
          :for="`color-${color.name}`"
        >
          {{ color.name }}
          <div
            class="w-16 h-10"
            :style="{
              backgroundColor: `oklch(${color.lightnessScale[4]} ${color.chromaScale[4]} ${color.baseHue})`,
            }"
          ></div>
          <input
            type="radio"
            :id="`color-${color.name}`"
            :value="color.baseHue"
            v-model="baseColorHue"
          />
        </label>
      </div>
    </fieldset>

    <template v-if="inputFormat === 'complimentary'">
      <div
        class="w-16 h-10 block"
        :style="{
          backgroundColor: `oklch(${complimentaryColor.lightnessScale[4]} ${complimentaryColor.chromaScale[4]} ${complimentaryColor.baseHue})`,
        }"
      ></div>
    </template>

    <template v-if="inputFormat === 'analogous'">
      <div
        v-for="color in analogousColors"
        class="w-16 h-10"
        :key="color.id"
        :style="{
          backgroundColor: `oklch(${color.lightnessScale[4]} ${color.chromaScale[4]} ${color.baseHue})`,
        }"
      ></div>
    </template>

    <template v-if="inputFormat === 'triad'">
      <div
        v-for="color in triadicColors"
        class="w-16 h-10"
        :style="{
          backgroundColor: `oklch(${color.lightnessScale[4]} ${color.chromaScale[4]} ${color.baseHue})`,
        }"
        :key="color.id"
      ></div>
    </template>

    <template v-if="inputFormat === 'tetrad'">
      <div
        v-for="color in tetradicColors"
        class="w-16 h-10"
        :style="{
          backgroundColor: `oklch(${color.lightnessScale[4]} ${color.chromaScale[4]} ${color.baseHue})`,
        }"
        :key="color.id"
      ></div>
    </template>
  </template>
</template>

<script setup lang="ts">
import type { Color } from "@/types/color";
import {
  generateColorID,
  getAnalogousColorHues,
  getComplimentaryColorHue,
  getTetradColorHues,
  getTriadicColorHues,
} from "@/utils/colorFunctions";

import {
  defaultChromaScale,
  defaultLightnessScale,
} from "@/utils/defaultScaleValues";

import { computed, ref, watch } from "vue";
const Props = defineProps<{
  existingColors: Color[];
  inputFormat:
    | "hex"
    | "random"
    | "oklch"
    | "colorPicker"
    | "complimentary"
    | "analogous"
    | "triad"
    | "tetrad";
}>();

const baseColor = ref(
  Props.existingColors[0] ?? {
    baseHue: 23,
    chromaScale: defaultChromaScale,
    lightnessScale: defaultLightnessScale,
    name: "Default",
  }
);

const baseColorHue = ref(baseColor.value.baseHue);

const complimentaryColor = computed<Color>(() => {
  const complimentaryColorHue = getComplimentaryColorHue(baseColorHue.value);

  return {
    id: generateColorID(),
    baseHue: complimentaryColorHue,
    chromaScale: [...defaultChromaScale],
    lightnessScale: [...defaultLightnessScale],
    name: "Complimentary",
  };
});

const triadicColors = computed<Color[]>(() => {
  const triadicColorHues = getTriadicColorHues(baseColorHue.value);

  return triadicColorHues.map((hue, index) => {
    return {
      id: generateColorID(),
      baseHue: hue,
      chromaScale: [...defaultChromaScale],
      lightnessScale: [...defaultLightnessScale],
      name: `Triadic Color ${index + 1}`,
    };
  });
});

const tetradicColors = computed<Color[]>(() => {
  const tetradColorHues = getTetradColorHues(baseColorHue.value);

  return tetradColorHues.map((hue, index) => {
    return {
      id: generateColorID(),
      baseHue: hue,
      chromaScale: [...defaultChromaScale],
      lightnessScale: [...defaultLightnessScale],
      name: `Tetrad Color ${index + 1}`,
    };
  });
});

const analogousColors = computed<Color[]>(() => {
  const analogousColorHues = getAnalogousColorHues(baseColorHue.value);

  return analogousColorHues.map((hue, index) => {
    return {
      id: generateColorID(),
      baseHue: hue,
      chromaScale: [...defaultChromaScale],
      lightnessScale: [...defaultLightnessScale],
      name: `Analogous Color ${index + 1}`,
    };
  });
});

const emits = defineEmits<{
  (e: "colorsToAddUpdate", colorsToAdd: Color[]): void;
}>();

watch([Props], () => {
  let colorsToAdd: Color[] = [];

  switch (Props.inputFormat) {
    case "complimentary":
      colorsToAdd = [complimentaryColor.value];
      break;
    case "analogous":
      colorsToAdd = [...analogousColors.value];
      break;
    case "triad":
      colorsToAdd = [...triadicColors.value];
      break;
    case "tetrad":
      colorsToAdd = [...tetradicColors.value];
      break;
    default:
      break;
  }

  emits("colorsToAddUpdate", colorsToAdd);
});
</script>
