<script setup>
import { ref } from 'vue'
import AberturaSecao from '@/components/guia/AberturaSecao.vue'
import CapituloGuia from '@/components/guia/CapituloGuia.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import PaginadorSecoes from '@/components/guia/PaginadorSecoes.vue'
import LabFlexbox from '@/components/labs/LabFlexbox.vue'
import LabGrid from '@/components/labs/LabGrid.vue'
import { fontes } from '@/data/fontes'
import { flexCss, gridCss } from '@/data/exemplos'
import { usePageMotion } from '@/composables/useMotion'

const raiz = ref(null)
usePageMotion(raiz)

const propriedades = [
  { nome: 'justify-content', onde: 'Flexbox e Grid', texto: 'Distribui os itens no eixo principal: start, center, end, space-between, space-around, space-evenly.' },
  { nome: 'align-items', onde: 'Flexbox e Grid', texto: 'Alinha os itens no eixo cruzado: stretch (padrão), start, center, end, baseline.' },
  { nome: 'flex-wrap', onde: 'Flexbox', texto: 'Deixa os itens quebrarem para a linha de baixo quando não cabem. Sem ele, tudo se espreme ou vaza.' },
  { nome: 'gap', onde: 'Flexbox e Grid', texto: 'Espaço só entre os itens, nunca nas bordas. Substitui as margens.' },
  { nome: 'repeat()', onde: 'Grid', texto: 'Repete um padrão de trilhas: repeat(3, 1fr) cria três colunas iguais.' },
  { nome: 'auto-fit / auto-fill', onde: 'Grid', texto: 'Criam quantas trilhas couberem. auto-fit colapsa as vazias; auto-fill as mantém.' },
  { nome: 'minmax(mín, máx)', onde: 'Grid', texto: 'Uma trilha nunca fica menor que o mínimo nem maior que o máximo. Com 1fr no máximo, ela estica.' },
]

const decisoes = [
  { caso: 'Menu, barra de botões, ícone + texto', escolha: 'Flexbox', porque: 'é uma fila: uma dimensão' },
  { caso: 'Galeria de cards, dashboard', escolha: 'Grid', porque: 'linhas e colunas alinhadas' },
  { caso: 'Estrutura da página (lateral + conteúdo)', escolha: 'Grid', porque: 'áreas em duas dimensões' },
  { caso: 'Centralizar uma coisa', escolha: 'Os dois', porque: 'place-items: center ou justify + align' },
  { caso: 'Itens que decidem o próprio tamanho', escolha: 'Flexbox', porque: 'o conteúdo manda' },
  { caso: 'Contêiner que decide o tamanho dos itens', escolha: 'Grid', porque: 'a grade manda' },
]
</script>

