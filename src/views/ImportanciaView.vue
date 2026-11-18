<script setup>
import { ref } from 'vue'
import AberturaSecao from '@/components/guia/AberturaSecao.vue'
import CapituloGuia from '@/components/guia/CapituloGuia.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import PaginadorSecoes from '@/components/guia/PaginadorSecoes.vue'
import FiguraEditorial from '@/components/guia/FiguraEditorial.vue'
import LayoutEvolucao from '@/components/demos/LayoutEvolucao.vue'
import ReguaBreakpoints from '@/components/demos/ReguaBreakpoints.vue'
import ComparacaoViewport from '@/components/demos/ComparacaoViewport.vue'
import { fotos } from '@/data/fotos'
import { fontes } from '@/data/fontes'
import { viewportHtml, mobileFirstCss } from '@/data/exemplos'
import { usePageMotion } from '@/composables/useMotion'

const raiz = ref(null)
usePageMotion(raiz)

const motivos = [
  {
    titulo: 'A maior parte do acesso é pelo celular',
    texto: 'Segundo o StatCounter, mais da metade do tráfego mundial da web vem de celulares. Uma página que não funciona no celular não funciona para a maioria das pessoas.',
  },
  {
    titulo: 'O Google lê a versão mobile',
    texto: 'Com a indexação mobile-first, é a versão de celular da página que o Google usa para indexar e ranquear. Conteúdo escondido no mobile tende a não contar.',
  },
  {
    titulo: 'Acessibilidade depende de reorganizar',
    texto: 'Quem usa zoom de 200% ou fonte maior vê, na prática, uma tela mais estreita. Um layout que se reorganiza atende essas pessoas sem esforço extra.',
  },
  {
    titulo: 'Um código, todas as telas',
    texto: 'Manter um site para desktop e outro "m." separado dobra o trabalho. Um único HTML com CSS responsivo é mais barato de manter e testar.',
  },
]
</script>

