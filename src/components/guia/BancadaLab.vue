<script setup>
defineProps({
  id: { type: String, required: true },
  numero: { type: String, required: true },
  titulo: { type: String, required: true },
  resumo: { type: String, required: true },
})

const emit = defineEmits(['reset'])
</script>

<template>
  <section :id="id" class="lab" :aria-labelledby="`${id}-titulo`" data-reveal>
    <header class="lab__cabeca">
      <p class="lab__selo">
        <span class="label">Laboratório {{ numero }}</span>
        <span class="lab__vivo"><span aria-hidden="true"></span>Ao vivo</span>
      </p>
      <h3 :id="`${id}-titulo`" class="lab__titulo">{{ titulo }}</h3>
      <p class="lab__resumo">{{ resumo }}</p>
      <button type="button" class="btn btn--small btn--ghost lab__reset" @click="emit('reset')">
        <span aria-hidden="true">↺</span> Resetar
      </button>
    </header>

    <div class="lab__corpo">
      <div class="lab__controles" role="group" :aria-label="`Controles do laboratório ${numero}`">
        <slot name="controles" />
      </div>
      <div class="lab__palco">
        <slot name="palco" />
      </div>
    </div>

    <div class="lab__saida">
      <div class="lab__narracao" aria-live="polite">
        <p class="label">O que está acontecendo</p>
        <slot name="narracao" />
      </div>
      <div v-if="$slots.codigo" class="lab__codigo">
        <slot name="codigo" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.lab {
  container: lab / inline-size;
  min-width: 0;
  border: var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-hard);
}

.lab__cabeca {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  border-bottom: var(--border-strong);
  background:
    linear-gradient(var(--color-surface), var(--color-surface)) padding-box,
    repeating-linear-gradient(90deg, var(--color-rule) 0 var(--hairline), transparent var(--hairline) 0.75rem) border-box;
}

.lab__selo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.lab__selo .label {
  color: var(--color-accent);
}

.lab__vivo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-ok);
}

.lab__vivo span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: currentColor;
}

.lab__titulo {
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1;
}

.lab__resumo {
  max-width: var(--measure);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.lab__reset {
  justify-self: start;
}

.lab__corpo {
  display: grid;
}

.lab__controles {
  display: grid;
  align-content: start;
  gap: var(--space-5);
  padding: var(--space-4);
  border-bottom: var(--border-soft);
  min-width: 0;
}

.lab__palco {
  min-width: 0;
  padding: var(--space-4);
  background:
    radial-gradient(circle, var(--color-rule) 0.0625rem, transparent 0.0625rem) 0 0 / 1rem 1rem,
    var(--color-paper);
}

.lab__saida {
  display: grid;
  border-top: var(--border-strong);
}

.lab__narracao {
  display: grid;
  align-content: start;
  gap: var(--space-2);
  padding: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.lab__narracao .label {
  color: var(--color-accent);
}

.lab__narracao :deep(strong) {
  color: var(--color-ink);
}

.lab__codigo {
  min-width: 0;
  padding: 0 var(--space-4) var(--space-4);
}

@container lab (min-width: 30rem) {
  .lab__cabeca {
    grid-template-columns: minmax(0, 1fr) auto;
    padding: var(--space-5);
  }

  .lab__selo,
  .lab__resumo {
    grid-column: 1 / -1;
  }

  .lab__titulo {
    grid-column: 1;
  }

  .lab__reset {
    grid-column: 2;
    grid-row: 2;
    align-self: center;
  }
}

@container lab (min-width: 52rem) {
  .lab__corpo {
    grid-template-columns: 17rem minmax(0, 1fr);
  }

  .lab__controles {
    border-bottom: 0;
    border-right: var(--border-soft);
    padding: var(--space-5);
  }

  .lab__palco {
    padding: var(--space-5);
  }

  .lab__saida {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  }

  .lab__narracao {
    padding: var(--space-5);
    border-right: var(--border-soft);
  }

  .lab__codigo {
    padding: var(--space-5);
  }
}
</style>
