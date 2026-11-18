<script setup>
defineProps({
  fontes: { type: Array, required: true },
  numero: { type: String, required: true },
})

function dominio(url) {
  return new URL(url).hostname.replace('www.', '')
}
</script>

<template>
  <section class="fontes" :aria-labelledby="`fontes-${numero}`">
    <div class="wrap grid fontes__grade">
      <header class="fontes__cabeca">
        <p class="label">Seção {{ numero }}</p>
        <h2 :id="`fontes-${numero}`" class="fontes__titulo">Fontes consultadas</h2>
        <p class="fontes__nota">{{ fontes.length }} referências, priorizando documentação oficial e especificações.</p>
      </header>
      <ol class="fontes__lista">
        <li v-for="(fonte, i) in fontes" :key="fonte.url" class="fontes__item" data-reveal>
          <span class="fontes__n">{{ String(i + 1).padStart(2, '0') }}</span>
          <a :href="fonte.url" target="_blank" rel="noopener noreferrer" class="fontes__link">
            {{ fonte.titulo }}<span class="sr-only"> (abre em nova aba)</span>
            <span class="fontes__seta" aria-hidden="true">↗</span>
          </a>
          <span class="fontes__autor">{{ fonte.autor }} · {{ dominio(fonte.url) }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.fontes {
  padding-top: var(--space-section);
}

.fontes__grade {
  row-gap: var(--space-5);
}

.fontes__cabeca {
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-2);
  align-content: start;
}

.fontes__cabeca .label {
  color: var(--color-accent);
}

.fontes__titulo {
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 78%;
}

.fontes__nota {
  font-size: var(--text-sm);
  color: var(--color-ink-3);
}

.fontes__lista {
  grid-column: 1 / -1;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.fontes__item {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  gap: var(--space-1) var(--space-2);
  padding: var(--space-3) 0;
  border-bottom: var(--border-soft);
}

.fontes__n {
  grid-row: span 2;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  padding-top: 0.125rem;
}

.fontes__link {
  font-weight: 500;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.fontes__link:hover {
  text-decoration: underline;
}

.fontes__seta {
  margin-left: var(--space-1);
  color: var(--color-accent);
}

.fontes__autor {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}

@media (min-width: 80rem) {
  .fontes__cabeca {
    grid-column: 1 / span 4;
  }

  .fontes__lista {
    grid-column: 5 / -1;
  }
}
</style>
