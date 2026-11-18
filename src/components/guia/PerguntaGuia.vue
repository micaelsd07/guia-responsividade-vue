<script setup>
defineProps({
  numero: { type: [String, Number], required: true },
  pergunta: { type: String, required: true },
})
</script>

<template>
  <section class="pergunta" :aria-labelledby="`pergunta-${numero}`">
    <p class="pergunta__selo">Pergunta-guia {{ numero }}</p>
    <h2 :id="`pergunta-${numero}`" class="pergunta__texto">{{ pergunta }}</h2>
    <div class="pergunta__resposta">
      <p class="pergunta__rotulo">Resposta</p>
      <div class="pergunta__conteudo">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pergunta {
  display: grid;
  gap: var(--espaco-4);
  padding: var(--espaco-5) var(--espaco-4);
  border-radius: var(--raio-lg);
  background: var(--cor-roxo-900);
  color: #efeaf9;
}

.pergunta__selo {
  justify-self: start;
  padding: var(--espaco-1) var(--espaco-3);
  border-radius: 2rem;
  background: var(--cor-ambar);
  color: var(--cor-roxo-950);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pergunta__texto {
  max-width: var(--largura-leitura);
  font-size: var(--titulo-sm);
  font-weight: 500;
  font-style: italic;
  line-height: 1.35;
  color: #fff;
}

.pergunta__resposta {
  display: grid;
  gap: var(--espaco-3);
  padding: var(--espaco-4);
  border-left: 0.25rem solid var(--cor-ambar);
  border-radius: 0 var(--raio-md) var(--raio-md) 0;
  background: rgb(255 255 255 / 0.06);
}

.pergunta__rotulo {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-ambar);
}

.pergunta__conteudo {
  display: grid;
  gap: var(--espaco-3);
  max-width: var(--largura-leitura);
}

.pergunta__conteudo :deep(code) {
  background: rgb(255 255 255 / 0.12);
  color: #fff;
}

.pergunta__conteudo :deep(strong) {
  color: #fff;
}

@media (min-width: 48rem) {
  .pergunta {
    padding: var(--espaco-7) var(--espaco-6);
  }

  .pergunta__texto {
    font-size: var(--titulo-md);
  }

  .pergunta__resposta {
    padding: var(--espaco-5);
  }
}
</style>
