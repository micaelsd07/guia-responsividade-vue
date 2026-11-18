<script setup>
import ViewportSimulado from './ViewportSimulado.vue'
import MiniSite from './MiniSite.vue'

const larguraTela = 390
const alturaTela = 844
const larguraSemMeta = 980
</script>

<template>
  <figure class="comparacao">
    <div class="comparacao__aparelhos">
      <div class="comparacao__item">
        <p class="comparacao__rotulo comparacao__rotulo--ruim">
          <span class="label">Sem meta viewport</span>
          <span>viewport de layout: {{ larguraSemMeta }}px</span>
        </p>
        <div class="celular">
          <ViewportSimulado :largura="larguraSemMeta" :altura="Math.round((larguraSemMeta * alturaTela) / larguraTela)">
            <MiniSite />
          </ViewportSimulado>
        </div>
      </div>
      <div class="comparacao__item">
        <p class="comparacao__rotulo comparacao__rotulo--bom">
          <span class="label">Com meta viewport</span>
          <span>viewport de layout: {{ larguraTela }}px</span>
        </p>
        <div class="celular">
          <ViewportSimulado :largura="larguraTela" :altura="alturaTela">
            <MiniSite />
          </ViewportSimulado>
        </div>
      </div>
    </div>
    <figcaption class="comparacao__conta">
      <span class="label">A conta do zoom</span>
      <span>{{ larguraTela }} ÷ {{ larguraSemMeta }} = <strong>0,40</strong></span>
      <span>Um texto de 16px aparece com cerca de <strong>6,4px</strong> na tela. Ilegível.</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.comparacao {
  display: grid;
  gap: var(--space-5);
  min-width: 0;
}

.comparacao__aparelhos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-5);
}

.comparacao__item {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
}

.comparacao__rotulo {
  display: grid;
  justify-items: center;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}

.comparacao__rotulo--ruim .label {
  color: var(--color-bad);
}

.comparacao__rotulo--bom .label {
  color: var(--color-ok);
}

.celular {
  width: 11rem;
  padding: 0.5rem 0.375rem;
  border-radius: 1.5rem;
  background: var(--color-ink);
  box-shadow: var(--shadow-soft);
}

.celular :deep(.simulado__area) {
  border-radius: 1.125rem;
}

.comparacao__conta {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  border-left: 0.1875rem solid var(--color-bad);
  background: var(--color-bad-soft);
  font-size: var(--text-sm);
}

.comparacao__conta .label {
  color: var(--color-bad);
}

@media (min-width: 36rem) {
  .celular {
    width: 13rem;
  }
}
</style>
