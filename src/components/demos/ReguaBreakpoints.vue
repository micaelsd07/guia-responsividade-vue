<script setup>
import { computed } from 'vue'
import { useViewport } from '@/composables/useViewport'

const { largura } = useViewport()
const maximo = 1600

const marcos = [
  { rem: 0, nome: 'base', regra: 'sem media query', descricao: 'celular: uma coluna, menu em botão' },
  { rem: 36, nome: 'sm', regra: '@media (min-width: 36rem)', descricao: 'celular deitado: cards em duas colunas' },
  { rem: 48, nome: 'md', regra: '@media (min-width: 48rem)', descricao: 'tablet: grade de 8 colunas' },
  { rem: 64, nome: 'lg', regra: '@media (min-width: 64rem)', descricao: 'notebook: aparece a barra lateral' },
  { rem: 80, nome: 'xl', regra: '@media (min-width: 80rem)', descricao: 'desktop: grade de 12 colunas' },
]

const posicao = computed(() => Math.min((largura.value / maximo) * 100, 100))
const ativos = computed(() => marcos.filter((marco) => largura.value >= marco.rem * 16))
</script>

<template>
  <figure class="regua">
    <div class="regua__trilho" aria-hidden="true">
      <span
        v-for="marco in marcos"
        :key="marco.nome"
        class="regua__faixa"
        :class="{ 'is-ativa': largura >= marco.rem * 16 }"
        :style="{ left: `${(marco.rem * 16 * 100) / maximo}%` }"
      >
        <span class="regua__nome">{{ marco.nome }}</span>
        <span class="regua__px">{{ marco.rem * 16 }}</span>
      </span>
      <span class="regua__voce" :class="{ 'regua__voce--direita': posicao < 55 }" :style="{ left: `${posicao}%` }">
        <span>você: {{ largura }}px</span>
      </span>
    </div>
    <ol class="regua__regras">
      <li v-for="marco in marcos" :key="marco.nome" :class="{ 'is-ativa': ativos.includes(marco) }">
        <span class="regua__check" aria-hidden="true">{{ ativos.includes(marco) ? '●' : '○' }}</span>
        <code>{{ marco.regra }}</code>
        <span class="regua__desc">{{ marco.descricao }}</span>
        <span class="sr-only">{{ ativos.includes(marco) ? 'ativa agora' : 'inativa agora' }}</span>
      </li>
    </ol>
    <figcaption class="regua__legenda">
      Esta régua usa a largura real da sua janela. Redimensione o navegador ou gire o celular: as regras
      <code>min-width</code> vão se acumulando da base para cima, nunca o contrário.
    </figcaption>
  </figure>
</template>

<style scoped>
.regua {
  display: grid;
  gap: var(--space-5);
  min-width: 0;
}

.regua__trilho {
  position: relative;
  height: 5.5rem;
  margin-inline: 0.5rem;
  border-bottom: var(--border-strong);
  background: repeating-linear-gradient(90deg, var(--color-rule) 0 var(--hairline), transparent var(--hairline) 6.25%) bottom / 100% 0.75rem no-repeat;
}

.regua__faixa {
  position: absolute;
  bottom: 0;
  display: grid;
  gap: 0.125rem;
  padding: 0 0 0.875rem 0.375rem;
  border-left: 0.125rem solid var(--color-rule);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}

.regua__faixa.is-ativa {
  border-left-color: var(--color-accent);
  color: var(--color-ink);
}

.regua__nome {
  font-weight: 500;
}

.regua__voce {
  position: absolute;
  top: 0;
  bottom: -0.5rem;
  width: 0.125rem;
  background: var(--color-bad);
  transition: left var(--duration-base) var(--ease-out);
}

.regua__voce span {
  position: absolute;
  top: 0;
  right: 0.375rem;
  padding: 0 var(--space-1);
  background: var(--color-bad);
  color: #fff;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  white-space: nowrap;
}

.regua__voce--direita span {
  right: auto;
  left: 0.375rem;
}

.regua__regras {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-soft);
}

.regua__regras li {
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  gap: 0 var(--space-2);
  padding: var(--space-2) 0;
  border-bottom: var(--border-soft);
  color: var(--color-ink-3);
}

.regua__regras li.is-ativa {
  color: var(--color-ink);
}

.regua__check {
  grid-row: span 2;
  color: var(--color-accent);
}

.regua__regras code {
  justify-self: start;
}

.regua__desc {
  font-size: var(--text-sm);
}

.regua__legenda {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

@media (min-width: 48rem) {
  .regua__regras li {
    grid-template-columns: 1.25rem 15rem minmax(0, 1fr);
    align-items: baseline;
  }

  .regua__check {
    grid-row: auto;
  }
}
</style>
