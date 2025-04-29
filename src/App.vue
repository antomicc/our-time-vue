<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Timeline Vertical -->
    <div class="timeline-container">
      <swiper
        :direction="'vertical'"
        :slidesPerView="1"
        :spaceBetween="50"
        :mousewheel="true"
        :modules="[Mousewheel]"
        @slideChange="updateActiveIndex"
        class="h-screen"
      >
        <swiper-slide v-for="(moment, index) in moments" :key="index" class="timeline-slide">
          <!-- Línea vertical -->
          <div class="timeline-line" :class="{ active: activeIndex === index }"></div>

          <!-- Punto del timeline -->
          <div class="timeline-dot" :class="{ active: activeIndex === index }"></div>

          <!-- Contenido -->
          <div class="timeline-content">
            <div class="timeline-date">{{ formatDate(moment.date) }}</div>
            <div class="timeline-card">
              <img :src="moment.photo" class="timeline-image" />
              <div class="timeline-text">
                <h3>{{ moment.description }}</h3>
                <button @click="playSong(moment.songUrl)" class="play-button">
                  ▶ Escuchar canción
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, EffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'

// Datos de momentos (cargados desde JSON)
const activeIndex = ref(0)
const moments = ref([])
const playlistUrl = 'https://music.youtube.com/playlist?list=TU_PLAYLIST_ID'
const currentSong = ref(null)
const activeSlide = ref(0)

// Cargar datos del JSON
onMounted(async () => {
  const response = await fetch('/momentos.json')
  moments.value = await response.json()
})

const updateActiveIndex = (swiper) => {
  activeIndex.value = swiper.activeIndex
}

// Convertir URL de Spotify a embed
const embedUrl = computed(() => {
  if (!currentSong.value) return ''
  const videoId = currentSong.value.split('v=')[1]
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`
})

const playSong = (url) => {
  currentSong.value = url
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style>
@import 'tailwindcss';

/* Estilo base del timeline */
.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline-slide {
  position: relative;
  padding-left: 50px;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.timeline-line {
  position: absolute;
  left: 19px;
  top: 0;
  height: 100%;
  width: 2px;
  background: #e0e0e0;
  z-index: 1;
}

.timeline-line.active {
  background: #ec4899;
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 3px solid #e0e0e0;
  z-index: 2;
  transition: all 0.3s ease;
}

.timeline-dot.active {
  border-color: #ec4899;
  transform: translateY(-50%) scale(1.2);
}

.timeline-content {
  width: 100%;
}

.timeline-date {
  color: #888;
  font-size: 14px;
  margin-bottom: 10px;
}

.timeline-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.timeline-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.timeline-text {
  padding: 20px;
}

.play-button {
  background: #ec4899;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: #db2777;
}
</style>
