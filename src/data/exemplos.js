export const exemploViewportHtml = `
<!-- index.html -->
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <!-- Diz ao navegador: "use a largura real da tela e não aplique zoom inicial" -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha loja</title>
  </head>
  <body>...</body>
</html>
`

export const exemploMobileFirstCss = `
/* 1. Base = celular. Este CSS vale para TODAS as telas */
.cards {
  display: grid;
  gap: 1rem;                       /* espaço entre os cards */
  padding: 1rem;
}

/* 2. A partir de 48rem (768px): tablet, duas colunas */
@media (min-width: 48rem) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}

/* 3. A partir de 64rem (1024px): desktop, três colunas */
@media (min-width: 64rem) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
`

export const exemploUnidadesCss = `
:root {
  --espaco: 1rem;               /* 16px no padrão; cresce com a preferência do usuário */
}

h1 {
  font-size: 2.5rem;            /* rem: relativo ao <html>, respeita a acessibilidade */
}

.botao {
  font-size: 1rem;
  padding: 0.5em 1em;           /* em: o espaço interno acompanha a fonte do botão */
}

.artigo {
  max-width: 65ch;              /* ch: linhas de ~65 caracteres, leitura confortável */
}

.coluna {
  width: 50%;                   /* %: metade da largura do elemento pai */
}

.layout {
  display: grid;
  grid-template-columns: 2fr 1fr; /* fr: o conteúdo ocupa o dobro da lateral */
}

.capa {
  min-height: 100dvh;           /* dvh: altura visível real, mesmo com a barra do navegador */
}

.titulo-gigante {
  font-size: clamp(2rem, 6vw, 4rem); /* vw: cresce com a tela, com mínimo e máximo */
}

.divisor {
  border-top: 1px solid #ddd;   /* px: detalhe fino que não precisa crescer */
}
`

export const exemploFlexGridCss = `
/* FLEXBOX: uma dimensão (uma linha OU uma coluna) */
.menu {
  display: flex;
  flex-wrap: wrap;                 /* se não couber, quebra para a linha de baixo */
  justify-content: space-between;  /* distribui no eixo principal (horizontal) */
  align-items: center;             /* alinha no eixo cruzado (vertical) */
  gap: 1rem;                       /* espaço entre os itens, sem usar margin */
}

/* GRID: duas dimensões (linhas E colunas ao mesmo tempo) */
.cards {
  display: grid;
  /* Cria quantas colunas couberem, cada uma com no mínimo 14rem.
     O espaço que sobra é dividido igualmente entre elas (1fr). */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

/* Layout de página: Grid para a estrutura, Flexbox para os detalhes */
.pagina {
  display: grid;
  grid-template-columns: 1fr;      /* celular: tudo empilhado */
}

@media (min-width: 64rem) {
  .pagina {
    grid-template-columns: 16rem 1fr; /* desktop: barra lateral + conteúdo */
  }
}
`

export const exemploImagensHtml = `
<!-- width e height: o navegador já sabe a proporção (3:2) e reserva o espaço -->
<img
  src="sala-800.jpg"
  srcset="sala-400.jpg 400w, sala-800.jpg 800w, sala-1600.jpg 1600w"
  sizes="(min-width: 48rem) 50vw, 100vw"
  width="800"
  height="533"
  alt="Sala de estar com sofá roxo e janela ampla"
  loading="lazy"
>

<!-- A imagem principal do topo (provável LCP) NÃO leva loading="lazy" -->
<img src="capa.jpg" width="1200" height="600" alt="Fachada do prédio" fetchpriority="high">
`

export const exemploImagensCss = `
img {
  max-width: 100%;      /* nunca maior que o contêiner: sem rolagem horizontal */
  height: auto;         /* mantém a proporção quando a largura encolhe */
}

.card__foto {
  width: 100%;
  aspect-ratio: 4 / 3;  /* caixa sempre 4:3, mesmo antes de a imagem chegar */
  object-fit: cover;    /* preenche a caixa cortando as sobras, sem distorcer */
}
`

export const exemploEstruturaPastas = `
src/
├─ assets/styles/main.css     ← design tokens (:root) e estilos globais
├─ components/
│  ├─ layout/                 ← TheHeader, TheFooter, IndicadorViewport
│  ├─ guia/                   ← peças reutilizáveis das páginas
│  └─ labs/                   ← os laboratórios interativos
├─ data/                      ← dados estáticos (seções, exemplos)
├─ router/index.js            ← rotas com carregamento sob demanda
├─ views/                     ← uma view por rota (NomeView.vue)
├─ App.vue
└─ main.js
`

export const exemploComponenteVue = `
<!-- CartaoAnimal.vue: nome em PascalCase e com mais de uma palavra -->
<script setup>
// Props tipadas: o componente declara o que precisa receber
const props = defineProps({
  animal: { type: Object, required: true },
  destaque: { type: Boolean, default: false },
})

// Eventos: o filho avisa o pai, em vez de alterar a prop
const emit = defineEmits(['remover'])
</script>

<template>
  <article :class="{ destaque }">
    <h3>{{ props.animal.nome }}</h3>
    <button @click="emit('remover', props.animal.id)">Remover</button>
  </article>
</template>
`

export const exemploListaComKey = `
<!-- ListaAnimais.vue (componente pai) -->
<template>
  <!-- :key com um id único e estável: o Vue sabe qual item é qual -->
  <CartaoAnimal
    v-for="animal in animais"
    :key="animal.id"
    :animal="animal"
    @remover="removerAnimal"
  />
</template>
`

export const exemploRotasLazy = `
// router/index.js
const routes = [
  {
    path: '/boas-praticas',
    // Carregamento sob demanda: o arquivo da página só é baixado
    // quando a pessoa visita a rota (vira um "chunk" separado no build)
    component: () => import('@/views/BoasPraticasView.vue'),
  },
]
`

export const exemploTokensCss = `
/* Design tokens: decisões de design guardadas em um só lugar */
:root {
  --cor-primaria: #42239a;
  --cor-destaque: #f0b545;
  --espaco-4: 1rem;
  --raio-md: 0.75rem;
}

.botao {
  background: var(--cor-primaria);  /* trocou o token, trocou o site inteiro */
  padding: var(--espaco-4);
  border-radius: var(--raio-md);
}
`
