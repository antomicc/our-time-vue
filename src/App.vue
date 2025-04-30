<template>
  <main
    class="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <Timeline :memories="memories" />
  </main>
</template>

<script setup lang="ts">
import Timeline from './components/Timeline.vue'
import { memories } from './data'
</script>
