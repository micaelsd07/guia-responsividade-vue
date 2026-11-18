<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const breakpoints = [
  { nome: 'xl', descricao: 'tela larga', consulta: '(min-width: 80rem)' },
  { nome: 'lg', descricao: 'desktop', consulta: '(min-width: 64rem)' },
  { nome: 'md', descricao: 'tablet', consulta: '(min-width: 48rem)' },
  { nome: 'sm', descricao: 'celular deitado', consulta: '(min-width: 36rem)' },
]

const largura = ref(0)
const ativo = ref({ nome: 'base', descricao: 'celular', consulta: 'sem media query' })
const recolhido = ref(true)

function atualizar() {
  largura.value = window.innerWidth
  ativo.value = breakpoints.find((bp) => window.matchMedia(bp.consulta).matches) ?? {
    nome: 'base',
    descricao: 'celular',
    consulta: 'sem media query',
  }
}

const rotulo = computed(() => `${largura.value}px · ${ativo.value.nome}`)

onMounted(() => {
  atualizar()
  window.addEventListener('resize', atualizar)
})

onBeforeUnmount(() => window.removeEventListener('resize', atualizar))
</script>

<template>
  <aside class="indicador" :class="{ 'indicador--recolhido': recolhido }" aria-live="polite">
    <button
      type="button"
      class="indicador__botao"
      :aria-expanded="!recolhido"
      :title="recolhido ? 'Mostrar detalhes' : 'Recolher'"
      @click="recolhido = !recolhido"
    >
      <span class="indicador__ponto" aria-hidden="true"></span>
      <span class="indicador__valor">{{ rotulo }}</span>
    </button>
    <p v-if="!recolhido" class="indicador__detalhe">
      {{ ativo.descricao }} <span>{{ ativo.consulta }}</span>
    </p>
  </aside>
</template>

<style scoped>
.indicador {
  position: fixed;
  right: var(--espaco-3);
  bottom: var(--espaco-3);
  z-index: 40;
  max-width: calc(100vw - 2 * var(--espaco-3));
  padding: var(--espaco-1);
  border-radius: var(--raio-md);
  background: var(--cor-roxo-950);
  color: #fff;
  box-shadow: var(--sombra);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
}

.indicador__botao {
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
  width: 100%;
  min-height: 2rem;
  padding: var(--espaco-1) var(--espaco-2);
  border: 0;
  border-radius: var(--raio-sm);
  background: transparent;
  color: inherit;
  font-weight: 500;
}

.indicador__ponto {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--cor-ambar);
  flex-shrink: 0;
}

.indicador__detalhe {
  padding: 0 var(--espaco-2) var(--espaco-1);
  color: var(--cor-roxo-200);
}

.indicador__detalhe span {
  display: block;
  color: var(--cor-roxo-400);
}
</style>
