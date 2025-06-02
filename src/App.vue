<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useShowsStore } from '@/store/shows'

const showStore = useShowsStore()
onMounted(() => {
  showStore.fetchAllShows()
})
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/styles/main.css';

body {
  margin: 0;
  min-height: 100vh;
  color: #2c3e50;
  background: #f8fafc;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
</style>
