<script setup>
import { ref } from 'vue'
import AberturaSecao from '@/components/guia/AberturaSecao.vue'
import CapituloGuia from '@/components/guia/CapituloGuia.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import PaginadorSecoes from '@/components/guia/PaginadorSecoes.vue'
import FiguraEditorial from '@/components/guia/FiguraEditorial.vue'
import TabelaUnidades from '@/components/demos/TabelaUnidades.vue'
import LabConversorUnidades from '@/components/labs/LabConversorUnidades.vue'
import LabSimuladorLeitura from '@/components/labs/LabSimuladorLeitura.vue'
import { fotos } from '@/data/fotos'
import { fontes } from '@/data/fontes'
import { unidadesCss } from '@/data/exemplos'
import { usePageMotion } from '@/composables/useMotion'

const raiz = ref(null)
usePageMotion(raiz)

const regras = [
  { caso: 'Tamanho de texto', unidade: 'rem', porque: 'acompanha a fonte escolhida pela pessoa' },
  { caso: 'Margens e espaçamentos', unidade: 'rem', porque: 'o espaço cresce junto com o texto' },
  { caso: 'Padding de botão', unidade: 'em', porque: 'o botão maior ganha respiro proporcional' },
  { caso: 'Largura de colunas', unidade: '% · fr', porque: 'dividem o espaço que existe' },
  { caso: 'Linha de leitura', unidade: 'ch', porque: '45 a 75 caracteres por linha é o conforto' },
  { caso: 'Tela cheia no celular', unidade: 'dvh', porque: 'desconta a barra do navegador' },
  { caso: 'Título que cresce com a tela', unidade: 'clamp(rem, vw, rem)', porque: 'fluido, mas com limites' },
  { caso: 'Borda de 1 pixel', unidade: 'px', porque: 'detalhe que não precisa crescer' },
]
</script>

