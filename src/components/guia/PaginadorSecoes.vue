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
  <nav class="paginador wrap" aria-label="Seção anterior e próxima">
    <RouterLink v-if="anterior" :to="anterior.caminho" class="paginador__link">
      <span class="label">← Anterior · {{ anterior.numero }}</span>
      <span class="paginador__titulo">{{ anterior.titulo }}</span>
    </RouterLink>
    <RouterLink v-else to="/" class="paginador__link">
      <span class="label">← Capa</span>
      <span class="paginador__titulo">Uma interface. Qualquer tela.</span>
    </RouterLink>
    <RouterLink v-if="proxima" :to="proxima.caminho" class="paginador__link paginador__link--proxima">
      <span class="label">Próxima · {{ proxima.numero }} →</span>
      <span class="paginador__titulo">{{ proxima.titulo }}</span>
    </RouterLink>
    <RouterLink v-else to="/laboratorios" class="paginador__link paginador__link--proxima">
      <span class="label">Revisar →</span>
      <span class="paginador__titulo">Todos os laboratórios</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.paginador {
  display: grid;
  margin-top: var(--space-section);
}

.paginador__link {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-5) 0;
  border-top: var(--border-strong);
  text-decoration: none;
}

.paginador__link .label {
  color: var(--color-ink-3);
}

.paginador__titulo {
  font-family: var(--font-heading);
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1.05;
  transition: color var(--duration-fast) var(--ease-out);
}

.paginador__link:hover .paginador__titulo {
  color: var(--color-accent);
}

@media (min-width: 48rem) {
  .paginador {
    grid-template-columns: 1fr 1fr;
    column-gap: var(--column-gap);
  }

  .paginador__link--proxima {
    text-align: right;
  }
}
</style>
