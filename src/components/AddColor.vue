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
          <select name="inputFormat" id="inputFormat">
            <option value="hex">Hex</option>
            <option value="random">Random</option>
            <option value="colorPicker">Color Picker</option>
            <option value="lch">LCH</option>
            <option value="complimentary">Complimentary</option>
            <option value="analogous">Analogous</option>
            <option value="triad">Triad</option>
            <option value="quad">Quad</option>
            <option value="monochrome">Monochrome</option>
            <option value="tetrad">Tetrad</option>
          </select>
        </div>

        <div class="flex gap-2 items-center justify-between">
          <label for="color">Color</label>
          <input
            type="color"
            id="color"
            name="color"
            value="#ff0000"
            title="Choose a color"
            placeholder="Choose a color"
            v-model="hexValue"
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
import { ref, computed } from "vue";
import Chroma from "chroma-js";

const emits = defineEmits<{
  (e: "addColor", lch: [number, number, number], colorName: string): void;
}>();

const hexValue = ref("#00ffff");
const colorName = ref("");

const lch = computed<[number, number, number]>(() => {
  return Chroma(hexValue.value)
    .lch()
    .map((n) => Number(n.toFixed(2)))
    .splice(0, 3) as [number, number, number];
});

function onAddColor() {
  emits("addColor", lch.value, colorName.value);
}
</script>

<style scoped></style>
