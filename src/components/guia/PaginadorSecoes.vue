<script setup>
import { computed } from 'vue'
import { secoes } from '@/data/secoes'

const props = defineProps({
  nome: { type: String, required: true },
})

const indice = computed(() => secoes.findIndex((secao) => secao.nome === props.nome))
const anterior = computed(() => secoes[indice.value - 1])
const proxima = computed(() => secoes[indice.value + 1])
</script>

<template>
  <nav class="paginador" aria-label="Navegação entre seções">
    <RouterLink v-if="anterior" :to="anterior.caminho" class="paginador__link">
      <span class="paginador__direcao">← Anterior</span>
      <span class="paginador__titulo">{{ anterior.numero }} {{ anterior.titulo }}</span>
    </RouterLink>
    <span v-else></span>
    <RouterLink
      v-if="proxima"
      :to="proxima.caminho"
      class="paginador__link paginador__link--proxima"
    >
      <span class="paginador__direcao">Próxima →</span>
      <span class="paginador__titulo">{{ proxima.numero }} {{ proxima.titulo }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.paginador {
  display: grid;
  gap: var(--espaco-3);
  margin-top: var(--espaco-8);
}

.paginador > span:empty {
  display: none;
}

.paginador__link {
  display: grid;
  gap: var(--espaco-1);
  padding: var(--espaco-4);
  border: var(--borda);
  border-radius: var(--raio-md);
  background: var(--cor-superficie);
  text-decoration: none;
  transition: border-color 0.15s ease;
}

.paginador__link:hover {
  border-color: var(--cor-roxo-400);
}

.paginador__direcao {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  color: var(--cor-roxo-600);
}

.paginador__titulo {
  font-family: var(--fonte-titulo);
  font-size: var(--titulo-sm);
  color: var(--cor-roxo-900);
}

@media (min-width: 48rem) {
  .paginador {
    grid-template-columns: 1fr 1fr;
  }

  .paginador > span:empty {
    display: block;
  }

  .paginador__link--proxima {
    text-align: right;
  }
}
</style>
