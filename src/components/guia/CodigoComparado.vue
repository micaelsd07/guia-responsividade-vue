<script setup>
import CodigoEditor from './CodigoEditor.vue'

defineProps({
  ruim: { type: Object, required: true },
  bom: { type: Object, required: true },
  explicacao: { type: String, default: '' },
})
</script>

<template>
  <div class="comparado" data-reveal>
    <div class="comparado__par">
      <CodigoEditor v-bind="ruim" variante="ruim" />
      <CodigoEditor v-bind="bom" variante="bom" />
    </div>
    <p v-if="explicacao" class="comparado__nota">
      <span class="label">Por quê</span>
      {{ explicacao }}
    </p>
  </div>
</template>

<style scoped>
.comparado {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.comparado__par {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(22rem, 100%), 1fr));
  gap: var(--space-3);
}

.comparado__nota {
  display: grid;
  gap: var(--space-1);
  max-width: var(--measure);
  padding-left: var(--space-3);
  border-left: 0.1875rem solid var(--color-accent);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.comparado__nota .label {
  color: var(--color-accent);
}
</style>
