<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { secoes } from '@/data/secoes'
import { ui } from '@/composables/useUi'

defineProps({
  progresso: { type: Number, default: 0 },
})

const route = useRoute()
const indice = computed(() => secoes.findIndex((secao) => secao.nome === route.meta.secao))
const atual = computed(() => secoes[indice.value])
const anterior = computed(() => (indice.value > 0 ? secoes[indice.value - 1] : null))
const proxima = computed(() => (indice.value >= 0 && indice.value < secoes.length - 1 ? secoes[indice.value + 1] : null))
</script>

<template>
  <nav class="dock" aria-label="Navegação rápida">
    <RouterLink v-if="anterior" :to="anterior.caminho" class="dock__lado" :aria-label="`Seção anterior: ${anterior.titulo}`">
      <span aria-hidden="true">←</span>
    </RouterLink>
    <span v-else class="dock__lado dock__lado--vazio" aria-hidden="true">←</span>

    <button type="button" class="dock__centro" aria-haspopup="dialog" @click="ui.menuAberto = true">
      <span class="dock__info">
        <span class="dock__numero">{{ atual ? `${atual.numero}/0${secoes.length}` : 'Guia' }}</span>
        <span class="dock__titulo">{{ atual ? atual.curto : 'Laboratórios' }}</span>
      </span>
      <span class="dock__menu">Índice</span>
      <span class="dock__barra" aria-hidden="true"><span :style="{ transform: `scaleX(${progresso})` }"></span></span>
    </button>

    <RouterLink v-if="proxima" :to="proxima.caminho" class="dock__lado" :aria-label="`Próxima seção: ${proxima.titulo}`">
      <span aria-hidden="true">→</span>
    </RouterLink>
    <span v-else class="dock__lado dock__lado--vazio" aria-hidden="true">→</span>
  </nav>
</template>

<style scoped>
.dock {
  position: fixed;
  inset: auto 0 0;
  z-index: var(--z-nav);
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr) 3.5rem;
  height: calc(var(--dock-height) + env(safe-area-inset-bottom, 0rem));
  padding-bottom: env(safe-area-inset-bottom, 0rem);
  border-top: var(--border-strong);
  background: var(--color-paper);
}

.dock__lado {
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  text-decoration: none;
  color: var(--color-ink);
}

.dock__lado:first-child {
  border-right: var(--border-soft);
}

.dock__lado:last-child {
  border-left: var(--border-soft);
}

.dock__lado--vazio {
  color: var(--color-rule);
}

.dock__centro {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-width: 0;
  padding: 0 var(--space-4);
  border: 0;
  background: transparent;
  text-align: left;
}

.dock__info {
  display: grid;
  min-width: 0;
  line-height: 1.2;
}

.dock__numero {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-accent);
}

.dock__titulo {
  overflow: hidden;
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 600;
  font-stretch: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dock__menu {
  flex-shrink: 0;
  padding: var(--space-1) var(--space-2);
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.dock__barra {
  position: absolute;
  inset: 0 0 auto;
  height: 0.125rem;
}

.dock__barra span {
  display: block;
  height: 100%;
  background: var(--color-accent);
  transform-origin: 0 50%;
}

@media (min-width: 64rem) {
  .dock {
    display: none;
  }
}
</style>
