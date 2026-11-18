<script setup>
import PaginaSecao from '@/components/guia/PaginaSecao.vue'
import BlocoSecao from '@/components/guia/BlocoSecao.vue'
import CodigoExemplo from '@/components/guia/CodigoExemplo.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import { exemploImagensHtml, exemploImagensCss } from '@/data/exemplos'

const ferramentas = [
  {
    nome: 'max-width: 100%; height: auto',
    texto: 'A imagem nunca fica maior que o contêiner e mantém a proporção ao encolher. É o que impede a foto de causar rolagem horizontal no celular.',
  },
  {
    nome: 'width e height no HTML',
    texto: 'Informam a proporção da imagem antes do download. O navegador reserva o espaço certo e o texto não pula. Com o CSS acima, a imagem continua fluida.',
  },
  {
    nome: 'loading="lazy"',
    texto: 'Adia o download de imagens que estão fora da tela. Não use na imagem principal do topo: ela costuma ser o elemento de LCP, e atrasá-la piora o carregamento.',
  },
  {
    nome: 'aspect-ratio',
    texto: 'Define a proporção de uma caixa (16 / 9, 4 / 3, 1). Útil para cards, vídeos e espaços reservados.',
  },
  {
    nome: 'object-fit',
    texto: 'Diz como a imagem preenche uma caixa de proporção diferente: cover corta as sobras, contain mostra tudo com faixas, fill distorce.',
  },
  {
    nome: 'srcset e sizes',
    texto: 'Oferecem várias versões do mesmo arquivo. O navegador baixa a menor que atende à largura da tela e à densidade de pixels do aparelho.',
  },
]

const ajustes = ['fill', 'contain', 'cover']

const fontes = [
  {
    titulo: 'Responsive images',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images',
  },
  {
    titulo: 'Cumulative Layout Shift (CLS)',
    autor: 'web.dev (Google)',
    url: 'https://web.dev/articles/cls',
  },
  {
    titulo: 'Optimize Cumulative Layout Shift',
    autor: 'web.dev (Google)',
    url: 'https://web.dev/articles/optimize-cls',
  },
  {
    titulo: 'Browser-level image lazy loading for the web',
    autor: 'web.dev (Google)',
    url: 'https://web.dev/articles/browser-level-image-lazy-loading',
  },
  {
    titulo: 'aspect-ratio',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio',
  },
  {
    titulo: 'object-fit',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit',
  },
]
</script>

<template>
  <PaginaSecao
    nome="imagens"
    resumo="Imagens costumam ser os arquivos mais pesados da página e as maiores culpadas por layouts que pulam. Seis ferramentas resolvem quase todos os casos."
  >
    <BlocoSecao id="explicacao" rotulo="Explicação" titulo="Fluidas, leves e estáveis">
      <ol class="ferramentas">
        <li v-for="ferramenta in ferramentas" :key="ferramenta.nome" class="ferramenta">
          <h3><code>{{ ferramenta.nome }}</code></h3>
          <p>{{ ferramenta.texto }}</p>
        </li>
      </ol>

      <figure class="ajustes">
        <figcaption class="ajustes__legenda">
          A mesma imagem 1200 × 600 (proporção 2:1) dentro de caixas quadradas, com
          <code>aspect-ratio: 1</code>, mudando apenas o <code>object-fit</code>:
        </figcaption>
        <div class="ajustes__lista">
          <div v-for="ajuste in ajustes" :key="ajuste" class="ajuste">
            <img
              src="/img/paisagem.svg"
              width="1200"
              height="600"
              alt="Paisagem ilustrada com montanhas roxas e sol amarelo"
              loading="lazy"
              :style="{ objectFit: ajuste }"
            />
            <p><code>object-fit: {{ ajuste }}</code></p>
          </div>
        </div>
      </figure>
    </BlocoSecao>

    <BlocoSecao id="codigo" rotulo="Exemplo de código" titulo="Uma imagem bem declarada">
      <CodigoExemplo arquivo="galeria.html" linguagem="html" :codigo="exemploImagensHtml" />
      <CodigoExemplo arquivo="imagens.css" linguagem="css" :codigo="exemploImagensCss" />
    </BlocoSecao>

    <PerguntaGuia
      numero="4"
      pergunta="Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?"
    >
      <p>
        O HTML chega antes da imagem. Sem <code>width</code> e <code>height</code>, o navegador
        não tem como saber o tamanho dela, então <strong>não reserva o espaço da imagem antes de
        ela carregar</strong>: desenha a tag com altura zero e posiciona o texto logo abaixo.
      </p>
      <p>
        Quando o download termina, o navegador finalmente descobre as dimensões, abre o espaço
        e a imagem <strong>"empurra" o texto para baixo</strong>. Se a pessoa estava lendo ou
        prestes a tocar num botão, ela perde o lugar ou clica no lugar errado.
      </p>
      <p>
        Com <code>width="800" height="533"</code> no HTML, o navegador calcula a proporção (3:2)
        antes do download e já reserva a área certa, mesmo com <code>max-width: 100%</code> e
        <code>height: auto</code> deixando a imagem fluida.
      </p>
      <p>
        A métrica do Core Web Vitals que mede essa instabilidade visual é o
        <strong>CLS (Cumulative Layout Shift)</strong>. Um bom resultado é CLS de até 0,1.
      </p>
    </PerguntaGuia>

    <FontesConsultadas :fontes="fontes" />
  </PaginaSecao>
</template>

<style scoped>
.ferramentas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr));
  gap: var(--espaco-3);
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: ferramenta;
}

.ferramenta {
  display: grid;
  align-content: start;
  gap: var(--espaco-2);
  padding: var(--espaco-4);
  border: var(--borda);
  border-radius: var(--raio-md);
  background: var(--cor-superficie);
  counter-increment: ferramenta;
}

.ferramenta::before {
  content: counter(ferramenta, decimal-leading-zero);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  color: var(--cor-roxo-400);
}

.ferramenta h3 {
  font-size: var(--texto-base);
}

.ferramenta p {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.ajustes {
  display: grid;
  gap: var(--espaco-4);
  margin: 0;
  padding: var(--espaco-5) var(--espaco-4);
  border-radius: var(--raio-lg);
  background: var(--cor-roxo-100);
}

.ajustes__legenda {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.ajustes__lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr));
  gap: var(--espaco-4);
}

.ajuste {
  display: grid;
  gap: var(--espaco-2);
  min-width: 0;
}

.ajuste img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--raio-md);
  background: repeating-conic-gradient(var(--cor-roxo-50) 0 25%, var(--cor-superficie) 0 50%) 0 0 / 1rem 1rem;
  border: var(--espessura) solid var(--cor-linha-forte);
}

.ajuste p {
  font-size: var(--texto-sm);
  text-align: center;
}

@media (min-width: 48rem) {
  .ajustes {
    padding: var(--espaco-6);
  }
}
</style>
