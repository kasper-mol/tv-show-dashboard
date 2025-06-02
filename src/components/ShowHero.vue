<script setup>
defineProps({
  backgroundImage: {
    type: String,
    required: true,
  },
  onBack: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="hero-section">
    <img :src="backgroundImage" :alt="'Show backdrop'" class="hero-image" />
    <div class="hero-gradient-vertical"></div>
    <div class="hero-gradient-horizontal"></div>
    <button @click="onBack" class="back-button">← Back to Dashboard</button>
    <div class="hero-content">
      <div class="content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.hero-section {
  @apply relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[70vh] -mx-2 md:-mx-4 -mt-2 md:-mt-4;
}

.hero-image {
  @apply absolute inset-0 w-full h-full object-cover object-top sm:object-center brightness-50;
}

.hero-gradient-vertical {
  @apply absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/60;
}

.hero-gradient-horizontal {
  @apply absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-[#141414]/80;
}

.back-button {
  @apply absolute top-4 sm:top-8 left-4 sm:left-8 text-gray-300 hover:text-white flex items-center gap-2 z-20 cursor-pointer text-sm sm:text-base;
}

.hero-content {
  @apply relative z-10 flex items-end sm:items-end md:items-end pt-[5vh];
}

.content-wrapper {
  @apply p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto;
}
</style>
