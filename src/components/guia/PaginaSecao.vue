<script setup>
import { computed } from 'vue'
import { secoes } from '@/data/secoes'
import PaginadorSecoes from './PaginadorSecoes.vue'

const props = defineProps({
  nome: { type: String, required: true },
  resumo: { type: String, required: true },
})

const secao = computed(() => secoes.find((item) => item.nome === props.nome))
</script>

<template>
  <article class="pagina">
    <header class="pagina__capa">
      <p class="pagina__numero" aria-hidden="true">{{ secao.numero }}</p>
      <div class="pagina__titulos">
        <p class="pagina__sobre">Seção {{ secao.numero }} de {{ String(secoes.length).padStart(2, '0') }}</p>
        <h1 class="pagina__titulo">{{ secao.titulo }}</h1>
        <p class="pagina__resumo">{{ resumo }}</p>
      </div>
    </header>

    <div class="pagina__corpo">
      <slot />
    </div>

    <PaginadorSecoes :nome="nome" />
  </article>
</template>

<style scoped>
.pagina {
  max-width: var(--largura-max);
  margin: 0 auto;
  padding: var(--espaco-6) var(--gutter) 0;
}

.pagina__capa {
  display: grid;
  gap: var(--espaco-2);
  padding-bottom: var(--espaco-6);
  border-bottom: var(--espessura) solid var(--cor-roxo-900);
}

.pagina__numero {
  font-family: var(--fonte-titulo);
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 0.0625rem var(--cor-roxo-400);
  letter-spacing: -0.04em;
}

.pagina__titulos {
  display: grid;
  gap: var(--espaco-3);
}

.pagina__sobre {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-roxo-600);
}

.pagina__titulo {
  font-size: var(--titulo-xl);
  letter-spacing: -0.02em;
}

.pagina__resumo {
  max-width: var(--largura-leitura);
  font-size: var(--texto-lg);
  color: var(--cor-tinta-suave);
}

.pagina__corpo {
  display: grid;
  gap: var(--espaco-7);
  padding-top: var(--espaco-6);
}

@media (min-width: 48rem) {
  .pagina {
    padding-top: var(--espaco-7);
  }

  .pagina__capa {
    grid-template-columns: auto 1fr;
    align-items: end;
    column-gap: var(--espaco-6);
  }

  .pagina__numero {
    font-size: 8rem;
  }

  .pagina__corpo {
    gap: var(--espaco-8);
    padding-top: var(--espaco-7);
  }
}
</style>
