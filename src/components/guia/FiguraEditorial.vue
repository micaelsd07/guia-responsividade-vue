<script setup>
import { computed } from 'vue'
import { srcsetDe, srcDe } from '@/data/fotos'

const props = defineProps({
  foto: { type: Object, required: true },
  numero: { type: String, required: true },
  legenda: { type: String, required: true },
  proporcao: { type: String, default: '' },
  sizes: { type: String, default: '(min-width: 80rem) 50vw, 100vw' },
  prioridade: { type: Boolean, default: false },
  parallax: { type: Boolean, default: false },
  posicao: { type: String, default: 'center' },
})

const estiloImagem = computed(() =>
  props.proporcao ? { aspectRatio: props.proporcao, objectFit: 'cover', objectPosition: props.posicao } : {},
)
</script>

<template>
  <figure class="figura">
    <div class="figura__moldura" data-reveal="clip" :data-parallax="parallax ? '' : undefined">
      <img
        :src="srcDe(foto)"
        :srcset="srcsetDe(foto)"
        :sizes="sizes"
        :width="foto.largura"
        :height="foto.altura"
        :alt="foto.alt"
        :loading="prioridade ? 'eager' : 'lazy'"
        :fetchpriority="prioridade ? 'high' : undefined"
        decoding="async"
        :style="estiloImagem"
      />
    </div>
    <figcaption class="figura__legenda">
      <span class="label figura__numero">Fig. {{ numero }}</span>
      <span class="figura__texto">{{ legenda }}</span>
      <a class="figura__credito" :href="foto.url" target="_blank" rel="noopener noreferrer">
        Foto: {{ foto.autor === 'Pexels' ? 'acervo Pexels' : `${foto.autor} / Pexels` }}
      </a>
    </figcaption>
  </figure>
</template>

<style scoped>
.figura {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.figura__moldura {
  overflow: hidden;
  background: var(--color-paper-2);
}

.figura__moldura img {
  width: 100%;
}

.figura__legenda {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-3);
  padding-top: var(--space-2);
  border-top: var(--border-soft);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.figura__numero {
  color: var(--color-accent);
}

.figura__credito {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}
</style>
