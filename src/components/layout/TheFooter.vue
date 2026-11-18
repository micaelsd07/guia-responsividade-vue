<template>
  <footer class="rodape">
    <div class="rodape__interno">
      <p class="rodape__marca">Elástico</p>
      <p>
        Guia interativo de responsividade e boas práticas, feito com Vue 3, Vite e Vue Router.
        Todo o layout é mobile-first, com fontes e espaçamentos em <code>rem</code>.
      </p>
      <p class="rodape__dica">
        Repare no indicador no canto da tela: ele mostra a largura atual da janela e o breakpoint
        ativo.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  margin-top: var(--espaco-8);
  padding: var(--espaco-7) 0 var(--espaco-8);
  background: var(--cor-roxo-950);
  color: var(--cor-roxo-200);
  font-size: var(--texto-sm);
}

.rodape__interno {
  display: grid;
  gap: var(--espaco-3);
  max-width: var(--largura-max);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.rodape__marca {
  font-family: var(--fonte-titulo);
  font-size: var(--titulo-md);
  font-weight: 700;
  color: #fff;
}

.rodape p {
  max-width: var(--largura-leitura);
}

.rodape code {
  background: var(--cor-roxo-800);
  color: var(--cor-roxo-100);
}

.rodape__dica {
  color: var(--cor-roxo-400);
}
</style>
