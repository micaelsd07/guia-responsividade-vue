<script setup>
import PaginaSecao from '@/components/guia/PaginaSecao.vue'
import BlocoSecao from '@/components/guia/BlocoSecao.vue'
import CodigoExemplo from '@/components/guia/CodigoExemplo.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import MolduraLab from '@/components/guia/MolduraLab.vue'
import LabBugDaLista from '@/components/labs/LabBugDaLista.vue'
import {
  exemploEstruturaPastas,
  exemploComponenteVue,
  exemploListaComKey,
  exemploRotasLazy,
  exemploTokensCss,
} from '@/data/exemplos'

const vitais = [
  {
    sigla: 'LCP',
    nome: 'Largest Contentful Paint',
    mede: 'Carregamento: quanto tempo até o maior elemento visível (foto de capa, título) aparecer.',
    meta: 'até 2,5 s',
  },
  {
    sigla: 'INP',
    nome: 'Interaction to Next Paint',
    mede: 'Interatividade: quanto a página demora para responder a um clique, toque ou tecla.',
    meta: 'até 200 ms',
  },
  {
    sigla: 'CLS',
    nome: 'Cumulative Layout Shift',
    mede: 'Estabilidade visual: quanto o conteúdo pula enquanto a página carrega.',
    meta: 'até 0,1',
  },
]

const fontes = [
  {
    titulo: 'Style Guide',
    autor: 'Vue.js (documentação oficial)',
    url: 'https://vuejs.org/style-guide/',
  },
  {
    titulo: 'List Rendering: Maintaining State with key',
    autor: 'Vue.js (documentação oficial)',
    url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key',
  },
  {
    titulo: 'Props e Component Events',
    autor: 'Vue.js (documentação oficial)',
    url: 'https://vuejs.org/guide/components/props.html',
  },
  {
    titulo: 'Lazy Loading Routes',
    autor: 'Vue Router (documentação oficial)',
    url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html',
  },
  {
    titulo: 'Web Vitals',
    autor: 'web.dev (Google)',
    url: 'https://web.dev/articles/vitals',
  },
  {
    titulo: 'Using CSS custom properties (variables)',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
  },
]
</script>

