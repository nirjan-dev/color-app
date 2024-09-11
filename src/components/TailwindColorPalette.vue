<template>
  <div
    class="flex gap-2 py-2 fixed bottom-10 px-2 items-center bg-slate-100 z-10"
  >
    <label class="flex flex-col gap-2 items-center"
      >Primary
      <select v-model="primaryColor">
        <option v-for="(color, name) in colors" :key="color[500]" :value="name">
          {{ name }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Secondary
      <select v-model="secondaryColor">
        <option v-for="(color, name) in colors" :key="color[500]" :value="name">
          {{ name }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Accent
      <select v-model="accentColor">
        <option v-for="(color, name) in colors" :key="color[500]" :value="name">
          {{ name }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Background

      <select v-model="backgroundColor">
        <option v-for="(color, name) in colors" :key="color[500]" :value="name">
          {{ name }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Text
      <select v-model="textColor">
        <option v-for="(color, name) in colors" :key="color[500]" :value="name">
          {{ name }}
        </option>
      </select>
    </label>

    <button class="border-2 border-black px-6 py-2 font-bold ml-4">
      Export
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { TailwindColorName } from "@/utils/tailwindColors";
import { tailwindColors as colors } from "@/utils/tailwindColors";
const primaryColor = ref<TailwindColorName>("cyan");
const secondaryColor = ref<TailwindColorName>("pink");
const accentColor = ref<TailwindColorName>("fuchsia");
const backgroundColor = ref<TailwindColorName>("slate");
const textColor = ref<TailwindColorName>("gray");

watch(primaryColor, () => {
  setColorVariablesOnRoot("primary", primaryColor.value);
});

watch(secondaryColor, () => {
  setColorVariablesOnRoot("secondary", secondaryColor.value);
});

watch(accentColor, () => {
  setColorVariablesOnRoot("accent", accentColor.value);
});

watch(backgroundColor, () => {
  setColorVariablesOnRoot("background", backgroundColor.value);
});

watch(textColor, () => {
  setColorVariablesOnRoot("text", textColor.value);
});

function setColorVariablesOnRoot(
  name: string,
  selectedColor: TailwindColorName
) {
  if (!document) {
    return;
  }

  const selectedColorScale = colors[selectedColor];
  if (selectedColorScale instanceof Object) {
    for (const scaleKey in selectedColorScale) {
      document.documentElement.style.setProperty(
        `--${name}-${scaleKey}`,
        selectedColorScale[scaleKey]
      );
    }
  }
}
</script>

<style scoped>
.colorOptions__input:checked + .colorOptions__label .colorOptions__preview {
  @apply border-4 border-black;
}

.colorOptions__input {
  @apply hidden;
}

.colorOptions__label {
  @apply relative mb-2 inline-block;
}

.colorOptions__text {
  @apply inset-1/2 absolute;
}

.colorOptions:popover-open {
  @apply flex flex-wrap gap-4;
}
</style>
