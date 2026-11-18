<script setup>
import { computed } from 'vue'
import { buscarSecao, secoes } from '@/data/secoes'
import { laboratorios } from '@/data/labs'

const props = defineProps({
  nome: { type: String, required: true },
})

const secao = computed(() => buscarSecao(props.nome))
const labs = computed(() => laboratorios.filter((lab) => lab.secao === props.nome))
</script>

<template>
  <header class="abertura">
    <div class="wrap">
      <nav class="abertura__trilha" aria-label="Você está em">
        <ol>
          <li><RouterLink to="/">Elástico</RouterLink></li>
          <li><RouterLink to="/importancia">Guia</RouterLink></li>
          <li aria-current="page">{{ secao.numero }} · {{ secao.curto }}</li>
        </ol>
      </nav>

      <div class="abertura__grade grid">
        <p class="abertura__numero" aria-hidden="true">{{ secao.numero }}</p>
        <div class="abertura__texto">
          <p class="label abertura__sobre">Seção {{ secao.numero }} de 0{{ secoes.length }} · {{ secao.titulo }}</p>
          <h1 class="abertura__titulo" data-split="imediato">
            {{ secao.manchete[0] }}<br />
            <span class="abertura__titulo-2">{{ secao.manchete[1] }}</span>
          </h1>
          <p class="lead" data-reveal>{{ secao.resumo }}</p>
        </div>
      </div>

      <dl class="abertura__meta" data-reveal>
        <div>
          <dt class="label">Tópicos</dt>
          <dd>{{ secao.topicos.length }}</dd>
        </div>
        <div>
          <dt class="label">Laboratórios</dt>
          <dd>{{ labs.length ? labs.map((lab) => lab.numero).join(' + ') : '—' }}</dd>
        </div>
        <div>
          <dt class="label">Leitura</dt>
          <dd>~{{ secao.leitura }} min</dd>
        </div>
      </dl>
    </div>
  </header>
</template>

<style scoped>
.abertura {
  padding-top: var(--space-5);
}

.abertura__trilha ol {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.abertura__trilha li + li::before {
  content: '/';
  margin-right: var(--space-2);
  color: var(--color-rule);
}

.abertura__trilha a {
  color: var(--color-ink-2);
}

.abertura__grade {
  row-gap: var(--space-3);
  margin-top: var(--space-6);
  padding-bottom: var(--space-6);
}

.abertura__numero {
  grid-column: 1 / -1;
  font-family: var(--font-heading);
  font-size: clamp(4.5rem, 2.5rem + 9vw, 11rem);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.78;
  letter-spacing: -0.05em;
  color: var(--color-accent);
}

.abertura__texto {
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-5);
  align-content: end;
}

.abertura__sobre {
  color: var(--color-ink-3);
}

.abertura__titulo {
  font-size: var(--heading-xl);
  font-weight: 700;
  font-stretch: 75%;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  text-wrap: balance;
}

.abertura__titulo-2 {
  color: var(--color-ink-3);
}

.abertura__meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-block: var(--border-strong);
}

.abertura__meta div {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-3) var(--space-3) 0;
}

.abertura__meta div + div {
  padding-left: var(--space-3);
  border-left: var(--border-soft);
}

.abertura__meta dt {
  color: var(--color-ink-3);
}

.abertura__meta dd {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 600;
  font-stretch: 80%;
}

@media (min-width: 48rem) {
  .abertura__numero {
    grid-column: 1 / span 2;
    align-self: end;
  }

  .abertura__texto {
    grid-column: 3 / -1;
  }
}

@media (min-width: 80rem) {
  .abertura__numero {
    grid-column: 1 / span 3;
  }

  .abertura__texto {
    grid-column: 4 / -1;
  }
}
</style>
