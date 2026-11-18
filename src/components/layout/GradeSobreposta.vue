<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { ui, alternarGrade } from '@/composables/useUi'
import { useViewport } from '@/composables/useViewport'

const { ativo } = useViewport()
const colunasPorBreakpoint = { base: 4, sm: 4, md: 8, lg: 8, xl: 12 }

function atalho(evento) {
  const alvo = evento.target
  if (evento.key !== 'g' && evento.key !== 'G') return
  if (evento.metaKey || evento.ctrlKey || evento.altKey) return
  if (alvo.closest?.('input, textarea, select, [contenteditable="true"]')) return
  alternarGrade()
}

onMounted(() => window.addEventListener('keydown', atalho))
onBeforeUnmount(() => window.removeEventListener('keydown', atalho))
</script>

<template>
  <div v-if="ui.gradeVisivel" class="grade" aria-hidden="true">
    <div class="wrap grid grade__colunas">
      <span v-for="n in 12" :key="n" class="grade__coluna"></span>
    </div>
    <p class="grade__legenda">
      {{ colunasPorBreakpoint[ativo.nome] }} colunas · breakpoint {{ ativo.nome }} · gutter em clamp()
    </p>
  </div>
</template>

<style scoped>
.grade {
  position: absolute;
  inset: 0;
  z-index: var(--z-overlay);
  pointer-events: none;
}

.grade__colunas {
  height: 100%;
}

.grade__coluna {
  background: rgb(91 43 224 / 0.07);
  border-inline: var(--hairline) solid rgb(91 43 224 / 0.25);
}

.grade__coluna:nth-child(n + 5) {
  display: none;
}

.grade__legenda {
  position: fixed;
  left: 50%;
  top: var(--space-3);
  translate: -50% 0;
  max-width: calc(100% - 2 * var(--space-3));
  padding: var(--space-1) var(--space-3);
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 48rem) {
  .grade__coluna:nth-child(n + 5) {
    display: block;
  }

  .grade__coluna:nth-child(n + 9) {
    display: none;
  }
}

@media (min-width: 80rem) {
  .grade__coluna:nth-child(n + 9) {
    display: block;
  }
}
</style>
