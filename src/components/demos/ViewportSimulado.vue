<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  largura: { type: Number, required: true },
  altura: { type: Number, required: true },
  alturaMaxima: { type: Number, default: 0 },
  disponivelExterno: { type: Number, default: 0 },
})

const caixa = ref(null)
const disponivel = ref(0)
let observador

const escala = computed(() => {
  const base = props.disponivelExterno || disponivel.value
  if (!base) return 0.2
  const porLargura = base / props.largura
  const porAltura = props.alturaMaxima ? props.alturaMaxima / props.altura : Infinity
  return Math.min(1, porLargura, porAltura)
})

onMounted(() => {
  observador = new ResizeObserver(([entrada]) => {
    disponivel.value = entrada.contentRect.width
  })
  observador.observe(caixa.value)
})

onBeforeUnmount(() => observador?.disconnect())

defineExpose({ escala })
</script>

<template>
  <div ref="caixa" class="simulado">
    <div class="simulado__area" :style="{ width: `${largura * escala}px`, height: `${altura * escala}px` }">
      <div
        class="simulado__tela"
        :style="{ width: `${largura}px`, height: `${altura}px`, transform: `scale(${escala})` }"
      >
        <slot :escala="escala" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.simulado {
  width: 100%;
  min-width: 0;
}

.simulado__area {
  position: relative;
  max-width: 100%;
  margin-inline: auto;
  overflow: hidden;
}

.simulado__tela {
  position: absolute;
  top: 0;
  left: 0;
  container: tela / inline-size;
  transform-origin: 0 0;
  overflow: hidden;
  background: #fff;
}
</style>
