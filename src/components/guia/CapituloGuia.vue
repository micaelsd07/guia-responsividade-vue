<script setup>
defineProps({
  id: { type: String, required: true },
  indice: { type: String, required: true },
  titulo: { type: String, required: true },
  largo: { type: Boolean, default: false },
  escuro: { type: Boolean, default: false },
})
</script>

<template>
  <section :id="id" class="capitulo" :class="{ 'capitulo--largo': largo, 'capitulo--escuro': escuro }" :aria-labelledby="`${id}-titulo`">
    <div class="wrap grid capitulo__grade">
      <header class="capitulo__cabeca">
        <p class="label capitulo__indice">{{ indice }}</p>
        <h2 :id="`${id}-titulo`" class="capitulo__titulo" data-split>{{ titulo }}</h2>
        <div v-if="$slots.aside" class="capitulo__aside">
          <slot name="aside" />
        </div>
      </header>
      <div class="capitulo__corpo">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.capitulo {
  padding-block: var(--space-section) 0;
}

.capitulo--escuro {
  margin-top: var(--space-section);
  padding-block: var(--space-section);
  background: var(--color-dark);
  color: var(--color-on-dark);
}

.capitulo__grade {
  row-gap: var(--space-6);
}

.capitulo__cabeca {
  grid-column: 1 / -1;
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: var(--border-strong);
}

.capitulo--escuro .capitulo__cabeca {
  border-top-color: var(--color-on-dark);
}

.capitulo__indice {
  color: var(--color-accent);
}

.capitulo--escuro .capitulo__indice {
  color: var(--color-signal);
}

.capitulo__titulo {
  font-size: var(--heading-lg);
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}

.capitulo__aside {
  display: grid;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-ink-3);
}

.capitulo__corpo {
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-6);
  min-width: 0;
}

@media (min-width: 80rem) {
  .capitulo:not(.capitulo--largo) .capitulo__cabeca {
    grid-column: 1 / span 4;
    position: sticky;
    top: var(--space-6);
    align-self: start;
  }

  .capitulo:not(.capitulo--largo) .capitulo__corpo {
    grid-column: 5 / -1;
    padding-top: var(--space-3);
    border-top: var(--border-soft);
  }

  .capitulo:not(.capitulo--largo) .capitulo__titulo {
    font-size: var(--heading-md);
  }

  .capitulo--largo .capitulo__cabeca {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--column-gap);
  }

  .capitulo--largo .capitulo__indice {
    grid-column: 1 / span 3;
  }

  .capitulo--largo .capitulo__titulo {
    grid-column: 4 / span 9;
  }

  .capitulo--largo .capitulo__aside {
    grid-column: 4 / span 7;
  }
}
</style>
