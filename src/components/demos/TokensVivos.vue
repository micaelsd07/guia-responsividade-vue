<script setup>
import { ref, onMounted } from 'vue'

const nomes = {
  cores: ['--color-ink', '--color-paper', '--color-accent', '--color-signal', '--color-dark', '--color-bad', '--color-ok'],
  espacos: ['--space-2', '--space-4', '--space-6', '--space-8'],
}

const cores = ref([])
const espacos = ref([])

onMounted(() => {
  const estilo = getComputedStyle(document.documentElement)
  cores.value = nomes.cores.map((nome) => ({ nome, valor: estilo.getPropertyValue(nome).trim() }))
  espacos.value = nomes.espacos.map((nome) => ({ nome, valor: estilo.getPropertyValue(nome).trim() }))
})
</script>

<template>
  <figure class="tokens">
    <figcaption class="label tokens__titulo">Tokens deste guia, lidos agora do :root</figcaption>
    <ul class="tokens__cores">
      <li v-for="cor in cores" :key="cor.nome" class="cor" data-reveal>
        <span class="cor__amostra" :style="{ background: `var(${cor.nome})` }"></span>
        <code>{{ cor.nome }}</code>
        <span class="cor__valor">{{ cor.valor }}</span>
      </li>
    </ul>
    <ul class="tokens__espacos">
      <li v-for="espaco in espacos" :key="espaco.nome" class="espaco" data-reveal>
        <span class="espaco__barra" :style="{ width: `var(${espaco.nome})` }"></span>
        <code>{{ espaco.nome }}</code>
        <span class="cor__valor">{{ espaco.valor }}</span>
      </li>
    </ul>
  </figure>
</template>

<style scoped>
.tokens {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}

.tokens__titulo {
  color: var(--color-ink-3);
}

.tokens__cores {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(9.5rem, 100%), 1fr));
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.cor {
  display: grid;
  gap: 0.125rem;
  font-size: var(--text-xs);
}

.cor__amostra {
  height: 3.5rem;
  border: var(--border-strong);
}

.cor code {
  justify-self: start;
  font-size: var(--text-2xs);
}

.cor__valor {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}

.tokens__espacos {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.espaco {
  display: grid;
  grid-template-columns: 4rem 6rem minmax(0, 1fr);
  align-items: center;
  gap: var(--space-3);
}

.espaco__barra {
  height: 0.75rem;
  background: var(--color-accent);
}

.espaco code {
  justify-self: start;
  font-size: var(--text-2xs);
}
</style>
