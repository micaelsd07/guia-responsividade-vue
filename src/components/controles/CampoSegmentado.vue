<script setup>
import { useId } from 'vue'

const modelo = defineModel({ type: [String, Number, Boolean], required: true })

defineProps({
  legenda: { type: String, required: true },
  opcoes: { type: Array, required: true },
  mono: { type: Boolean, default: true },
})

const nome = useId()
</script>

<template>
  <fieldset class="segmentos">
    <legend class="segmentos__legenda">{{ legenda }}</legend>
    <div class="segmentos__opcoes">
      <label
        v-for="opcao in opcoes"
        :key="String(opcao.valor)"
        class="segmentos__opcao"
        :class="{ 'is-ativa': modelo === opcao.valor, 'segmentos__opcao--texto': !mono }"
        :title="opcao.dica"
      >
        <input v-model="modelo" class="sr-only" type="radio" :name="nome" :value="opcao.valor" />
        <span>{{ opcao.rotulo ?? opcao.valor }}</span>
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.segmentos {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.segmentos__legenda {
  padding: 0;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 500;
}

.segmentos__opcoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.segmentos__opcao {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: var(--space-1) var(--space-3);
  border: var(--border-strong);
  border-radius: var(--radius-xs);
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.segmentos__opcao--texto {
  font-family: var(--font-body);
}

.segmentos__opcao:hover {
  background: var(--color-accent-soft);
}

.segmentos__opcao.is-ativa {
  background: var(--color-ink);
  color: var(--color-signal);
}

.segmentos__opcao:has(input:focus-visible) {
  outline: 0.1875rem solid var(--color-accent);
  outline-offset: 0.125rem;
}
</style>
