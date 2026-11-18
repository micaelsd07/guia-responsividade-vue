<script setup>
import { useId, computed } from 'vue'

const modelo = defineModel({ type: Number, required: true })

const props = defineProps({
  rotulo: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  passo: { type: Number, default: 1 },
  unidade: { type: String, default: '' },
  comNumero: { type: Boolean, default: false },
  formatar: { type: Function, default: null },
})

const id = useId()
const exibido = computed(() => (props.formatar ? props.formatar(modelo.value) : `${modelo.value}${props.unidade}`))

function aoDigitar(evento) {
  const valor = parseFloat(evento.target.value)
  if (Number.isFinite(valor)) modelo.value = Math.min(Math.max(valor, props.min), props.max)
}
</script>

<template>
  <div class="field">
    <div class="field__top">
      <label :for="id">{{ rotulo }}</label>
      <output :for="id" class="field__value">{{ exibido }}</output>
    </div>
    <div class="faixa" :class="{ 'faixa--numero': comNumero }">
      <input :id="id" v-model.number="modelo" type="range" :min="min" :max="max" :step="passo" />
      <input
        v-if="comNumero"
        class="input faixa__numero"
        type="number"
        :min="min"
        :max="max"
        :step="passo"
        :value="modelo"
        :aria-label="`${rotulo} (valor exato)`"
        inputmode="decimal"
        @change="aoDigitar"
      />
    </div>
  </div>
</template>

<style scoped>
.faixa {
  display: grid;
  align-items: center;
  gap: var(--space-2);
}

.faixa--numero {
  grid-template-columns: minmax(0, 1fr) 5rem;
}

.faixa__numero {
  min-height: 2.5rem;
  padding: var(--space-1) var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}
</style>
