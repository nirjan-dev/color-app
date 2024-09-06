<template>
  <details
    class="grid gap-2 border-2 border-black px-4 py-2 rounded-sm mt-2 mb-6 max-w-fit"
  >
    <summary class="text-lg font-bold cursor-pointer">Tailwind Export</summary>

    <p class="mb-2 mt-4">
      Paste this into your tailwind config inside the theme.extend object.
    </p>
    <div
      class="p-2 bg-slate-50 border border-slate-200 rounded-sm mt-2 relative"
    >
      <button
        @click="handleCopy"
        type="button"
        class="absolute top-0 right-0 bg-slate-200 px-3 py-2"
      >
        {{ copyBtnText }}
      </button>
      <pre><code>{{ tailwindConfigSnippet }}</code></pre>
    </div>
  </details>
</template>

<script setup lang="ts">
import type { TailwindConfigExport } from "@/types/color";
import { computed, ref } from "vue";

const copyBtnText = ref("Copy");

const Props = defineProps<{
  tailwindConfig: TailwindConfigExport;
}>();

const tailwindConfigSnippet = computed(() => {
  return JSON.stringify(Props.tailwindConfig, null, 1).slice(1, -1);
});

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(tailwindConfigSnippet.value);

    copyBtnText.value = "Copied!";

    setTimeout(() => {
      copyBtnText.value = "Copy";
    }, 1000);
  } catch (error) {
    alert("Failed to copy: " + error);
  }
}
</script>

<style scoped></style>
