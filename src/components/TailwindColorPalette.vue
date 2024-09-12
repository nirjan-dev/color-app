<template>
  <div
    class="flex gap-2 py-3 fixed bottom-10 px-6 shadow-md items-center bg-slate-200 z-10"
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

    <button
      onclick="tailwindExportModal.showModal()"
      class="border-2 border-black px-6 py-2 font-bold ml-4 hover:bg-black hover:text-white transition-colors focus:bg-black focus:text-white"
    >
      Export
    </button>

    <dialog class="text-center py-2 px-2 shadow-2xl" id="tailwindExportModal">
      <div class="p-4 flex flex-col gap-1 text-left">
        <p>Paste this at the start of your tailwind config</p>
        <CodeBlock
          class="mb-4"
          :snippet="`const colors = require('tailwindcss/colors')`"
        />
        <p>Paste this inside the theme.colors object</p>
        <CodeBlock :snippet="tailwindConfigExport" />
      </div>
      <button
        class="px-4 py-2 bg-black text-white"
        onclick="tailwindExportModal.close()"
      >
        Close
      </button>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { TailwindColorName } from "@/utils/tailwindColors";
import { tailwindColors as colors } from "@/utils/tailwindColors";
import CodeBlock from "./CodeBlock.vue";
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

const tailwindConfigExport = computed(() => {
  const config = `
colors: {
  primary: colors.${primaryColor.value},
  secondary: colors.${secondaryColor.value},
  accent: colors.${accentColor.value},
  background: colors.${backgroundColor.value},
  text: colors.${textColor.value},
  ...colors,
}
  `;
  return config;
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
