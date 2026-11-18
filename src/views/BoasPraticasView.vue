<script setup>
import { ref } from 'vue'
import AberturaSecao from '@/components/guia/AberturaSecao.vue'
import CapituloGuia from '@/components/guia/CapituloGuia.vue'
import CodigoComparado from '@/components/guia/CodigoComparado.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import PaginadorSecoes from '@/components/guia/PaginadorSecoes.vue'
import FiguraEditorial from '@/components/guia/FiguraEditorial.vue'
import ArvorePastas from '@/components/demos/ArvorePastas.vue'
import TokensVivos from '@/components/demos/TokensVivos.vue'
import VitaisWeb from '@/components/demos/VitaisWeb.vue'
import LabBugDaLista from '@/components/labs/LabBugDaLista.vue'
import { fotos } from '@/data/fotos'
import { fontes } from '@/data/fontes'
import * as ex from '@/data/exemplos'
import { usePageMotion } from '@/composables/useMotion'

const raiz = ref(null)
usePageMotion(raiz)
</script>

<template>
  <div ref="raiz">
    <AberturaSecao nome="boas-praticas" />

    <CapituloGuia id="pastas" indice="05.1" titulo="Estrutura de pastas">
      <div class="prose" data-reveal>
        <p>
          Uma boa estrutura responde rápido à pergunta "onde eu mexo?". Separe por <strong>responsabilidade</strong>:
          o que é página (views), o que é peça reutilizável (components), o que é lógica compartilhada (composables) e o
          que é conteúdo (data).
        </p>
      </div>
      <FiguraEditorial
        :foto="fotos.codigoMonitor"
        numero="05.1"
        legenda="Código em vários monitores. Em projetos grandes, a organização das pastas decide quanto tempo se perde procurando arquivos."
        proporcao="21 / 9"
        sizes="(min-width: 80rem) 55vw, 100vw"
      />
      <ArvorePastas />
    </CapituloGuia>

    <CapituloGuia id="componentes" indice="05.2" titulo="Componentes e nomes">
      <div class="prose" data-reveal>
        <p>
          Componentes em <strong>PascalCase</strong> e com <strong>mais de uma palavra</strong> evitam conflito com
          elementos HTML atuais e futuros. Prefixos ajudam a ler a árvore: <code>The</code> para peças únicas,
          <code>View</code> para páginas, e um prefixo comum para famílias (<code>Lab…</code>, <code>Campo…</code>).
        </p>
      </div>
      <CodigoComparado
        :ruim="{ arquivo: 'card.vue', linguagem: 'vue', codigo: ex.componenteRuim }"
        :bom="{ arquivo: 'CartaoAnimal.vue', linguagem: 'vue', codigo: ex.componenteBom }"
        explicacao="O nome é a primeira documentação do componente. card não diz o que é e pode colidir com um elemento nativo; CartaoAnimal diz."
      />
    </CapituloGuia>

    <CapituloGuia id="props" indice="05.3" titulo="Props tipadas e eventos">
      <div class="prose" data-reveal>
        <p>
          Os dados <strong>descem</strong> por props e os avisos <strong>sobem</strong> por eventos. Declarar o tipo e
          a obrigatoriedade faz o Vue avisar no console quando alguém passa o dado errado. Um filho nunca altera uma
          prop: ele emite um evento e o dono do dado decide.
        </p>
      </div>
      <CodigoComparado
        :ruim="{ arquivo: 'CartaoAnimal.vue', linguagem: 'vue', codigo: ex.propsRuim }"
        :bom="{ arquivo: 'CartaoAnimal.vue', linguagem: 'vue', codigo: ex.propsBom }"
        explicacao="Alterar a prop cria um fluxo de dados escondido, difícil de depurar. Com defineEmits, toda mudança passa por um lugar visível."
      />
    </CapituloGuia>

    <CapituloGuia id="key" indice="05.4" titulo=":key no v-for" largo>
      <template #aside>
        <p>O Vue usa a :key para saber qual elemento do DOM pertence a qual item. Sem ela, só sobram as posições.</p>
      </template>
      <CodigoComparado
        :ruim="{ arquivo: 'ListaAnimais.vue', linguagem: 'vue', codigo: ex.keyRuim }"
        :bom="{ arquivo: 'ListaAnimais.vue', linguagem: 'vue', codigo: ex.keyBom }"
        explicacao="O índice muda quando a lista muda (remover o primeiro item muda o índice de todos). O id é a identidade do item."
      />
      <LabBugDaLista />
    </CapituloGuia>

    <CapituloGuia id="tokens" indice="05.5" titulo="Variáveis CSS como design tokens">
      <div class="prose" data-reveal>
        <p>
          <strong>Design tokens</strong> são as decisões de design com nome: cores, espaçamentos, tipografia, raios,
          sombras. Guardados como variáveis CSS no <code>:root</code>, viram uma fonte única: mudou o token, mudou o
          site inteiro, sem caçar valores soltos.
        </p>
      </div>
      <TokensVivos />
      <CodigoComparado
        :ruim="{ arquivo: 'botao.css', linguagem: 'css', codigo: ex.tokensRuim }"
        :bom="{ arquivo: 'main.css', linguagem: 'css', codigo: ex.tokensBom }"
        explicacao="Valores repetidos à mão se desencontram com o tempo (#42239a vs #4323a0). Com tokens, a consistência é garantida pelo código."
      />
    </CapituloGuia>

    <CapituloGuia id="vitals" indice="05.6" titulo="Core Web Vitals" largo>
      <template #aside>
        <p>As três métricas que o Google usa para medir a experiência real das pessoas, com os limites oficiais do web.dev.</p>
      </template>
      <VitaisWeb />
    </CapituloGuia>

    <CapituloGuia id="rotas" indice="05.7" titulo="Rotas sob demanda">
      <div class="prose" data-reveal>
        <p>
          Com <code>component: () =&gt; import(...)</code>, cada página vira um arquivo JavaScript separado no build
          e só é baixada quando alguém visita a rota. A primeira tela carrega menos código, o que ajuda o LCP e o INP.
          Este guia faz isso em todas as rotas.
        </p>
      </div>
      <CodigoComparado
        :ruim="{ arquivo: 'router/index.js', linguagem: 'js', codigo: ex.rotasRuim }"
        :bom="{ arquivo: 'router/index.js', linguagem: 'js', codigo: ex.rotasBom }"
        explicacao="Com import estático, quem abre só a capa baixa o código de todas as páginas. Com import dinâmico, cada um baixa o que vai usar."
      />
    </CapituloGuia>

    <PerguntaGuia
      id="pergunta-5"
      numero="05"
      pergunta="Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?"
    >
      <p>
        Por desempenho, o Vue <strong>tenta reaproveitar os elementos do DOM</strong> que já existem. Sem
        <code>:key</code>, ele não sabe qual elemento pertence a qual animal: só enxerga posições, e aplica a
        estratégia de "corrigir no lugar".
      </p>
      <p>
        Ao remover o 1º animal, a lista passa de <em>Capivara, Tamanduá, Arara-azul…</em> para <em>Tamanduá,
        Arara-azul…</em>. O Vue então <strong>atualiza apenas o texto dos nós existentes</strong>: escreve
        "Tamanduá" no 1º item, "Arara-azul" no 2º e assim por diante, e apaga o último item.
      </p>
      <p>
        O campo de texto não é tocado, porque o que foi digitado é <strong>estado local do DOM</strong>, guardado no
        próprio <code>&lt;input&gt;</code>, e não faz parte do estado reativo. Por isso o texto digitado para o
        Tamanduá <strong>fica no 2º item, que agora mostra a Arara-azul</strong>, e o Tamanduá aparece com o campo
        vazio. O texto vai parar no animal errado.
      </p>
      <p>
        Com <code>:key="animal.id"</code>, cada elemento fica amarrado a um animal. O Vue percebe que quem saiu foi a
        Capivara, remove exatamente aquele elemento e mantém o do Tamanduá intacto, com o texto dentro.
      </p>
      <template #visual>
        <figure class="trocas" data-assemble>
          <figcaption class="label trocas__titulo">Sem :key, por posição</figcaption>
          <div class="trocas__colunas">
            <ol class="trocas__lista">
              <li data-piece><span>1</span>Capivara</li>
              <li data-piece class="is-texto"><span>2</span>Tamanduá <em>"Tatá"</em></li>
              <li data-piece><span>3</span>Arara-azul</li>
            </ol>
            <span class="trocas__seta" aria-hidden="true">→</span>
            <ol class="trocas__lista">
              <li data-piece><span>1</span>Tamanduá</li>
              <li data-piece class="is-erro"><span>2</span>Arara-azul <em>"Tatá"</em></li>
              <li data-piece class="is-sumiu"><span>3</span>removido</li>
            </ol>
          </div>
          <p class="trocas__nota" data-piece>O &lt;li&gt; nº 2 nunca saiu do lugar. Só o nome dentro dele mudou.</p>
        </figure>
      </template>
    </PerguntaGuia>

    <FontesConsultadas numero="05" :fontes="fontes['boas-praticas']" />
    <PaginadorSecoes nome="boas-praticas" />
  </div>
</template>

<style scoped>
.trocas {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5);
  border: var(--hairline) solid var(--color-dark-line);
}

.trocas__titulo {
  color: var(--color-signal);
}

.trocas__colunas {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: var(--space-3);
}

.trocas__lista {
  display: grid;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-sm);
}

.trocas__lista li {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-2);
  background: var(--color-dark-2);
  color: var(--color-on-dark);
}

.trocas__lista span {
  font-family: var(--font-mono);
  color: var(--color-on-dark-2);
}

.trocas__lista em {
  color: var(--color-signal);
  font-style: normal;
}

.trocas__lista .is-erro {
  background: #ff8a70;
  color: var(--color-ink);
}

.trocas__lista .is-erro em,
.trocas__lista .is-erro span {
  color: var(--color-ink);
}

.trocas__lista .is-sumiu {
  border: var(--hairline) dashed var(--color-on-dark-2);
  background: transparent;
  color: var(--color-on-dark-2);
  text-decoration: line-through;
}

.trocas__seta {
  font-family: var(--font-mono);
  color: var(--color-signal);
}

.trocas__nota {
  font-size: var(--text-sm);
  color: var(--color-on-dark-2);
}
</style>
