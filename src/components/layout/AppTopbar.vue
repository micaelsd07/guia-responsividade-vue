<script setup>
import { useViewport } from '@/composables/useViewport'
import { ui, alternarGrade } from '@/composables/useUi'

defineProps({
  comSidebar: { type: Boolean, default: false },
})

const { rotulo } = useViewport()
</script>

<template>
  <header class="topbar" :class="{ 'topbar--guia': comSidebar }">
    <div class="topbar__barra">
      <RouterLink to="/" class="marca" aria-label="Elástico, página inicial">
        <span class="marca__simbolo" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="marca__nome">Elástico</span>
      </RouterLink>

      <nav v-if="!comSidebar" class="topbar__links" aria-label="Atalhos">
        <RouterLink to="/importancia">Guia</RouterLink>
        <RouterLink to="/laboratorios">Laboratórios</RouterLink>
        <RouterLink to="/desafio">Desafio</RouterLink>
      </nav>

      <div class="topbar__ferramentas">
        <span class="chip" title="Largura da janela e breakpoint ativo">{{ rotulo }}</span>
        <button
          type="button"
          class="ferramenta"
          :aria-pressed="ui.gradeVisivel"
          title="Mostrar a grade de colunas (atalho: G)"
          @click="alternarGrade"
        >
          <span class="ferramenta__icone ferramenta__icone--grade" aria-hidden="true"><span></span><span></span><span></span></span>
          <span class="sr-only">Mostrar grade de colunas</span>
        </button>
        <button v-if="!comSidebar" type="button" class="btn btn--small" @click="ui.menuAberto = true">Índice</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: relative;
  z-index: var(--z-nav);
  border-bottom: var(--border-strong);
  background: var(--color-paper);
}

.topbar__barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: var(--topbar-height);
  max-width: var(--content-max);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.marca {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  text-decoration: none;
  color: var(--color-ink);
}

.marca__simbolo {
  display: grid;
  gap: 0.125rem;
  width: 1.375rem;
  flex-shrink: 0;
}

.marca__simbolo span {
  height: 0.3125rem;
  background: var(--color-ink);
}

.marca__simbolo span:nth-child(1) {
  background: var(--color-accent);
}

.marca__simbolo span:nth-child(2) {
  width: 66%;
}

.marca__simbolo span:nth-child(3) {
  width: 33%;
}

.marca__nome {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  font-stretch: 80%;
  letter-spacing: -0.02em;
}

.topbar__links {
  display: none;
}

.topbar__ferramentas {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.chip {
  display: none;
  padding: var(--space-1) var(--space-2);
  border: var(--border-soft);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  white-space: nowrap;
  color: var(--color-ink-2);
}

.ferramenta {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: var(--border-strong);
  border-radius: var(--radius-sm);
  background: transparent;
}

.ferramenta[aria-pressed='true'] {
  background: var(--color-ink);
  color: var(--color-signal);
}

.ferramenta__icone--grade {
  display: grid;
  grid-template-columns: repeat(3, 0.25rem);
  gap: 0.1875rem;
  height: 1rem;
}

.ferramenta__icone--grade span {
  background: currentColor;
}

@media (min-width: 30rem) {
  .chip {
    display: inline-block;
  }
}

@media (min-width: 48rem) {
  .topbar__links {
    display: flex;
    gap: var(--space-5);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
  }

  .topbar__links a {
    text-decoration: none;
  }

  .topbar__links a:hover {
    text-decoration: underline;
  }
}

@media (min-width: 64rem) {
  .topbar--guia {
    display: none;
  }
}
</style>
