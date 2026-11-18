<script setup>
defineProps({
  fontes: { type: Array, required: true },
})
</script>

<template>
  <section class="fontes" aria-labelledby="fontes-titulo">
    <h2 id="fontes-titulo" class="fontes__titulo">Fontes consultadas</h2>
    <ol class="fontes__lista">
      <li v-for="fonte in fontes" :key="fonte.url" class="fontes__item">
        <a :href="fonte.url" target="_blank" rel="noopener noreferrer">{{ fonte.titulo }}</a>
        <span class="fontes__autor">{{ fonte.autor }}</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.fontes {
  display: grid;
  gap: var(--espaco-4);
  padding-top: var(--espaco-5);
  border-top: var(--borda);
}

.fontes__titulo {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-roxo-700);
}

.fontes__lista {
  display: grid;
  gap: var(--espaco-3);
  margin: 0;
  padding-left: var(--espaco-5);
  font-size: var(--texto-sm);
}

.fontes__item {
  padding-left: var(--espaco-1);
}

.fontes__item::marker {
  font-family: var(--fonte-codigo);
  color: var(--cor-roxo-400);
}

.fontes__item a {
  overflow-wrap: anywhere;
}

.fontes__autor {
  display: block;
  color: var(--cor-tinta-suave);
}

@media (min-width: 48rem) {
  .fontes__lista {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--espaco-7);
  }
}
</style>
