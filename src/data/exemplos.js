export const viewportHtml = `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <!-- width=device-width: use a largura real da tela como viewport -->
    <!-- initial-scale=1.0: abra a página sem zoom -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feira Roxa</title>
  </head>
  <body>...</body>
</html>
`

export const mobileFirstCss = `
/* 1. Base = celular. Vale para TODAS as larguras */
.cards {
  display: grid;
  gap: 1rem;
}

/* 2. A partir de 48rem (768px): duas colunas */
@media (min-width: 48rem) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 3. A partir de 64rem (1024px): três colunas */
@media (min-width: 64rem) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
`

export const unidadesCss = `
:root {
  font-size: 100%;              /* respeita a fonte escolhida no navegador */
}

h1 {
  font-size: 2.5rem;            /* rem: relativo ao <html> */
}

.botao {
  font-size: 1.125rem;
  padding: 0.5em 1em;           /* em: acompanha a fonte do próprio botão */
}

.artigo {
  max-width: 65ch;              /* ch: linhas de ~65 caracteres */
}

.coluna {
  width: 50%;                   /* %: metade da largura do pai */
}

.layout {
  display: grid;
  grid-template-columns: 2fr 1fr; /* fr: frações do espaço livre */
}

.capa {
  min-height: 100dvh;           /* dvh: altura visível, com ou sem a barra do navegador */
}

.titulo-gigante {
  font-size: clamp(2rem, 1rem + 4vw, 4rem); /* vw dentro de clamp(): cresce com limite */
}

.divisor {
  border-top: 1px solid #ddd;   /* px: detalhe fino que não precisa crescer */
}
`

export const flexCss = `
.menu {
  display: flex;
  flex-direction: row;             /* eixo principal: horizontal */
  flex-wrap: wrap;                 /* se não couber, quebra a linha */
  justify-content: space-between;  /* distribui no eixo principal */
  align-items: center;             /* alinha no eixo cruzado */
  gap: 1rem;                       /* espaço entre itens, sem margin */
}
`

export const gridCss = `
.cards {
  display: grid;
  /* Quantas colunas couberem, cada uma com no mínimo 14rem.
     O espaço que sobra é dividido igualmente (1fr). */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.pagina {
  display: grid;
  grid-template-columns: 1fr;            /* celular: tudo empilhado */
}

@media (min-width: 64rem) {
  .pagina {
    grid-template-columns: 16rem 1fr;    /* desktop: lateral + conteúdo */
  }
}
`

export const imagensHtml = `
<!-- width e height: o navegador já sabe a proporção (3:2) e reserva o espaço -->
<img
  src="sala-960.webp"
  srcset="sala-480.webp 480w, sala-960.webp 960w, sala-1600.webp 1600w"
  sizes="(min-width: 64rem) 50vw, 100vw"
  width="1600"
  height="1067"
  alt="Sala de estar com sofá e janela ampla"
  loading="lazy"
  decoding="async"
>

<!-- A foto principal do topo (provável LCP) NÃO leva lazy -->
<img src="capa.webp" width="1600" height="900" alt="Fachada do prédio" fetchpriority="high">
`

export const imagensCss = `
img {
  max-width: 100%;      /* nunca maior que o contêiner */
  height: auto;         /* mantém a proporção ao encolher */
}

.card__foto {
  width: 100%;
  aspect-ratio: 4 / 3;  /* caixa 4:3 antes mesmo de a imagem chegar */
  object-fit: cover;    /* preenche cortando as sobras, sem distorcer */
}
`

export const componenteRuim = `
<!-- components/card.vue -->
<template>
  <div class="card">
    <h3>{{ titulo }}</h3>
  </div>
</template>

<!-- Uso: <card /> pode colidir com elementos HTML futuros
     e não diz o que o componente representa -->
`

export const componenteBom = `
<!-- components/CartaoAnimal.vue -->
<template>
  <article class="cartao-animal">
    <h3>{{ animal.nome }}</h3>
  </article>
</template>

<!-- PascalCase, duas palavras, nome que diz o que é.
     Únicos ganham "The" (TheHeader); páginas, "View" -->
`

export const propsRuim = `
<script setup>
const props = defineProps(['animal'])

function renomear() {
  props.animal.nome = 'Novo nome' // altera o dado do pai por baixo dos panos
}
</script>
`

export const propsBom = `
<script setup>
// Props tipadas: o Vue avisa no console se vier o tipo errado
const props = defineProps({
  animal: { type: Object, required: true },
  destaque: { type: Boolean, default: false },
})

// O filho avisa; quem é dono do dado decide
const emit = defineEmits(['renomear'])

function renomear(nome) {
  emit('renomear', { id: props.animal.id, nome })
}
</script>
`

export const keyRuim = `
<template>
  <!-- Sem :key, ou com o índice: a identidade muda quando a lista muda -->
  <li v-for="(animal, i) in animais" :key="i">
    {{ animal.nome }} <input type="text">
  </li>
</template>
`

export const keyBom = `
<template>
  <!-- id único e estável: cada <li> pertence sempre ao mesmo animal -->
  <li v-for="animal in animais" :key="animal.id">
    {{ animal.nome }} <input type="text">
  </li>
</template>
`

export const tokensRuim = `
.botao {
  background: #42239a;
  padding: 16px;
  border-radius: 12px;
}

.link {
  color: #4323a0; /* "quase" a mesma cor, escrita de novo */
}
`

export const tokensBom = `
:root {
  --color-accent: #5b2be0;   /* decisão de design, em um só lugar */
  --space-4: 1rem;
  --radius-sm: 0.25rem;
}

.botao {
  background: var(--color-accent);
  padding: var(--space-4);
  border-radius: var(--radius-sm);
}

.link {
  color: var(--color-accent); /* mesma cor, garantida */
}
`

export const rotasRuim = `
import HomeView from '@/views/HomeView.vue'
import BoasPraticasView from '@/views/BoasPraticasView.vue'

// Tudo vai no primeiro arquivo JavaScript, mesmo o que ninguém abriu ainda
const routes = [
  { path: '/', component: HomeView },
  { path: '/boas-praticas', component: BoasPraticasView },
]
`

export const rotasBom = `
// Cada página vira um arquivo separado no build
// e só é baixada quando alguém visita a rota
const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  {
    path: '/boas-praticas',
    component: () => import('@/views/BoasPraticasView.vue'),
  },
]
`
