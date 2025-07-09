<template>
  <main class="min-h-screen bg-white relative">
    <transition name="fade" mode="out-in">
      <div
        v-if="showIntro"
        key="intro"
        class="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white"
      >
        <h1
          class="text-3xl md:text-5xl font-extrabold text-center mb-10 animate-gradient-move bg-gradient-to-r from-red-500 via-blue-500 to-yellow-400 bg-clip-text text-transparent"
        >
          ¿Quieres escuchar cómo han sido estos años para nosotros?
        </h1>
        <button
          @click="showIntro = false"
          class="px-8 py-3 rounded-full bg-black text-white text-lg font-semibold shadow-lg hover:bg-gray-800 transition"
        >
          Sí, quiero
        </button>
      </div>
      <Timeline v-else :memories="memories" key="timeline" />
    </transition>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Timeline from './components/Timeline.vue'
import { memories } from './data'

const showIntro = ref(true)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animación de movimiento de gradiente */
@keyframes gradient-move {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.animate-gradient-move {
  background-size: 200% 200%;
  animation: gradient-move 3s ease-in-out infinite;
}
</style>
