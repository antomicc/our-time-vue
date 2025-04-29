<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100">
    <!-- Swiper Container -->
    <swiper
      :direction="'vertical'"
      :slidesPerView="1"
      :spaceBetween="30"
      :mousewheel="true"
      :effect="'creative'"
      :creativeEffect="creativeEffect"
      :modules="[Mousewheel, EffectCreative]"
      class="h-screen w-full"
    >
      <swiper-slide v-for="(moment, index) in moments" :key="index">
        <div class="slide-content h-full">
          <!-- Punto del timeline -->
          <div class="timeline-dot"></div>

          <!-- Contenido del slide -->
          <div class="moment-card">
            <img :src="moment.photo" class="moment-image" />
            <div class="moment-details">
              <p class="date">{{ formatDate(moment.date) }}</p>
              <p class="description">{{ moment.description }}</p>
              <button @click="playSong(moment.songUrl)" class="play-button">
                Escuchar canción
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- QR Section (fija en el bottom) -->
    <div class="qr-container">
      <VueQrcode :value="playlistUrl" :size="120" />
      <p>Escanéame para nuestra playlist</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, EffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'
import { vAutoAnimate } from '@formkit/auto-animate'
import VueQrcode from 'vue-qrcode'

// Datos de momentos (cargados desde JSON)
const moments = ref([])
const playlistUrl = 'https://music.youtube.com/playlist?list=TU_PLAYLIST_ID'
const currentSong = ref(null)
const activeSlide = ref(0)
const timelineSwiper = ref(null)

// Cargar datos del JSON
onMounted(async () => {
  const response = await fetch('/momentos.json')
  moments.value = await response.json()
})

// Convertir URL de Spotify a embed
const embedUrl = computed(() => {
  if (!currentSong.value) return ''
  const videoId = currentSong.value.split('v=')[1]
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`
})

const creativeEffect = ref({
  prev: {
    shadow: false,
    translate: [0, 0, -400],
    opacity: 0,
  },
  next: {
    translate: [0, '100%', 0],
    opacity: 0.5,
  },
  limitProgress: 3, // Controla cuántos slides se ven "en espera"
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

// Actualizar línea del timeline
const updateTimelineLine = (swiper) => {
  activeSlide.value = swiper.activeIndex
  const progress = (swiper.activeIndex / (swiper.slides.length - 1)) * 100
  document.querySelector('.timeline-line').style.height = `${progress}%`
}
</script>

<style>
@import 'tailwindcss';

/* Estilos del contenedor principal */
.swiper {
  width: 100%;
  height: 100%;
}

/* Efecto fade + zoom */
.swiper-slide {
  opacity: 0.5;
  transition: all 0.8s ease;
  transform: scale(0.9);
}

.swiper-slide-active {
  opacity: 1;
  transform: scale(1);
}

/* Estilos de la tarjeta */
.moment-card {
  @apply bg-white rounded-xl shadow-xl mx-auto w-11/12 max-w-md overflow-hidden;
}

.moment-image {
  @apply w-full h-48 object-cover;
}

.timeline-dot {
  @apply absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full z-10;
}

/* QR fijo */
.qr-container {
  @apply fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center;
}
</style>
