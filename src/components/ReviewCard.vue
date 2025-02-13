<script setup>
defineProps({
  name: String,
  body: String
})
</script>

<template>
  <figure
    class="relative w-64 cursor-pointer overflow-hidden p-4 shadow-lg hover:border-transparent hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-out"
  >
    <div
      class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[2px]"
    >
      <div class="h-full w-full rounded-xl bg-white dark:bg-gray-900"></div>
    </div>

    <div class="relative flex flex-row items-center gap-2">
      <img
        src="../assets/头像.png"
        class="rounded-full border-2 border-gray-200"
        width="32"
        height="32"
        alt="User Avatar"
      />
      <div class="flex flex-col">
        <span class="text-sm font-medium dark:text-white">
          {{ name }}
        </span>
      </div>
    </div>
    <blockquote class="mt-2 text-sm text-gray-700 dark:text-gray-300">
      "{{ body }}"
    </blockquote>
  </figure>
</template>

<style scoped>
figure {
  border-radius: 1rem; /* More rounded border */
  background-color: #f3f4f6; /* Light gray background */
  padding-top: 8px;
  padding-left: 8px;
}

figure:hover {
  /* 添加光晕效果 */
  box-shadow:
    0px 8px 20px rgba(129, 90, 247, 0.4),
    0px 4px 8px rgba(235, 81, 96, 0.2);
}
span {
  margin-left: 7px;
}
</style>
