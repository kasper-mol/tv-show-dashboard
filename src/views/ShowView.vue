<script setup>
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useShowsStore } from '@/store/shows'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ShowHero from '@/components/ShowHero.vue'
import ShowDetails from '@/components/ShowDetails.vue'
import CastGrid from '@/components/CastGrid.vue'

const route = useRoute()
const router = useRouter()
const showStore = useShowsStore()
const { selectedShow, isLoading, errorMessage } = storeToRefs(showStore)

async function loadShowDetails() {
  if (!route.params.id) {
    router.push('/')
    return
  }
  await showStore.fetchShowDetails(Number(route.params.id))
}

onMounted(loadShowDetails)

watch(() => route.params.id, loadShowDetails)

function navigateBack() {
  showStore.clearSelectedShow()
  router.push('/')
}
</script>

<template>
  <main class="show-container">
    <LoadingSpinner v-if="isLoading" size="md" color="red" />

    <ErrorMessage v-if="errorMessage" :message="errorMessage" variant="error" />

    <div v-if="selectedShow && !isLoading">
      <ShowHero :background-image="selectedShow.image?.original" :on-back="navigateBack">
        <ShowDetails :show="selectedShow" />
      </ShowHero>

      <CastGrid :cast="selectedShow.cast" />
    </div>
  </main>
</template>

<style scoped>
@reference 'tailwindcss';

.show-container {
  @apply bg-[#141414] text-white p-2 md:p-4;
}
</style>
