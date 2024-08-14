<template>
  <div
    class="grid gap-2 border-2 px-4 py-2 rounded-sm mt-2 mb-6 cursor-pointer"
  >
    <details open>
      <summary class="text-lg font-bold">Add color</summary>

      <div class="grid gap-4 px-4 py-2 border-t-2">
        <div class="flex gap-2 items-center justify-between">
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
            <option value="quad">Quad</option>
            <option value="monochrome">Monochrome</option>
            <option value="tetrad">Tetrad</option>
          </select>
        </div>

        <div class="flex gap-2 items-center justify-between">
          <ColorSwatch
            v-if="inputFormat === 'oklch'"
            @update-color="handleUpdateLCHColor"
            :disable-delete="true"
            :color-name="colorName"
            :default-color="lch"
          />

          <template v-if="inputFormat === 'hex'">
            <input type="text" v-model="hexString" />
            <input type="color" disabled v-model="hexString" />
          </template>

          <template v-if="inputFormat === 'colorPicker'">
            <input type="color" v-model="hexString" />
          </template>

          <template v-if="inputFormat === 'complimentary'">
            <fieldset>
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
                      backgroundColor: `oklch(${color.lch[0]} ${color.lch[1]} ${color.lch[2]})`,
                    }"
                  ></div>
                  <input
                    type="radio"
                    :id="`color-${color.name}`"
                    :value="color.lch"
                    v-model="baseColorLCH"
                  />
                </label>
              </div>
            </fieldset>
          </template>
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
import { ref, computed } from "vue";
import Chroma from "chroma-js";
import ColorSwatch from "@/components/ColorSwatch.vue";

const Props = defineProps<{
  existingColors: {
    name: string;
    lch: [number, number, number];
  }[];
}>();

const emits = defineEmits<{
  (e: "addColor", lch: [number, number, number], colorName: string): void;
}>();

const lch = ref<[number, number, number]>([0.5, 0.3, 123]);
const baseColorLCH = ref();
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
  | "quad"
  | "monochrome"
  | "tetrad"
>("oklch");

function onAddColor() {
  let finalLCHValue;

  if (["colorPicker", "hex"].includes(inputFormat.value)) {
    finalLCHValue = Chroma(hexString.value)
      .oklch()
      .map((value) => Number(value.toFixed(2))) as [number, number, number];
  } else if (inputFormat.value === "random") {
    finalLCHValue = Chroma.random()
      .oklch()
      .map((value) => Number(value.toFixed(2))) as [number, number, number];
  } else if (inputFormat.value === "complimentary") {
    const baseColor = baseColorLCH.value as [number, number, number];

    let complimentaryHue = (baseColor[2] + 180) % 360;

    finalLCHValue = [baseColor[0], baseColor[1], complimentaryHue] as [
      number,
      number,
      number
    ];
  } else {
    finalLCHValue = lch.value;
  }

  emits("addColor", finalLCHValue, colorName.value);
}

function handleUpdateLCHColor(newLCH: [number, number, number]) {
  lch.value = newLCH;
}
</script>

<style scoped></style>
