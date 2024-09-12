<template>
  <div
    class="p-2 pt-14 pb-4 px-4 bg-slate-50 border border-slate-200 rounded-sm mt-2 relative"
  >
    <button
      @click="handleCopy"
      type="button"
      class="absolute top-0 right-0 bg-slate-200 px-3 py-2"
    >
      {{ copyBtnText }}
    </button>
    <pre><code>{{ Props.snippet }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const Props = defineProps<{
  snippet: string;
}>();
const copyBtnText = ref("Copy");

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(Props.snippet);

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