<template>
  <PaginaSecao
    nome="boas-praticas"
    resumo="Responsividade também é organização. Um projeto Vue bem estruturado é mais fácil de manter, carrega mais rápido e fica livre de bugs estranhos, como o texto que muda de dono numa lista."
  >
    <BlocoSecao id="explicacao" rotulo="Explicação" titulo="Hábitos que deixam o projeto saudável">
      <div class="praticas">
        <section class="pratica">
          <h3>Estrutura de pastas</h3>
          <p>
            Separe por responsabilidade: componentes de layout, peças reutilizáveis e páginas
            (views). Esta é a estrutura deste próprio guia:
          </p>
          <CodigoExemplo arquivo="estrutura do projeto" linguagem="texto" :codigo="exemploEstruturaPastas" />
        </section>

        <section class="pratica">
          <h3>Nomes de componentes</h3>
          <ul>
            <li><strong>PascalCase</strong> e com mais de uma palavra: <code>CartaoAnimal.vue</code>, nunca <code>Cartao.vue</code> (evita conflito com tags HTML).</li>
            <li>Prefixo <code>The</code> para componentes únicos: <code>TheHeader</code>.</li>
            <li>Sufixo <code>View</code> para páginas ligadas a rotas: <code>BoasPraticasView</code>.</li>
          </ul>
        </section>

        <section class="pratica">
          <h3>Props tipadas e eventos</h3>
          <p>
            Declare as props com tipo e obrigatoriedade em <code>defineProps</code>: o Vue avisa
            no console se alguém passar o dado errado. Os dados <strong>descem</strong> por props e
            os avisos <strong>sobem</strong> por eventos (<code>defineEmits</code>); o filho nunca
            altera a prop diretamente.
          </p>
        </section>

        <section class="pratica">
          <h3><code>:key</code> no <code>v-for</code></h3>
          <p>
            Toda lista renderizada com <code>v-for</code> precisa de uma <code>:key</code> única e
            estável, normalmente o <code>id</code> do item. Evite o índice do array: ele muda
            quando a lista muda. O Laboratório 03, logo abaixo, mostra o porquê.
          </p>
        </section>

        <section class="pratica">
          <h3>Variáveis CSS como design tokens</h3>
          <p>
            Cores, espaçamentos e raios ficam em variáveis no <code>:root</code>. Os componentes
            usam <code>var(--token)</code> em vez de valores soltos, e mudar o visual do site inteiro
            vira uma alteração em um só arquivo.
          </p>
        </section>

        <section class="pratica">
          <h3>Rotas sob demanda</h3>
          <p>
            Com <code>component: () =&gt; import(...)</code>, cada página vira um arquivo separado
            no build e só é baixada quando alguém a visita. A primeira tela carrega mais rápido, o
            que ajuda diretamente o LCP.
          </p>
        </section>
      </div>

      <div class="vitais">
        <h3 class="vitais__titulo">Core Web Vitals: as três notas do Google</h3>
        <ul class="vitais__lista">
          <li v-for="vital in vitais" :key="vital.sigla" class="vital">
            <p class="vital__sigla">{{ vital.sigla }}</p>
            <p class="vital__nome">{{ vital.nome }}</p>
            <p class="vital__mede">{{ vital.mede }}</p>
            <p class="vital__meta">Bom: {{ vital.meta }}</p>
          </li>
        </ul>
      </div>
    </BlocoSecao>

    <BlocoSecao id="codigo" rotulo="Exemplo de código" titulo="Componente, lista, tokens e rotas">
      <CodigoExemplo arquivo="components/CartaoAnimal.vue" linguagem="vue" :codigo="exemploComponenteVue" />
      <CodigoExemplo arquivo="components/ListaAnimais.vue" linguagem="vue" :codigo="exemploListaComKey" />
      <CodigoExemplo arquivo="assets/styles/main.css" linguagem="css" :codigo="exemploTokensCss" />
      <CodigoExemplo arquivo="router/index.js" linguagem="js" :codigo="exemploRotasLazy" />
    </BlocoSecao>

    <MolduraLab
      numero="3"
      titulo="O bug da lista"
      descricao="Duas listas idênticas de animais, cada um com um campo de texto. A Lista A usa v-for sem :key; a Lista B usa :key=&quot;animal.id&quot;. Siga os passos e veja o estado do DOM ir parar no animal errado."
    >
      <LabBugDaLista />
    </MolduraLab>

    <PerguntaGuia
      numero="5"
      pergunta="Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?"
    >
      <p>
        Por desempenho, o Vue <strong>tenta reaproveitar os elementos do DOM</strong> que já
        existem. Sem <code>:key</code>, ele não sabe qual elemento pertence a qual animal: só
        enxerga posições. Então, em vez de remover o elemento certo, ele aplica a estratégia de
        "corrigir no lugar".
      </p>
      <p>
        Ao remover o 1º animal, a lista passa de <em>Capivara, Tamanduá, Arara-azul,
        Lobo-guará</em> para <em>Tamanduá, Arara-azul, Lobo-guará</em>. O Vue então
        <strong>atualiza apenas o texto dos nós existentes</strong>: escreve "Tamanduá" no 1º
        item, "Arara-azul" no 2º, "Lobo-guará" no 3º, e apaga o último item.
      </p>
      <p>
        Os campos de texto não são tocados, porque o que foi digitado não faz parte do estado
        reativo: é <strong>estado local do DOM</strong>, guardado no próprio
        <code>&lt;input&gt;</code>. Por isso o texto digitado para o Tamanduá
        <strong>fica no 2º item, que agora mostra a Arara-azul</strong>, e o Tamanduá aparece
        com o campo vazio. O texto vai parar no animal errado.
      </p>
      <p>
        Com <code>:key="animal.id"</code>, cada elemento fica amarrado a um animal. O Vue percebe
        que quem saiu foi a Capivara, remove exatamente aquele elemento e mantém o do Tamanduá
        intacto, com o texto dentro.
      </p>
    </PerguntaGuia>

    <FontesConsultadas :fontes="fontes" />
  </PaginaSecao>
</template>

<style scoped>
.praticas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
  gap: var(--espaco-4);
}

.pratica {
  display: grid;
  align-content: start;
  gap: var(--espaco-3);
  min-width: 0;
  padding: var(--espaco-5) var(--espaco-4);
  border: var(--borda);
  border-radius: var(--raio-md);
  background: var(--cor-superficie);
}

.pratica:first-child {
  grid-column: 1 / -1;
}

.pratica h3 {
  font-size: var(--titulo-sm);
}

.pratica ul {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding-left: var(--espaco-5);
}

.pratica p,
.pratica li {
  color: var(--cor-tinta-suave);
}

.vitais {
  display: grid;
  gap: var(--espaco-4);
}

.vitais__titulo {
  font-size: var(--titulo-md);
}

.vitais__lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  gap: var(--espaco-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.vital {
  display: grid;
  align-content: start;
  gap: var(--espaco-2);
  padding: var(--espaco-5) var(--espaco-4);
  border-radius: var(--raio-md);
  background: var(--cor-roxo-800);
  color: var(--cor-roxo-100);
}

.vital__sigla {
  font-family: var(--fonte-titulo);
  font-size: var(--titulo-lg);
  font-weight: 700;
  line-height: 1;
  color: #fff;
}

.vital__nome {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  color: var(--cor-roxo-200);
}

.vital__mede {
  font-size: var(--texto-sm);
}

.vital__meta {
  justify-self: start;
  margin-top: var(--espaco-2);
  padding: var(--espaco-1) var(--espaco-3);
  border-radius: 2rem;
  background: var(--cor-ambar);
  color: var(--cor-roxo-950);
  font-size: var(--texto-sm);
  font-weight: 600;
}

@media (min-width: 64rem) {
  .pratica:first-child {
    grid-column: auto;
    grid-row: span 3;
  }
}
</style>
