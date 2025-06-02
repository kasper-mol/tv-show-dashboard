<script setup>
defineProps({
  person: {
    type: Object,
    required: true,
    validator: (person) => {
      return person.name && person.image
    },
  },
  character: {
    type: Object,
    required: true,
    validator: (character) => {
      return character.name
    },
  },
})
</script>

<template>
  <div class="cast-member">
    <img
      v-if="person.image?.medium"
      :src="person.image.medium"
      :alt="person.name"
      class="cast-image"
    />
    <h3 class="cast-name">{{ person.name }}</h3>
    <p class="cast-character">as {{ character.name }}</p>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.cast-member {
  @apply text-center;
}

.cast-image {
  @apply w-full aspect-square object-cover rounded-lg mb-3;
}

.cast-name {
  @apply font-semibold text-white text-sm;
}

.cast-character {
  @apply text-sm text-gray-400;
}
</style>