<template>
  <div ref="raiz">
    <AberturaSecao nome="flexbox-grid" />

    <CapituloGuia id="dimensoes" indice="03.1" titulo="Uma dimensão ou duas" largo>
      <template #aside>
        <p>A diferença essencial cabe numa linha: Flexbox organiza uma fila; Grid organiza uma tabela.</p>
      </template>
      <div class="dimensoes">
        <figure class="dimensao" data-assemble>
          <figcaption>
            <span class="label">1D · Flexbox</span>
            <strong>Uma linha OU uma coluna.</strong> Os itens decidem o próprio tamanho; o Flexbox distribui o espaço
            entre eles.
          </figcaption>
          <div class="diagrama diagrama--flex" aria-hidden="true">
            <span class="diagrama__eixo">eixo principal →</span>
            <span data-piece class="bloco" style="flex: 0 0 18%"></span>
            <span data-piece class="bloco bloco--alto" style="flex: 0 0 30%"></span>
            <span data-piece class="bloco" style="flex: 0 0 12%"></span>
            <span data-piece class="bloco bloco--marca" style="flex: 0 0 22%"></span>
          </div>
        </figure>
        <figure class="dimensao" data-assemble>
          <figcaption>
            <span class="label">2D · Grid</span>
            <strong>Linhas E colunas.</strong> O contêiner desenha a grade; os itens se encaixam nas trilhas, alinhados
            nas duas direções.
          </figcaption>
          <div class="diagrama diagrama--grid" aria-hidden="true">
            <span data-piece class="bloco bloco--marca" style="grid-column: span 2"></span>
            <span data-piece class="bloco"></span>
            <span data-piece class="bloco"></span>
            <span data-piece class="bloco bloco--alto" style="grid-column: span 2"></span>
            <span data-piece class="bloco"></span>
            <span data-piece class="bloco"></span>
            <span data-piece class="bloco"></span>
          </div>
        </figure>
      </div>
    </CapituloGuia>

    <CapituloGuia id="propriedades" indice="03.2" titulo="As propriedades-chave">
      <dl class="propriedades">
        <div v-for="prop in propriedades" :key="prop.nome" class="propriedade" data-reveal>
          <dt>
            <code>{{ prop.nome }}</code>
            <span class="label">{{ prop.onde }}</span>
          </dt>
          <dd>{{ prop.texto }}</dd>
        </div>
      </dl>
      <CodigoEditor arquivo="menu.css" linguagem="css" :codigo="flexCss" data-reveal />
      <CodigoEditor arquivo="layout.css" linguagem="css" :codigo="gridCss" :destaque="[5]" data-reveal />
    </CapituloGuia>

    <CapituloGuia id="lab-03-capitulo" indice="03.3" titulo="Mexer nos eixos" largo>
      <LabFlexbox />
    </CapituloGuia>

    <CapituloGuia id="lab-04-capitulo" indice="03.4" titulo="Colunas que se ajustam sozinhas" largo>
      <template #aside>
        <p>Comece em auto-fit com 14rem e gap de 1rem (os valores da Pergunta-guia 03) e arraste a largura.</p>
      </template>
      <LabGrid />
    </CapituloGuia>

    <CapituloGuia id="quando-usar" indice="03.5" titulo="Quando usar cada um">
      <ol class="decisoes">
        <li v-for="item in decisoes" :key="item.caso" class="decisao" data-reveal>
          <span class="decisao__caso">{{ item.caso }}</span>
          <span class="decisao__escolha" :class="`decisao__escolha--${item.escolha === 'Grid' ? 'grid' : item.escolha === 'Flexbox' ? 'flex' : 'ambos'}`">
            {{ item.escolha }}
          </span>
          <span class="decisao__porque">{{ item.porque }}</span>
        </li>
      </ol>
      <p class="prose" data-reveal>
        <span>Na prática eles convivem: Grid para o esqueleto da página, Flexbox para o conteúdo de cada caixa.</span>
      </p>
    </CapituloGuia>

    <PerguntaGuia
      id="pergunta-3"
      numero="03"
      pergunta="Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em 1 coluna e passam para 2? Considerem 1rem = 16px e mostrem a conta."
    >
      <p>
        Para caber 2 colunas, o contêiner precisa acomodar as <strong>duas colunas no tamanho mínimo</strong>
        (14rem cada) <strong>e o gap entre elas</strong> (1rem). Só existe 1 gap, porque ele fica entre as colunas,
        nunca nas bordas.
      </p>
      <p>2 × 14rem + 1 × 1rem = 29rem. Com 1rem = 16px: 29 × 16 = <strong>464px</strong>.</p>
      <p>
        Abaixo de 464px só cabe uma coluna, que se estica até 100% (é o 1fr do minmax). <strong>As 2 colunas
        aparecem a partir de 464px de largura do contêiner</strong>, que é a área interna, sem o padding, e não
        necessariamente a largura da janela. Confira no Laboratório 04: o painel mostra "a partir de 464px".
      </p>
      <template #visual>
        <figure class="conta" data-assemble>
          <figcaption class="label conta__titulo">A conta, em escala</figcaption>
          <div class="conta__regua">
            <span data-piece class="conta__coluna">14rem</span>
            <span data-piece class="conta__gap">1rem</span>
            <span data-piece class="conta__coluna">14rem</span>
          </div>
          <div data-piece class="conta__total">
            <span>= 29rem</span>
          </div>
          <ol class="conta__passos">
            <li data-piece><span>Colunas</span> 2 × 14rem = 28rem</li>
            <li data-piece><span>Gap</span> 1 × 1rem = 1rem</li>
            <li data-piece><span>Soma</span> 28rem + 1rem = 29rem</li>
            <li data-piece class="conta__final"><span>Em px</span> 29 × 16px = <strong><span data-count="464">464</span>px</strong></li>
          </ol>
        </figure>
      </template>
    </PerguntaGuia>

    <FontesConsultadas numero="03" :fontes="fontes['flexbox-grid']" />
    <PaginadorSecoes nome="flexbox-grid" />
  </div>
