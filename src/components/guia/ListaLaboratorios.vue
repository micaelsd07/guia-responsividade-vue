<script setup>
import { laboratorios } from '@/data/labs'
import { buscarSecao } from '@/data/secoes'

defineProps({
  compacta: { type: Boolean, default: false },
})
</script>

<template>
  <ol class="labs" :class="{ 'labs--compacta': compacta }">
    <li v-for="lab in laboratorios" :key="lab.id" class="labs__item" data-reveal>
      <RouterLink :to="{ path: buscarSecao(lab.secao).caminho, hash: `#${lab.id}` }" class="labs__link">
        <span class="labs__numero">{{ lab.numero }}</span>
        <span class="labs__corpo">
          <span class="labs__titulo">{{ lab.titulo }}</span>
          <span class="labs__resumo">{{ lab.resumo }}</span>
          <span v-if="!compacta" class="labs__controles">
            <span v-for="controle in lab.controles" :key="controle">{{ controle }}</span>
          </span>
        </span>
        <span class="labs__secao">
          <span class="label">Seção {{ buscarSecao(lab.secao).numero }}</span>
          <span>{{ buscarSecao(lab.secao).curto }}</span>
        </span>
        <span class="labs__seta" aria-hidden="true">→</span>
      </RouterLink>
    </li>
  </ol>
</template>

<style scoped>
.labs {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.labs__item {
  border-bottom: var(--border-strong);
}

.labs__link {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) auto;
  gap: var(--space-2) var(--space-3);
  align-items: start;
  padding: var(--space-4) 0;
  text-decoration: none;
  transition:
    background-color var(--duration-base) var(--ease-out),
    padding var(--duration-base) var(--ease-out);
}

.labs__link:hover {
  background: var(--color-ink);
  color: var(--color-paper);
  padding-inline: var(--space-3);
}

.labs__numero {
  font-family: var(--font-heading);
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 1;
  color: var(--color-accent);
}

.labs__link:hover .labs__numero {
  color: var(--color-signal);
}

.labs__corpo {
  display: grid;
  gap: var(--space-1);
  min-width: 0;
}

.labs__titulo {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  font-stretch: 80%;
  line-height: 1.1;
}

.labs__resumo {
  max-width: 40rem;
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.labs__link:hover .labs__resumo {
  color: var(--color-on-dark-2);
}

.labs__controles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-top: var(--space-2);
}

.labs__controles span {
  padding: 0 var(--space-2);
  border: var(--border-soft);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
}

.labs__secao {
  display: none;
}

.labs__seta {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
}

@media (min-width: 48rem) {
  .labs__link {
    grid-template-columns: 4.5rem minmax(0, 1fr) 10rem auto;
    padding: var(--space-5) 0;
  }

  .labs__secao {
    display: grid;
    font-size: var(--text-sm);
  }

  .labs__secao .label {
    color: var(--color-ink-3);
  }
}
</style>
