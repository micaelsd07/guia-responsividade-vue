<script setup>
import PaginaSecao from '@/components/guia/PaginaSecao.vue'
import BlocoSecao from '@/components/guia/BlocoSecao.vue'
import CodigoExemplo from '@/components/guia/CodigoExemplo.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import MolduraLab from '@/components/guia/MolduraLab.vue'
import LabConstrutorDashboard from '@/components/labs/LabConstrutorDashboard.vue'
import { exemploFlexGridCss } from '@/data/exemplos'

const propriedades = [
  {
    nome: 'justify-content',
    texto: 'Distribui os itens no eixo principal (na horizontal, em uma linha flex): start, center, space-between...',
  },
  {
    nome: 'align-items',
    texto: 'Alinha os itens no eixo cruzado (na vertical, em uma linha flex): stretch, center, start, end.',
  },
  {
    nome: 'flex-wrap',
    texto: 'Permite que os itens quebrem para a linha de baixo quando não cabem. Sem ele, tudo se espreme numa linha só.',
  },
  {
    nome: 'gap',
    texto: 'Espaço entre itens, em Flexbox e em Grid. Substitui as margens e não cria sobra nas bordas.',
  },
  {
    nome: 'repeat(auto-fit, minmax(14rem, 1fr))',
    texto: 'Cria quantas colunas couberem, cada uma com no mínimo 14rem; o espaço que sobra é repartido (1fr). Layout responsivo sem media query.',
  },
]

const fontes = [
  {
    titulo: 'Flexbox',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox',
  },
  {
    titulo: 'CSS grid layout',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids',
  },
  {
    titulo: 'repeat()',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/repeat',
  },
  {
    titulo: 'A Complete Guide to Flexbox',
    autor: 'CSS-Tricks',
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
  },
  {
    titulo: 'A Complete Guide to CSS Grid',
    autor: 'CSS-Tricks',
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
  },
  {
    titulo: 'Learn CSS: Grid',
    autor: 'web.dev (Google)',
    url: 'https://web.dev/learn/css/grid',
  },
]
</script>

<template>
  <PaginaSecao
    nome="flexbox-grid"
    resumo="Flexbox organiza em uma direção; Grid organiza em linhas e colunas ao mesmo tempo. Com repeat(auto-fit, minmax()), o Grid monta layouts responsivos sem escrever uma única media query."
  >
    <BlocoSecao id="explicacao" rotulo="Explicação" titulo="Uma dimensão ou duas?">
      <div class="comparativo">
        <article class="modelo">
          <p class="modelo__selo">1D: Flexbox</p>
          <div class="diagrama diagrama--flex" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <p>
            Pensa em <strong>uma linha OU uma coluna</strong> por vez. Os itens decidem o próprio
            tamanho e o Flexbox distribui o espaço entre eles.
          </p>
          <p class="modelo__uso">Ideal para: menus, barras de botões, alinhar ícone + texto, centralizar algo.</p>
        </article>
        <article class="modelo">
          <p class="modelo__selo">2D: Grid</p>
          <div class="diagrama diagrama--grid" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <p>
            Pensa em <strong>linhas E colunas</strong> ao mesmo tempo. O contêiner define a
            grade e os itens se encaixam nela.
          </p>
          <p class="modelo__uso">Ideal para: galerias de cards, dashboards, a estrutura geral da página.</p>
        </article>
      </div>

      <dl class="propriedades">
        <div v-for="propriedade in propriedades" :key="propriedade.nome" class="propriedade">
          <dt><code>{{ propriedade.nome }}</code></dt>
          <dd>{{ propriedade.texto }}</dd>
        </div>
      </dl>

      <div class="texto">
        <p>
          <strong>Regra prática:</strong> se você está alinhando itens numa fila, use Flexbox; se
          está desenhando uma grade ou a estrutura da página, use Grid. Os dois convivem muito bem:
          Grid para o esqueleto, Flexbox para o conteúdo de cada caixa.
        </p>
      </div>
    </BlocoSecao>

    <BlocoSecao id="codigo" rotulo="Exemplo de código" titulo="Flexbox no menu, Grid nos cards">
      <CodigoExemplo arquivo="layout.css" linguagem="css" :codigo="exemploFlexGridCss" />
    </BlocoSecao>

    <MolduraLab
      numero="2"
      titulo="Construtor de dashboard"
      descricao="Seis cartões de métricas num grid com repeat(auto-fit, minmax()). Mude a largura mínima e o gap, arraste a largura do contêiner (ou redimensione a janela) e veja as colunas se reorganizarem sozinhas."
    >
      <LabConstrutorDashboard />
    </MolduraLab>

    <PerguntaGuia
      numero="3"
      pergunta="Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em 1 coluna e passam para 2? Considerem 1rem = 16px e mostrem a conta."
    >
      <p>
        Para caber 2 colunas, o contêiner precisa acomodar as duas colunas no tamanho mínimo
        <strong>e</strong> o gap entre elas:
      </p>
      <ol class="conta">
        <li><span>Colunas</span> 2 × 14rem = <strong>28rem</strong></li>
        <li><span>Gap</span> 1 espaço entre 2 colunas = <strong>1rem</strong></li>
        <li><span>Total</span> 28rem + 1rem = <strong>29rem</strong></li>
        <li><span>Em px</span> 29 × 16px = <strong>464px</strong></li>
      </ol>
      <p>
        Abaixo de 464px só cabe uma coluna (que se estica até 100%). <strong>As 2 colunas
        aparecem a partir de 464px de largura do contêiner</strong>. Atenção: é a largura do
        contêiner (sem o padding dele), não necessariamente a da janela. Você pode conferir no
        Laboratório 02: com 14rem e 1rem, arraste a largura até o painel mostrar 464px.
      </p>
    </PerguntaGuia>

    <FontesConsultadas :fontes="fontes" />
  </PaginaSecao>
