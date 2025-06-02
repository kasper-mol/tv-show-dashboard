<script setup>
import CastMember from './CastMember.vue'

defineProps({
  cast: {
    type: Array,
    required: true,
    validator: (cast) => {
      return cast.every((member) => member.person && member.character)
    },
  },
})
</script>

<template>
  <div class="cast-section">
    <div class="cast-wrapper">
      <h2 class="cast-title">Cast</h2>
      <div class="cast-grid">
        <CastMember
          v-for="member in cast"
          :key="member.person.id"
          :person="member.person"
          :character="member.character"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.cast-section {
  @apply p-4 sm:p-6 md:p-8 bg-[#141414];
}

.cast-wrapper {
  @apply max-w-7xl mx-auto;
}

.cast-title {
  @apply text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8;
}

.cast-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6;
}
</style>
