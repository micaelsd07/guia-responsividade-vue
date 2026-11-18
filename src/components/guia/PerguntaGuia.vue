<script setup>
defineProps({
  id: { type: String, required: true },
  numero: { type: String, required: true },
  pergunta: { type: String, required: true },
})
</script>

<template>
  <section :id="id" class="pergunta" :aria-labelledby="`${id}-titulo`">
    <div class="wrap grid pergunta__grade">
      <div class="pergunta__marca" aria-hidden="true">?</div>
      <header class="pergunta__cabeca">
        <p class="label pergunta__selo">Pergunta-guia {{ numero }}</p>
        <h2 :id="`${id}-titulo`" class="pergunta__texto" data-split>{{ pergunta }}</h2>
      </header>
      <div class="pergunta__resposta" data-reveal>
        <p class="label pergunta__rotulo">Resposta</p>
        <div class="pergunta__conteudo">
          <slot />
        </div>
      </div>
      <div v-if="$slots.visual" class="pergunta__visual" data-reveal>
        <slot name="visual" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pergunta {
  margin-top: var(--space-section);
  padding-block: var(--space-section);
  background: var(--color-dark);
  color: var(--color-on-dark);
  overflow: hidden;
}

.pergunta__grade {
  position: relative;
  row-gap: var(--space-6);
}

.pergunta__marca {
  position: absolute;
  right: var(--gutter);
  top: calc(-1 * var(--space-7));
  font-family: var(--font-heading);
  font-size: clamp(10rem, 6rem + 20vw, 26rem);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 1;
  color: var(--color-dark-2);
  pointer-events: none;
  user-select: none;
}

.pergunta__cabeca {
  position: relative;
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-4);
}

.pergunta__selo {
  justify-self: start;
  padding: var(--space-1) var(--space-2);
  background: var(--color-signal);
  color: var(--color-ink);
}

.pergunta__texto {
  max-width: 52rem;
  font-size: var(--heading-md);
  font-weight: 600;
  font-stretch: 85%;
  line-height: 1.12;
}

.pergunta__resposta {
  position: relative;
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: var(--hairline) solid var(--color-signal);
}

.pergunta__rotulo {
  color: var(--color-signal);
}

.pergunta__conteudo {
  display: grid;
  gap: var(--space-4);
  max-width: var(--measure);
  font-size: var(--text-md);
  color: var(--color-on-dark-2);
}

.pergunta__conteudo :deep(strong) {
  color: var(--color-on-dark);
}

.pergunta__conteudo :deep(code) {
  background: var(--color-dark-3);
  color: var(--color-on-dark);
}

.pergunta__visual {
  position: relative;
  grid-column: 1 / -1;
  min-width: 0;
}

@media (min-width: 80rem) {
  .pergunta__cabeca {
    grid-column: 1 / span 10;
  }

  .pergunta__resposta {
    grid-column: 1 / span 6;
  }

  .pergunta__visual {
    grid-column: 8 / -1;
    align-self: start;
    padding-top: var(--space-4);
  }
}
</style>
