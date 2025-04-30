<template>
  <canvas ref="canvasRef" :width="size" :height="size"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import QRCodeStyling from 'qr-code-styling'

const props = defineProps<{
  value: string
  size?: number
}>()

const canvasRef = ref<HTMLCanvasElement>()

const qrCode = new QRCodeStyling({
  width: props.size || 128,
  height: props.size || 128,
  data: props.value,
  dotsOptions: {
    color: '#000000',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    type: 'dot',
  },
})

onMounted(() => {
  if (canvasRef.value) {
    qrCode.append(canvasRef.value)
  }
})

watch(
  () => props.value,
  (newValue) => {
    qrCode.update({
      data: newValue,
    })
  },
)
</script>
