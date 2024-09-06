<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Color } from "@/types/color";
import "simple-hue-picker";

const Props = defineProps<{
  color: Color;
  disableDelete?: boolean;
  mode?: "edit" | "view";
}>();
const emit = defineEmits<{
  (e: "deleteColor", colorName: string): void;
  (e: "updateHue", hue: number, colorName: string): void;
  (e: "editColor", id: string): void;
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

const oklchCSSColor = computed(() => {
  return `oklch(${lightness.value} ${chroma.value} ${hue.value})`;
});

watch([hue], () => {
  emit("updateHue", hue.value, color.id);
});

function handleEdit() {
  emit("editColor", color.id);
}
</script>

<template>
  <div
    class="flex gap-2 border-blue-500 flex-col items-start px-2 py-2"
    :class="{
      'border-2': mode === 'edit',
    }"
  >
    <div class="w-16 h-10" :style="{ backgroundColor: oklchCSSColor }"></div>

    <label for="background">{{ color.name }} color </label>

    <label
      >Hue {{ hue }}

      <div class="my-2 mb-6" v-if="mode === 'edit'">
        <hue-picker
          :value="hue"
          @input="(e: { detail: number; }) => (hue = e.detail ?? hue)"
        >
        </hue-picker>
      </div>
    </label>

    <div class="flex">
      <div
        v-for="scaleValue in colorScale"
        :key="scaleValue"
        class="w-5 h-5"
        :style="{
          backgroundColor: `oklch(${scaleValue[0]}% ${scaleValue[1]} ${scaleValue[2]})`,
        }"
      ></div>
    </div>

    <div class="flex gap-2">
      <button
        v-if="!disableDelete"
        type="button"
        @click="emit('deleteColor', color.id)"
        class="bg-red-500 text-gray-50 px-3 py-2 rounded-sm inline my-2"
      >
        Delete color
      </button>
      <button
        v-if="mode === 'view'"
        type="button"
        @click="handleEdit"
        class="bg-blue-500 text-gray-50 px-3 py-2 rounded-sm inline my-2"
      >
        Edit color
      </button>
    </div>
  </div>
</template>
