<script setup>
defineProps({
  numero: { type: [String, Number], required: true },
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
})
</script>

<template>
  <section class="lab" :aria-labelledby="`lab-${numero}-titulo`">
    <header class="lab__topo">
      <p class="lab__selo">
        <span class="lab__ponto" aria-hidden="true"></span>
        Laboratório {{ String(numero).padStart(2, '0') }}
      </p>
      <h2 :id="`lab-${numero}-titulo`" class="lab__titulo">{{ titulo }}</h2>
      <p class="lab__descricao">{{ descricao }}</p>
    </header>
    <div class="lab__palco">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.lab {
  min-width: 0;
  border: var(--espessura) solid var(--cor-linha-forte);
  border-radius: var(--raio-lg);
  background: var(--cor-superficie);
  box-shadow: var(--sombra);
  overflow: hidden;
}

.lab__topo {
  display: grid;
  gap: var(--espaco-2);
  padding: var(--espaco-5) var(--espaco-4);
  background:
    linear-gradient(var(--cor-roxo-50), var(--cor-roxo-50)) padding-box,
    repeating-linear-gradient(90deg, var(--cor-linha) 0 0.0625rem, transparent 0.0625rem 1.5rem);
  border-bottom: var(--borda);
}

.lab__selo {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-2);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-roxo-700);
}

.lab__ponto {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--cor-sucesso);
  box-shadow: 0 0 0 0.25rem var(--cor-sucesso-suave);
}

.lab__titulo {
  font-size: var(--titulo-md);
}

.lab__descricao {
  max-width: var(--largura-leitura);
  color: var(--cor-tinta-suave);
}

.lab__palco {
  display: grid;
  gap: var(--espaco-5);
  padding: var(--espaco-5) var(--espaco-4);
  min-width: 0;
}

@media (min-width: 48rem) {
  .lab__topo,
  .lab__palco {
    padding: var(--espaco-6);
  }

  .lab__titulo {
    font-size: var(--titulo-lg);
  }
}
</style>