<template>
  <div ref="raiz">
    <AberturaSecao nome="unidades" />

    <CapituloGuia id="absolutas-relativas" indice="02.1" titulo="Absolutas e relativas">
      <div class="prose" data-reveal>
        <p>
          Uma unidade <strong>absoluta</strong> tem sempre o mesmo tamanho: <code>16px</code> são 16px em qualquer
          contexto. Uma unidade <strong>relativa</strong> é calculada a partir de outra coisa: a fonte da raiz, a
          fonte do elemento, o tamanho do pai, o tamanho da janela.
        </p>
        <p>
          Em um layout responsivo, as relativas são as protagonistas porque acompanham a tela e as preferências de
          quem lê. A pergunta certa nunca é "quantos pixels?", e sim <strong>"relativo a quê?"</strong>.
        </p>
      </div>
      <FiguraEditorial
        :foto="fotos.lupaOculos"
        numero="02.1"
        legenda="Lupa e óculos sobre um livro. Muita gente lê a web com a fonte aumentada nas configurações, e o CSS precisa respeitar essa escolha."
        proporcao="21 / 9"
        posicao="50% 40%"
        sizes="(min-width: 80rem) 55vw, 100vw"
      />
    </CapituloGuia>

    <CapituloGuia id="especimes" indice="02.2" titulo="Nove unidades, ao vivo" largo>
      <template #aside>
        <p>Cada barra abaixo usa a unidade de verdade, e o número ao lado é medido no seu navegador agora.</p>
      </template>
      <TabelaUnidades />
      <CodigoEditor arquivo="unidades.css" linguagem="css" :codigo="unidadesCss" data-reveal />
    </CapituloGuia>

    <CapituloGuia id="lab-01-capitulo" indice="02.3" titulo="Converter para entender" largo>
      <LabConversorUnidades />
    </CapituloGuia>

    <CapituloGuia id="lab-02-capitulo" indice="02.4" titulo="Quem decide o tamanho da letra?" largo>
      <template #aside>
        <p>Este laboratório responde, na prática, à Pergunta-guia 02.</p>
      </template>
      <LabSimuladorLeitura />
    </CapituloGuia>

    <CapituloGuia id="regras" indice="02.5" titulo="Regras de bolso">
      <ol class="regras">
        <li v-for="regra in regras" :key="regra.caso" class="regra" data-reveal>
          <span class="regra__caso">{{ regra.caso }}</span>
          <code class="regra__unidade">{{ regra.unidade }}</code>
          <span class="regra__porque">{{ regra.porque }}</span>
        </li>
      </ol>
    </CapituloGuia>

    <PerguntaGuia
      id="pergunta-2"
      numero="02"
      pergunta="Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?"
    >
      <p>
        <code>px</code> é uma <strong>unidade absoluta</strong>: 16px são sempre 16px. Quando alguém aumenta a fonte
        nas configurações, o navegador muda o tamanho de fonte padrão do elemento raiz, o <code>&lt;html&gt;</code>,
        de 16px para 20px ou 24px, por exemplo. Um texto com <code>font-size: 16px</code>
        <strong>ignora essa configuração de acessibilidade</strong>.
      </p>
      <p>
        <code>rem</code> significa <em>root em</em>: <strong>1rem é igual ao tamanho da fonte do elemento raiz</strong>.
        Se a raiz passa de 16px para 24px, 1rem passa a valer 24px, e tudo o que foi escrito em rem (fontes,
        espaçamentos, larguras) cresce na mesma proporção.
      </p>
      <p>
        Por isso rem não é só preferência de estilo: é o que permite que uma pessoa com baixa visão leia o site com
        letras maiores sem quebrar o layout (critério 1.4.4 das WCAG). O zoom da página (Ctrl +) amplia até o px; a
        diferença aparece na configuração de fonte, que muita gente usa de forma permanente.
      </p>
      <template #visual>
        <div class="balanca" data-assemble>
          <p class="label balanca__rotulo" data-piece>Fonte do navegador: 16px → 24px</p>
          <div class="balanca__linha" data-piece>
            <span class="balanca__nome">20px</span>
            <span class="balanca__barra balanca__barra--px" style="width: 40%"></span>
            <span class="balanca__antes">20px</span>
            <span class="balanca__depois">20px</span>
          </div>
          <div class="balanca__linha" data-piece>
            <span class="balanca__nome">1.25rem</span>
            <span class="balanca__barra balanca__barra--rem" style="width: 60%"></span>
            <span class="balanca__antes">20px</span>
            <span class="balanca__depois">30px</span>
          </div>
          <p class="balanca__nota" data-piece>1.25 × 24px = 30px. O px não sai do lugar.</p>
        </div>
      </template>
    </PerguntaGuia>

    <FontesConsultadas numero="02" :fontes="fontes.unidades" />
    <PaginadorSecoes nome="unidades" />
  </div>
</template>

<style scoped>
.regras {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.regra {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-1) var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: var(--border-soft);
}

.regra__caso {
  font-weight: 600;
}

.regra__unidade {
  justify-self: end;
}

.regra__porque {
  grid-column: 1 / -1;
  font-size: var(--text-sm);
  color: var(--color-ink-3);
}

.balanca {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-5);
  border: var(--hairline) solid var(--color-dark-line);
}

.balanca__rotulo {
  color: var(--color-signal);
}

.balanca__linha {
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr) auto auto;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.balanca__barra {
  height: 0.75rem;
}

.balanca__barra--px {
  background: #ff8a70;
}

.balanca__barra--rem {
  background: var(--color-signal);
}

.balanca__antes {
  color: var(--color-on-dark-2);
  text-decoration: line-through;
}

.balanca__depois {
  color: var(--color-on-dark);
  font-weight: 500;
}

.balanca__nota {
  font-size: var(--text-sm);
  color: var(--color-on-dark-2);
}

@media (min-width: 48rem) {
  .regra {
    grid-template-columns: 14rem 12rem minmax(0, 1fr);
    align-items: baseline;
  }

  .regra__unidade {
    justify-self: start;
  }

  .regra__porque {
    grid-column: auto;
  }
}
</style>
