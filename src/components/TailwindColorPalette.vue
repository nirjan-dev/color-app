<template>
  <div
    class="flex gap-2 py-2 fixed bottom-10 px-2 items-center bg-slate-100 z-10"
  >
    <!-- <button for="colorName" popovertarget="primary-color-options">
      Primary
    </button>

    <div id="primary-color-options" class="colorOptions" popover>
      <template v-for="(color, name) in colors" :key="color[500]">
        <div v-if="color[500]">
          <input
            class="colorOptions__input"
            type="radio"
            :id="name"
            :value="color[500]"
            v-model="selectedColor"
          />
          <label class="colorOptions__label" :for="name"
            ><span
              class="colorOptions__preview w-28 h-10 inline-flex items-center justify-center"
              :style="{ backgroundColor: color[500] }"
            >
              {{ name }}
            </span></label
          >
        </div>
      </template>
    </div> -->

    <label class="flex flex-col gap-2 items-center"
      >Primary Color
      <select>
        <option value="none">None</option>
        <option
          v-for="(color, name) in colors"
          :key="color[500]"
          :value="color[500]"
        >
          {{ name }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Secondary Color
      <select>
        <option value="none">None</option>
        <option
          v-for="(color, name) in colors"
          :key="color[500]"
          :value="color[500]"
        >
          {{ name }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Accent Color
      <select>
        <option value="none">None</option>
        <option
          v-for="(color, name) in colors"
          :key="color[500]"
          :value="color[500]"
        >
          {{ name }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Background Color
      <input type="color" value="#ffffff" />
    </label>

    <label class="flex flex-col gap-2 items-center"
      >Text Color
      <input type="color" />
    </label>

    <button class="border-2 border-black px-6 py-2 font-bold ml-4">
      Export
    </button>
  </div>
</template>

<script setup lang="ts">
import colors from "tailwindcss/colors";
import { useTailwindColorPalette } from "@/composables/useTailwindColorPalette";
import { ref, watch } from "vue";

const tailwindColorPalette = useTailwindColorPalette();

const selectedColor = ref<string>(colors.blue[500]);
const colorName = ref<string>("Primary");

watch([selectedColor, colorName], () => {
  tailwindColorPalette.colorPalette.value = [
    {
      name: colorName.value,
      color: selectedColor.value,
    },
  ];
});
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
