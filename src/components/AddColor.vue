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

          <template
            v-if="
              ['analogous', 'triad', 'complimentary', 'tetrad'].includes(
                inputFormat
              )
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

            <template v-if="inputFormat === 'complimentary'">
              <div
                class="w-16 h-10 block"
                :style="{
                  backgroundColor: `oklch(${complimentaryColor[0]} ${complimentaryColor[1]} ${complimentaryColor[2]})`,
                }"
              ></div>
            </template>

            <template v-if="inputFormat === 'analogous'">
              <div
                v-for="color in analogousColors"
                class="w-16 h-10"
                :key="`${color[0]} ${color[1]} ${color[2]}`"
                :style="{
                  backgroundColor: `oklch(${color[0]} ${color[1]} ${color[2]})`,
                }"
              ></div>
            </template>

            <template v-if="inputFormat === 'triad'">
              <div
                v-for="color in triadicColors"
                class="w-16 h-10"
                :style="{
                  backgroundColor: `oklch(${color[0]} ${color[1]} ${color[2]})`,
                }"
                :key="`${color[0]} ${color[1]} ${color[2]}`"
              ></div>
            </template>

            <template v-if="inputFormat === 'tetrad'">
              <div
                v-for="color in tetradicColors"
                class="w-16 h-10"
                :style="{
                  backgroundColor: `oklch(${color[0]} ${color[1]} ${color[2]})`,
                }"
                :key="`${color[0]} ${color[1]} ${color[2]}`"
              ></div>
            </template>
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
const baseColorLCH = ref(Props.existingColors[0]?.lch ?? lch.value);
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

const complimentaryColor = computed(() => {
  return getComplimentaryColor(baseColorLCH.value);
});

const triadicColors = computed(() => {
  return getTriadicColors(baseColorLCH.value);
});

const tetradicColors = computed(() => {
  return getTetradColors(baseColorLCH.value);
});

const analogousColors = computed(() => {
  return getAnalogousColors(baseColorLCH.value);
});

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
    finalLCHValue = getComplimentaryColor(baseColorLCH.value);
  } else if (inputFormat.value === "triad") {
    const [finalLCHValue1, finalLCHValue2] = getTriadicColors(
      baseColorLCH.value
    );
    if (!finalLCHValue1 || !finalLCHValue2) return;
    emits("addColor", finalLCHValue1, colorName.value);
    emits("addColor", finalLCHValue2, colorName.value);
    return;
  } else if (inputFormat.value === "tetrad") {
    const [finalLCHValue1, finalLCHValue2, finalLCHValue3] = getTetradColors(
      baseColorLCH.value
    );

    if (!finalLCHValue1 || !finalLCHValue2 || !finalLCHValue3) return;
    emits("addColor", finalLCHValue1, colorName.value);
    emits("addColor", finalLCHValue2, colorName.value);
    emits("addColor", finalLCHValue3, colorName.value);
    return;
  } else if (inputFormat.value === "analogous") {
    const [finalLCHValue1, finalLCHValue2] = getAnalogousColors(
      baseColorLCH.value
    );

    if (!finalLCHValue1 || !finalLCHValue2) return;
    emits("addColor", finalLCHValue1, colorName.value);
    emits("addColor", finalLCHValue2, colorName.value);
    return;
  } else {
    finalLCHValue = lch.value;
  }

  emits("addColor", finalLCHValue, colorName.value);
}

function handleUpdateLCHColor(newLCH: [number, number, number]) {
  lch.value = newLCH;
}

function getComplimentaryColor(
  lch: [number, number, number]
): [number, number, number] {
  const hueStep = 180;
  const starterHue = lch[2];
  const complimentaryHue = (starterHue + hueStep) % 360;
  const formattedComplimentaryHue = Number(complimentaryHue.toFixed(2));
  return [lch[0], lch[1], formattedComplimentaryHue] as [
    number,
    number,
    number
  ];
}

function getTriadicColors(lch: [number, number, number]) {
  const hueStep = 120;
  const starterHue = lch[2];

  const triadColors: [number, number, number][] = [];
  for (let index = 1; index < 3; index++) {
    const newHue = (starterHue + index * hueStep) % 360;
    const formattedHue = Number(newHue.toFixed(2));

    triadColors.push([lch[0], lch[1], formattedHue] as [
      number,
      number,
      number
    ]);
  }

  return triadColors;
}

function getTetradColors(lch: [number, number, number]) {
  const hueStep = 90;
  const starterHue = lch[2];

  const tetradColors: [number, number, number][] = [];
  for (let index = 1; index < 4; index++) {
    const newHue = (starterHue + index * hueStep) % 360;
    const formattedHue = Number(newHue.toFixed(2));

    tetradColors.push([lch[0], lch[1], formattedHue] as [
      number,
      number,
      number
    ]);
  }

  return tetradColors;
}

function getAnalogousColors(lch: [number, number, number]) {
  const hueStep = 30;
  const starterHue = lch[2];

  const analogousColors: [number, number, number][] = [];
  for (let index = 1; index < 3; index++) {
    const newHue = (starterHue + index * hueStep) % 360;
    const formattedHue = Number(newHue.toFixed(2));

    analogousColors.push([lch[0], lch[1], formattedHue] as [
      number,
      number,
      number
    ]);
  }

  return analogousColors;
}
</script>

<style scoped></style>