</template>

<style scoped>
.comparativo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: var(--espaco-4);
}

.modelo {
  display: grid;
  align-content: start;
  gap: var(--espaco-3);
  padding: var(--espaco-5) var(--espaco-4);
  border: var(--borda);
  border-radius: var(--raio-lg);
  background: var(--cor-superficie);
}

.modelo__selo {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
  font-weight: 500;
  color: var(--cor-roxo-700);
}

.modelo__uso {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.diagrama {
  gap: var(--espaco-2);
  padding: var(--espaco-3);
  border-radius: var(--raio-md);
  background: var(--cor-roxo-50);
  border: var(--espessura) dashed var(--cor-roxo-200);
}

.diagrama span {
  min-height: 2.5rem;
  border-radius: var(--raio-sm);
  background: var(--cor-roxo-600);
}

.diagrama--flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.diagrama--flex span {
  width: 22%;
}

.diagrama--flex span:nth-child(2) {
  min-height: 4rem;
  background: var(--cor-roxo-400);
}

.diagrama--grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.diagrama--grid span:first-child {
  grid-column: span 2;
  background: var(--cor-ambar);
}

.diagrama--grid span:nth-child(4) {
  grid-column: span 2;
  background: var(--cor-roxo-400);
}

.propriedades {
  display: grid;
  gap: 0;
  margin: 0;
  border-top: var(--borda);
}

.propriedade {
  display: grid;
  gap: var(--espaco-1);
  padding: var(--espaco-4) 0;
  border-bottom: var(--borda);
}

.propriedade dt code {
  font-size: var(--texto-sm);
}

.propriedade dd {
  margin: 0;
  color: var(--cor-tinta-suave);
}

.conta {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
}

.conta li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--espaco-2);
  padding: var(--espaco-2) var(--espaco-3);
  border-radius: var(--raio-sm);
  background: rgb(255 255 255 / 0.06);
}

.conta li:last-child {
  background: var(--cor-ambar);
  color: var(--cor-roxo-950);
}

.conta li:last-child strong {
  color: var(--cor-roxo-950);
}

.conta span {
  min-width: 4.5rem;
  font-size: var(--texto-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.75;
}

@media (min-width: 48rem) {
  .propriedade {
    grid-template-columns: minmax(12rem, 22rem) 1fr;
    gap: var(--espaco-5);
  }
}
</style>
