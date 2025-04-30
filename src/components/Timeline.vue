<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import type { Memory } from '../types.ts'
import MemoryCard from './MemoryCard.vue'

const props = defineProps<{
  memories: Memory[]
}>()

const [emblaRef, emblaApi] = emblaCarouselVue({
  axis: 'y',
  loop: false,
  dragFree: false,
  containScroll: 'trimSnaps',
})

const activeIndex = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const updateButtons = () => {
  if (!emblaApi.value) return
  canScrollPrev.value = emblaApi.value.canScrollPrev()
  canScrollNext.value = emblaApi.value.canScrollNext()
  activeIndex.value = emblaApi.value.selectedScrollSnap()
}

const scrollPrev = () => {
  emblaApi.value?.scrollPrev()
}
const scrollNext = () => {
  emblaApi.value?.scrollNext()
}
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index)

onMounted(() => {
  if (emblaApi.value) {
    console.log(emblaApi.value.slideNodes()) // Access API
  }
  if (!emblaApi.value) {
    console.error('Embla API not initialized')
    return
  }
  emblaApi.value.on('select', updateButtons)
  emblaApi.value.on('reInit', updateButtons)
})

onUnmounted(() => {
  if (!emblaApi.value) return
  emblaApi.value.off('select', updateButtons)
  emblaApi.value.off('reInit', updateButtons)
})
</script>

<template>
  <div class="relative h-[100svh] overflow-hidden">
    <!-- Navigation controls -->
    <div class="absolute left-1/2 top-4 z-20 transform -translate-x-1/2 flex gap-2">
      <button
        @click="scrollPrev"
        class="embla__prev h-9 w-9 cursor-pointer rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white/90 disabled:opacity-50"
      >
        <ChevronUp class="h-4 w-4" />
      </button>
      <div class="px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm">
        {{ activeIndex + 1 }} / {{ memories.length }}
      </div>
      <button
        @click="scrollNext"
        class="embla__next h-9 w-9 cursor-pointer rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center active:bg-amber-500 disabled:opacity-50"
      >
        <ChevronDown class="h-4 w-4" />
      </button>
    </div>

    <!-- Timeline dots -->
    <div class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 flex flex-col gap-4">
      <button
        v-for="(_, index) in memories"
        :key="index"
        @click="scrollTo(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="[
          activeIndex === index
            ? 'bg-black dark:bg-white scale-125'
            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500',
        ]"
        :aria-label="`Go to memory ${index + 1}`"
      />
    </div>

    <!-- Timeline carousel -->
    <div class="embla h-full">
      <div class="embla__viewport" ref="emblaRef">
        <div class="embla__container flex flex-col h-auto">
          <div
            v-for="(memory, index) in memories"
            :key="memory.id"
            class="embla__slide flex-shrink-0 min-h-[100svh] w-full flex items-center justify-center p-8"
          >
            <div class="w-full max-w-md">
              <MemoryCard :memory="memory" :is-active="activeIndex === index" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
  height: 100%; /* Ensure the embla container has height */
}

.embla__viewport {
  overflow: hidden;
  width: 100%;
  height: 100%; /* Match the height of the embla container */
  touch-action: pan-y; /* Allow vertical touch scrolling */
}

.embla__container {
  display: flex;
  flex-direction: column; /* For vertical scrolling */
  height: 100%; /* Ensure the container fills the viewport */
}

.embla__slide {
  flex: 0 0 100%; /* Each slide takes up the full height */
  min-height: 100%; /* Ensure slides match the viewport height */
}
</style>
