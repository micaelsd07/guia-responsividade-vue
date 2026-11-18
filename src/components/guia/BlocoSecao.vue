<script setup>
defineProps({
  rotulo: { type: String, required: true },
  titulo: { type: String, default: '' },
  id: { type: String, default: undefined },
})
</script>

<template>
  <section :id="id" class="bloco" :aria-labelledby="id ? `${id}-titulo` : undefined">
    <p class="bloco__rotulo">{{ rotulo }}</p>
    <h2 v-if="titulo" :id="id ? `${id}-titulo` : undefined" class="bloco__titulo">
      {{ titulo }}
    </h2>
    <div class="bloco__conteudo">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.bloco {
  display: grid;
  gap: var(--espaco-4);
  min-width: 0;
}

.bloco__rotulo {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-roxo-600);
}

.bloco__rotulo::after {
  content: '';
  flex: 1;
  height: var(--espessura);
  background: var(--cor-linha);
}

.bloco__titulo {
  font-size: var(--titulo-lg);
  letter-spacing: -0.015em;
  max-width: var(--largura-leitura);
}

.bloco__conteudo {
  display: grid;
  gap: var(--espaco-5);
  min-width: 0;
}
</style>
