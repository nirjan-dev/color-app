<template>
  <div
    class="grid gap-2 border-2 px-4 py-2 rounded-sm mt-2 mb-6 cursor-pointer"
  >
    <details open>
      <summary class="text-lg font-bold">Add color</summary>

      <div class="grid gap-4 px-4 py-2 border-t-2">
        <div
          class="flex gap-2 items-center justify-between"
          v-if="['hex', 'random', 'oklch', 'colorPicker'].includes(inputFormat)"
        >
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="awesome color #1"
            v-model="colorName"
          />
        </div>

        <div class="flex gap-2 items-center justify-between">
          <label for="inputFormat"> Input format </label>
          <select v-model="inputFormat" name="inputFormat" id="inputFormat">
            <option value="hex">Hex</option>
            <option value="random">Random</option>
            <option value="colorPicker">Color Picker</option>
            <option value="oklch">OKLCH</option>
            <option value="complimentary">Complimentary</option>
            <option value="analogous">Analogous</option>
            <option value="triad">Triad</option>
            <option value="tetrad">Tetrad</option>
          </select>
        </div>

        <div class="flex gap-2 items-center justify-between">
          <ColorSwatch
            v-if="inputFormat === 'oklch'"
            @update-hue="handleHueUpdate"
            :disable-delete="true"
            :color="defaultColor"
          />

          <template v-if="inputFormat === 'hex'">
            <input type="text" v-model="hexString" />
            <input type="color" disabled v-model="hexString" />
          </template>

          <template v-if="inputFormat === 'colorPicker'">
            <input type="color" v-model="hexString" />
          </template>

          <RelativeColorPicker
            :existingColors="existingColors"
            :input-format="inputFormat"
            @colors-to-add-update="onColorsToAddUpdate"
          />
        </div>

        <button
          type="button"
          class="bg-blue-500 text-gray-50 px-3 py-2 rounded"
          @click="onAddColor"
        >
          Add
        </button>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chroma from "chroma-js";
import ColorSwatch from "@/components/ColorSwatch.vue";

import type { Color } from "@/types/color";

import RelativeColorPicker from "./RelativeColorPicker.vue";
import { useColorPalette } from "@/composables/useColorPalette";

const Props = defineProps<{
  existingColors: Color[];
}>();

const { existingColors } = Props;

const emits = defineEmits<{
  (e: "addColor", color: Color): void;
}>();

const { createColor } = useColorPalette();

const defaultColor: Color =
  existingColors[0] ??
  createColor({
    baseHue: 23,
  });

const hexString = ref("#ffffff");

const colorName = ref("");

const inputFormat = ref<
  | "hex"
  | "random"
  | "colorPicker"
  | "oklch"
  | "complimentary"
  | "analogous"
  | "triad"
  | "tetrad"
>("oklch");

const colorsToAdd = ref<Color[]>([]);

function onColorsToAddUpdate(newColors: Color[]) {
  colorsToAdd.value = newColors;
}

function onAddColor() {
  let newColorHueToAdd;

  if (["colorPicker", "hex"].includes(inputFormat.value)) {
    const newColorOKLCH = Chroma(hexString.value)
      .oklch()
      .map((value) => Number(value.toFixed(2))) as [number, number, number];

    newColorHueToAdd = newColorOKLCH[2];
  } else if (inputFormat.value === "random") {
    const newColorOKLCH = Chroma.random()
      .oklch()
      .map((value) => Number(value.toFixed(2))) as [number, number, number];
    newColorHueToAdd = newColorOKLCH[2];
  } else {
    colorsToAdd.value.forEach((color) => {
      emits("addColor", color);
    });
    return;
  }

  const newColorToAdd = createColor({
    baseHue: newColorHueToAdd,
    name: colorName.value,
  });
  emits("addColor", newColorToAdd);
}

function handleHueUpdate(newHue: number) {
  colorsToAdd.value = [
    createColor({
      baseHue: newHue,
      name: colorName.value,
    }),
  ];
}
</script>

<style scoped></style>
