<template>
  <div>
    <div
      class="flex flex-col h-full transition-all duration-700 transform"
      :class="[isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95']"
    >
      <div class="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
        <img
          :src="memory.imageUrl"
          :alt="memory.title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span
          class="absolute top-4 left-4 px-2 py-1 rounded-full bg-white/80 text-black text-sm flex items-center gap-1"
        >
          <Calendar class="w-3 h-3" />
          {{ memory.date }}
        </span>
        <span
          v-if="memory.location"
          class="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/80 text-black text-sm flex items-center gap-1"
        >
          <MapPin class="w-3 h-3" />
          {{ memory.location }}
        </span>
      </div>

      <div class="p-5 bg-white dark:bg-gray-800 flex-1 flex flex-col rounded-b-xl shadow-md">
        <h3 class="text-xl font-semibold mb-2">{{ memory.title }}</h3>
        <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
          {{ memory.description }}
        </p>
        <span @click="isDialogOpen = true" class="text-blue-500 dark:text-blue-400 cursor-pointer">
          Leer más
        </span>

        <div class="flex justify-between items-end mt-auto">
          <div class="flex items-center gap-2">
            <Music class="w-4 h-4" />
            <div class="text-sm">
              <p class="font-medium">{{ memory.song.title }}</p>
              <p class="text-gray-500 dark:text-gray-400">{{ memory.song.artist }}</p>
            </div>
          </div>

          <button class="text-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-10 w-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isDialogOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative" @click.stop>
          <button
            @click="isDialogOpen = false"
            class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X class="w-4 h-4" />
          </button>

          <h2 class="text-2xl font-semibold mb-1">{{ memory.title }}</h2>
          <div class="text-gray-500 dark:text-gray-400 flex items-center gap-1 text-sm mb-4">
            <Calendar class="w-3 h-3" /> {{ memory.date }}
            <template v-if="memory.location">
              <span class="mx-1">•</span>
              <MapPin class="w-3 h-3" /> {{ memory.location }}
            </template>
          </div>

          <div class="relative w-full aspect-video overflow-hidden rounded-md mb-4">
            <img
              :src="memory.imageUrl"
              :alt="memory.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <p class="text-gray-600 dark:text-gray-300 mb-6">{{ memory.description }}</p>

          <div class="flex gap-6 items-center justify-between">
            <div>
              <h4 class="font-medium text-sm mb-1">Our Song:</h4>
              <div class="flex items-center gap-2">
                <Music class="w-4 h-4" />
                <div>
                  <p class="font-medium">{{ memory.song.title }}</p>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">{{ memory.song.artist }}</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center gap-2">
              <p class="text-xs text-center text-gray-500 dark:text-gray-400">Scan to listen</p>
              <QRCode
                :value="memory.song.url"
                :size="120"
                class="rounded-lg overflow-hidden shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, MapPin, Music, X } from 'lucide-vue-next'
import QRCode from './QRCode.vue'
import type { Memory } from '../types.ts'

defineProps<{
  memory: Memory
  isActive: boolean
}>()

const isDialogOpen = ref(false)
</script>