<template>
  <div ref="raiz">
    <AberturaSecao nome="importancia" />

    <CapituloGuia id="o-que-e" indice="01.1" titulo="O que é responsividade">
      <div class="prose" data-reveal>
        <p>
          Um site <strong>responsivo</strong> é aquele cujo layout se adapta ao espaço disponível. É o mesmo HTML,
          com um CSS que reage à largura da tela: as colunas se reorganizam, as imagens encolhem, o menu vira um
          botão.
        </p>
        <p>
          A ideia ganhou nome em 2010, quando Ethan Marcotte publicou o artigo <em>Responsive Web Design</em> na A
          List Apart, juntando três ingredientes: <strong>grids fluidos</strong>, <strong>imagens flexíveis</strong>
          e <strong>media queries</strong>.
        </p>
      </div>
      <FiguraEditorial
        :foto="fotos.celularMao"
        numero="01.1"
        legenda="Uma página aberta no celular, com o notebook ao fundo. Mesma página, duas telas, duas organizações."
        proporcao="16 / 10"
        sizes="(min-width: 80rem) 55vw, 100vw"
      />
    </CapituloGuia>

    <CapituloGuia id="por-que" indice="01.2" titulo="Por que importa">
      <ol class="motivos">
        <li v-for="(motivo, i) in motivos" :key="motivo.titulo" class="motivo" data-reveal>
          <span class="motivo__n">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="motivo__titulo">{{ motivo.titulo }}</h3>
          <p class="motivo__texto">{{ motivo.texto }}</p>
        </li>
      </ol>
    </CapituloGuia>

    <CapituloGuia id="evolucao" indice="01.3" titulo="Fixo → fluido → responsivo" largo>
      <template #aside>
        <p>
          Três gerações de layout com a mesma página. Arraste a largura ou deixe a janela encolher sozinha:
          o fixo vaza, o fluido espreme, o responsivo reorganiza.
        </p>
      </template>
      <div class="evolucao-intro grid">
        <div class="evolucao-intro__foto">
          <FiguraEditorial
            :foto="fotos.monitoresCrt"
            numero="01.2"
            legenda="Monitores de tubo: a era em que se desenhava para uma tela de 800 ou 1024px e se fixava a largura em pixels."
            proporcao="4 / 3"
            sizes="(min-width: 80rem) 30vw, 100vw"
            parallax
          />
        </div>
        <div class="evolucao-intro__texto prose" data-reveal>
          <p>
            <strong>Fixo.</strong> O conteúdo tinha largura em pixels, como <code>960px</code>. Em telas menores
            aparecia a rolagem horizontal; em telas maiores, sobravam faixas vazias.
          </p>
          <p>
            <strong>Fluido.</strong> As larguras passaram a ser porcentagens. A página acompanhava a janela, mas três
            colunas de 33% num celular viram três tiras ilegíveis.
          </p>
          <p>
            <strong>Responsivo.</strong> Larguras fluidas mais <strong>media queries</strong>: a partir de certas
            larguras, o layout muda de estrutura. É o padrão atual.
          </p>
        </div>
      </div>
      <LayoutEvolucao data-reveal />
    </CapituloGuia>

    <CapituloGuia id="mobile-first" indice="01.4" titulo="Mobile-first e media queries">
      <div class="prose" data-reveal>
        <p>
          <strong>Media queries</strong> aplicam CSS só quando uma condição é verdadeira, como a largura da janela.
          No <strong>mobile-first</strong>, o CSS sem media query é o do celular. Depois, cada
          <code>@media (min-width: …)</code> acrescenta regras para telas maiores.
        </p>
        <p>
          A vantagem: o celular, que costuma ter a pior conexão, baixa o layout mais simples, e as telas grandes
          recebem complementos, não correções.
        </p>
      </div>
      <ReguaBreakpoints data-reveal />
      <CodigoEditor arquivo="estilos.css" linguagem="css" :codigo="mobileFirstCss" :destaque="[1, 8, 15]" data-reveal />
    </CapituloGuia>

    <CapituloGuia id="viewport" indice="01.5" titulo="A meta viewport">
      <div class="prose" data-reveal>
        <p>
          Uma linha no <code>&lt;head&gt;</code> decide se tudo o que vimos até aqui funciona no celular. Abaixo, o
          mesmo site da Fig. 00 aberto em um celular de 390px, com e sem ela.
        </p>
      </div>
      <ComparacaoViewport data-reveal />
      <CodigoEditor arquivo="index.html" linguagem="html" :codigo="viewportHtml" :destaque="[7]" data-reveal />
    </CapituloGuia>

    <PerguntaGuia
      id="pergunta-1"
      numero="01"
      pergunta="Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?"
    >
      <p>
        Sem a meta viewport, o navegador do celular não sabe que a página foi pensada para telas pequenas. Por
        segurança, ele <strong>assume que o site é para desktop</strong>: cria um viewport de layout com cerca de
        <strong>980px de largura</strong>, desenha a página nesse tamanho e depois <strong>diminui o zoom</strong>
        até tudo caber nos ~390px reais da tela. É a versão de computador, só que minúscula.
      </p>
      <p>
        As media queries perguntam a largura do viewport, e o navegador responde "980px". Então uma regra como
        <code>@media (min-width: 48rem)</code> (768px) é ativada mesmo no celular, e o CSS pensado para telas
        pequenas nunca entra em ação.
      </p>
      <p>
        A tag <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> muda isso:
        <code>width=device-width</code> <strong>força o navegador a respeitar a largura real da tela do
        celular</strong> como largura do viewport, e <code>initial-scale=1.0</code> abre a página sem zoom. Agora as
        media queries recebem a largura verdadeira e o layout mobile aparece como planejado.
      </p>
      <template #visual>
        <dl class="escala" data-assemble>
          <div data-piece>
            <dt class="label">Viewport sem a tag</dt>
            <dd><span data-count="980">980</span>px</dd>
          </div>
          <div data-piece>
            <dt class="label">Tela real</dt>
            <dd><span data-count="390">390</span>px</dd>
          </div>
          <div data-piece>
            <dt class="label">Zoom aplicado</dt>
            <dd>×0,40</dd>
          </div>
          <div data-piece class="escala__final">
            <dt class="label">Texto de 16px vira</dt>
            <dd>~6,4px</dd>
          </div>
        </dl>
      </template>
    </PerguntaGuia>

    <FontesConsultadas numero="01" :fontes="fontes.importancia" />
    <PaginadorSecoes nome="importancia" />
  </div>
</template>

<style scoped>
.motivos {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.motivo {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: var(--space-1) var(--space-3);
  padding: var(--space-5) 0;
  border-bottom: var(--border-soft);
}

.motivo__n {
  grid-row: span 2;
  font-family: var(--font-heading);
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 1;
  color: var(--color-accent);
}

.motivo__titulo {
  font-size: var(--text-xl);
  font-weight: 700;
  font-stretch: 82%;
}

.motivo__texto {
  max-width: var(--measure);
  color: var(--color-ink-2);
}

.evolucao-intro {
  row-gap: var(--space-5);
}

.evolucao-intro__foto,
.evolucao-intro__texto {
  grid-column: 1 / -1;
  min-width: 0;
}

.escala {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--hairline);
  background: var(--color-dark-line);
  border: var(--hairline) solid var(--color-dark-line);
}

.escala div {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--color-dark);
}

.escala dt {
  color: var(--color-on-dark-2);
}

.escala dd {
  font-family: var(--font-heading);
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1;
}

.escala__final {
  background: var(--color-signal) !important;
}

.escala__final dt,
.escala__final dd {
  color: var(--color-ink);
}

@media (min-width: 80rem) {
  .evolucao-intro__foto {
    grid-column: 1 / span 5;
  }

  .evolucao-intro__texto {
    grid-column: 7 / -1;
    align-self: center;
  }
}
</style>
