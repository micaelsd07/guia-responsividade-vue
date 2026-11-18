<script setup>
import { ref } from 'vue'
import ListaLaboratorios from '@/components/guia/ListaLaboratorios.vue'
import { laboratorios } from '@/data/labs'
import { usePageMotion } from '@/composables/useMotion'

const raiz = ref(null)
usePageMotion(raiz)
</script>

<template>
  <div ref="raiz" class="pagina-labs wrap">
    <nav class="trilha" aria-label="Você está em">
      <RouterLink to="/">Elástico</RouterLink> / <span aria-current="page">Laboratórios</span>
    </nav>
    <header class="pagina-labs__cabeca grid">
      <p class="pagina-labs__numero" aria-hidden="true">0{{ laboratorios.length }}</p>
      <div class="pagina-labs__texto">
        <h1 class="pagina-labs__titulo" data-split="imediato">Laboratórios.<br /><span>Aprender mexendo.</span></h1>
        <p class="lead" data-reveal>
          Sete ferramentas pequenas, cada uma ligada a uma seção do guia. Todas têm controles, um palco ao vivo, o código
          gerado na hora, uma narração do que está acontecendo e um botão para resetar.
        </p>
      </div>
    </header>
    <ListaLaboratorios />
  </div>
</template>

<style scoped>
.pagina-labs {
  display: grid;
  gap: var(--space-6);
  padding-top: var(--space-5);
}

.trilha {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.pagina-labs__cabeca {
  row-gap: var(--space-4);
}

.pagina-labs__numero {
  grid-column: 1 / -1;
  font-family: var(--font-heading);
  font-size: clamp(4.5rem, 2.5rem + 9vw, 11rem);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.78;
  color: var(--color-accent);
}

.pagina-labs__texto {
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-5);
}

.pagina-labs__titulo {
  font-size: var(--heading-xl);
  font-weight: 700;
  font-stretch: 75%;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.pagina-labs__titulo span {
  color: var(--color-ink-3);
}

@media (min-width: 48rem) {
  .pagina-labs__numero {
    grid-column: 1 / span 2;
    align-self: end;
  }

  .pagina-labs__texto {
    grid-column: 3 / -1;
  }
}
</style>
