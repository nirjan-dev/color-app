<template>
  <section class="grid grid-cols-12 gap-12 items-center py-20">
    <div class="col-span-6 flex flex-col gap-6">
      <h2 class="text-5xl font-extrabold mb-4">
        <span class="text-accent-500">Meet Chromastery.</span> The next-gen
        color palette generator for tailwind.
      </h2>
      <p class="text-lg opacity-90">
        The easiest way to generate a color palette for your next project. No
        design experience required. 100% Free, Forever.
      </p>
      <div class="flex gap-4 items-center">
        <a
          href="#"
          class="bg-primary-500 px-6 py-3 rounded-lg text-text-950 font-semibold"
          >Get Started</a
        >
        <a class="bg-secondary-500 px-6 py-3 rounded-lg" href="#">Learn more</a>
      </div>
    </div>
    <div class="col-span-6 relative">
      <img
        src="/images/colorful-flower.jpg"
        alt="a colorful flower"
        class="w-full h-auto shadow-xl transform -skew-x-3 skew-y-3 rounded-3xl"
      />

      <div
        class="transform rounded-3xl absolute inset-0 bg-gradient-to-r from-secondary-500 to-accent-500 opacity-50 mix-blend-multiply"
      ></div>
    </div>
  </section>

  <section></section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