</template>

<style scoped>
.dimensoes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
  gap: var(--space-6) var(--column-gap);
}

.dimensao {
  display: grid;
  align-content: start;
  gap: var(--space-4);
}

.dimensao figcaption {
  display: grid;
  gap: var(--space-2);
  max-width: 30rem;
  color: var(--color-ink-2);
}

.dimensao .label {
  color: var(--color-accent);
}

.diagrama {
  position: relative;
  min-height: 11rem;
  padding: var(--space-6) var(--space-4) var(--space-4);
  border: var(--border-strong);
  background:
    radial-gradient(circle, var(--color-rule) 0.0625rem, transparent 0.0625rem) 0 0 / 1rem 1rem,
    var(--color-surface);
}

.diagrama--flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.diagrama--grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 2.5rem;
  gap: 0.5rem;
}

.diagrama__eixo {
  position: absolute;
  top: var(--space-2);
  left: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-accent);
}

.bloco {
  min-height: 3rem;
  border: var(--border-strong);
  background: var(--color-accent-soft);
}

.diagrama--grid .bloco {
  min-height: 0;
}

.bloco--alto {
  min-height: 5.5rem;
  background: var(--color-signal);
}

.diagrama--grid .bloco--alto {
  grid-row: span 2;
}

.bloco--marca {
  background: var(--color-accent);
}

.propriedades {
  border-top: var(--border-strong);
}

.propriedade {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3) 0;
  border-bottom: var(--border-soft);
}

.propriedade dt {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.propriedade dt .label {
  color: var(--color-ink-3);
  font-size: var(--text-2xs);
}

.propriedade dd {
  color: var(--color-ink-2);
}

.decisoes {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.decisao {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-1) var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: var(--border-soft);
}

.decisao__caso {
  font-weight: 600;
}

.decisao__escolha {
  padding: 0 var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  align-self: start;
}

.decisao__escolha--flex {
  background: var(--color-signal);
}

.decisao__escolha--grid {
  background: var(--color-accent);
  color: #fff;
}

.decisao__escolha--ambos {
  border: var(--border-strong);
}

.decisao__porque {
  grid-column: 1 / -1;
  font-size: var(--text-sm);
  color: var(--color-ink-3);
}

.conta {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-5);
  border: var(--hairline) solid var(--color-dark-line);
}

.conta__titulo {
  color: var(--color-signal);
}

.conta__regua {
  display: grid;
  grid-template-columns: 14fr 1fr 14fr;
  height: 3.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.conta__coluna {
  display: grid;
  place-items: center;
  border: var(--hairline) solid var(--color-on-dark);
  background: var(--color-dark-3);
}

.conta__gap {
  display: grid;
  place-items: center;
  background: repeating-linear-gradient(-45deg, var(--color-signal) 0 0.25rem, transparent 0.25rem 0.5rem);
  color: transparent;
}

.conta__total {
  position: relative;
  height: 1.5rem;
  border: var(--hairline) solid var(--color-signal);
  border-top: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-align: center;
  color: var(--color-signal);
}

.conta__total span {
  position: relative;
  top: 0.75rem;
  padding: 0 var(--space-2);
  background: var(--color-dark);
}

.conta__passos {
  display: grid;
  gap: var(--space-1);
  margin: var(--space-3) 0 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.conta__passos li {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-dark-2);
}

.conta__passos li > span {
  min-width: 4.5rem;
  color: var(--color-on-dark-2);
  font-size: var(--text-2xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
}

.conta__passos .conta__final {
  background: var(--color-signal);
  color: var(--color-ink);
}

.conta__passos .conta__final > span {
  color: var(--color-ink);
}

.conta__passos .conta__final strong {
  color: var(--color-ink);
}

@media (min-width: 48rem) {
  .propriedade {
    grid-template-columns: 15rem minmax(0, 1fr);
    gap: var(--space-5);
  }

  .propriedade dt {
    flex-direction: column;
    justify-content: start;
  }

  .decisao {
    grid-template-columns: minmax(0, 1fr) 6rem minmax(0, 1fr);
    align-items: baseline;
  }

  .decisao__porque {
    grid-column: auto;
  }
}
</style>
