<script setup>
import { ref } from 'vue'
import AberturaSecao from '@/components/guia/AberturaSecao.vue'
import CapituloGuia from '@/components/guia/CapituloGuia.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import PaginadorSecoes from '@/components/guia/PaginadorSecoes.vue'
import FiguraEditorial from '@/components/guia/FiguraEditorial.vue'
import LabImagens from '@/components/labs/LabImagens.vue'
import LabCls from '@/components/labs/LabCls.vue'
import { fotos } from '@/data/fotos'
import { fontes } from '@/data/fontes'
import { imagensHtml, imagensCss } from '@/data/exemplos'
import { usePageMotion } from '@/composables/useMotion'

const raiz = ref(null)
usePageMotion(raiz)

const ferramentas = [
  {
    codigo: 'max-width: 100%; height: auto;',
    titulo: 'Nunca maior que o contêiner',
    texto: 'A imagem encolhe com a coluna e mantém a proporção. É o que impede uma foto de 1600px de criar rolagem horizontal no celular.',
  },
  {
    codigo: 'width="1600" height="1067"',
    titulo: 'Dimensões no HTML',
    texto: 'Informam a proporção antes do download, e o navegador reserva o espaço certo. Com o CSS acima, a imagem continua fluida.',
  },
  {
    codigo: 'loading="lazy"',
    titulo: 'Baixar só quando precisar',
    texto: 'Adia imagens fora da tela. Não use na imagem principal do topo: ela costuma ser o LCP, e atrasá-la piora o carregamento.',
  },
  {
    codigo: 'aspect-ratio: 16 / 9;',
    titulo: 'Caixa com proporção',
    texto: 'Define a proporção de um elemento mesmo sem conteúdo. Útil para cards, vídeos incorporados e espaços reservados.',
  },
  {
    codigo: 'object-fit: cover;',
    titulo: 'Como a foto ocupa a caixa',
    texto: 'cover corta as sobras, contain mostra tudo com faixas, fill distorce. object-position escolhe o lado que fica.',
  },
  {
    codigo: 'srcset · sizes',
    titulo: 'O arquivo certo para cada tela',
    texto: 'Várias larguras do mesmo arquivo. O navegador escolhe a menor que atende à largura exibida e à densidade de pixels.',
  },
]
</script>

<template>
  <div ref="raiz">
    <AberturaSecao nome="imagens" />

    <CapituloGuia id="peso" indice="04.1" titulo="O peso das imagens">
      <div class="prose" data-reveal>
        <p>
          Em muitas páginas, as imagens somam a maior parte dos bytes baixados. Em um layout responsivo, elas têm três
          tarefas: <strong>caber</strong> em qualquer coluna, <strong>não pesar</strong> mais do que a tela precisa e
          <strong>não empurrar</strong> o conteúdo quando terminam de carregar.
        </p>
        <p>
          As fotos deste guia seguem as três: cada uma existe em 480, 960 e 1600px de largura (WebP), leva
          <code>width</code> e <code>height</code> e só é baixada perto da hora de aparecer.
        </p>
      </div>
      <FiguraEditorial
        :foto="fotos.notebookCelular"
        numero="04.1"
        legenda="Notebook e celular sobre a mesma mesa. A mesma foto precisa de um arquivo de ~1600px no notebook e de ~480px no celular."
        proporcao="16 / 9"
        sizes="(min-width: 80rem) 55vw, 100vw"
        parallax
      />
    </CapituloGuia>

    <CapituloGuia id="ferramentas" indice="04.2" titulo="Seis ferramentas">
      <ol class="ferramentas">
        <li v-for="(item, i) in ferramentas" :key="item.codigo" class="ferramenta" data-reveal>
          <span class="ferramenta__n">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="ferramenta__corpo">
            <code class="ferramenta__codigo">{{ item.codigo }}</code>
            <h3 class="ferramenta__titulo">{{ item.titulo }}</h3>
            <p>{{ item.texto }}</p>
          </div>
        </li>
      </ol>
      <CodigoEditor arquivo="galeria.html" linguagem="html" :codigo="imagensHtml" :destaque="[1, 6, 7]" data-reveal />
      <CodigoEditor arquivo="imagens.css" linguagem="css" :codigo="imagensCss" data-reveal />
    </CapituloGuia>

    <CapituloGuia id="lab-05-capitulo" indice="04.3" titulo="Deformada, cortada, adaptada, responsiva" largo>
      <LabImagens />
    </CapituloGuia>

    <CapituloGuia id="lab-06-capitulo" indice="04.4" titulo="Quando a foto empurra o texto" largo>
      <template #aside>
        <p>O laboratório usa o comportamento real do navegador: nenhuma das três versões tem altura fixa no CSS.</p>
      </template>
      <LabCls />
    </CapituloGuia>

    <PerguntaGuia
      id="pergunta-4"
      numero="04"
      pergunta="Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?"
    >
      <p>
        O HTML chega antes da imagem. Sem <code>width</code> e <code>height</code>, o navegador não tem como saber o
        tamanho dela, então <strong>não reserva o espaço da imagem antes de ela carregar</strong>: a imagem ocupa 0px
        de altura e o texto é desenhado logo abaixo.
      </p>
      <p>
        Quando o download termina, o navegador descobre as dimensões, abre o espaço e a imagem
        <strong>empurra o texto para baixo</strong>. Se a pessoa estava lendo ou prestes a tocar num botão, perde o
        lugar ou toca no lugar errado.
      </p>
      <p>
        Com <code>width</code> e <code>height</code> no HTML, o navegador calcula a proporção antes do download e já
        reserva a área certa, mesmo com <code>max-width: 100%</code> e <code>height: auto</code> mantendo a imagem
        fluida. <code>aspect-ratio</code> no CSS tem o mesmo efeito.
      </p>
      <p>
        A métrica do Core Web Vitals que mede essa instabilidade é o <strong>CLS (Cumulative Layout Shift)</strong>.
        Ela multiplica a fração da tela afetada pela distância percorrida. Um bom resultado é <strong>até 0,1</strong>.
      </p>
      <template #visual>
        <figure class="cls" data-assemble>
          <figcaption class="label cls__titulo">CLS em dois quadros</figcaption>
          <div class="cls__quadros">
            <div class="cls__quadro" data-piece>
              <span class="label">0,2 s · texto</span>
              <span class="cls__linha cls__linha--titulo"></span>
              <span class="cls__vazio">imagem: 0px</span>
              <span class="cls__texto"></span>
              <span class="cls__texto cls__texto--curto"></span>
            </div>
            <div class="cls__quadro" data-piece>
              <span class="label">1,5 s · foto chega</span>
              <span class="cls__linha cls__linha--titulo"></span>
              <span class="cls__foto"></span>
              <span class="cls__texto cls__texto--movido"></span>
              <span class="cls__texto cls__texto--curto cls__texto--movido"></span>
            </div>
          </div>
          <p class="cls__formula" data-piece>
            CLS = <span>fração de impacto</span> × <span>fração de distância</span>
          </p>
          <ol class="cls__faixas" data-piece>
            <li class="cls__faixa--bom"><strong>≤ 0,1</strong> bom</li>
            <li class="cls__faixa--medio"><strong>≤ 0,25</strong> precisa melhorar</li>
            <li class="cls__faixa--ruim"><strong>&gt; 0,25</strong> ruim</li>
          </ol>
        </figure>
      </template>
    </PerguntaGuia>

    <FontesConsultadas numero="04" :fontes="fontes.imagens" />
    <PaginadorSecoes nome="imagens" />
  </div>
</template>

<style scoped>
.ferramentas {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.ferramenta {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border-bottom: var(--border-soft);
}

.ferramenta__n {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  font-stretch: 75%;
  color: var(--color-accent);
}

.ferramenta__corpo {
  display: grid;
  gap: var(--space-1);
  color: var(--color-ink-2);
}

.ferramenta__codigo {
  justify-self: start;
  font-size: var(--text-xs);
}

.ferramenta__titulo {
  font-size: var(--text-lg);
  font-weight: 700;
  font-stretch: 82%;
  color: var(--color-ink);
}

.cls {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5);
  border: var(--hairline) solid var(--color-dark-line);
}

.cls__titulo {
  color: var(--color-signal);
}

.cls__quadros {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.cls__quadro {
  display: grid;
  align-content: start;
  gap: 0.5rem;
  height: 14rem;
  padding: var(--space-3);
  border: 0.375rem solid var(--color-dark-3);
  border-radius: 0.75rem;
  background: var(--color-dark-2);
  overflow: hidden;
}

.cls__quadro .label {
  color: var(--color-on-dark-2);
  font-size: var(--text-2xs);
}

.cls__linha--titulo {
  height: 0.875rem;
  width: 80%;
  background: var(--color-on-dark);
}

.cls__vazio {
  padding: 0.125rem 0.375rem;
  border: var(--hairline) dashed #ff8a70;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: #ff8a70;
}

.cls__foto {
  height: 5rem;
  background: var(--color-accent);
}

.cls__texto {
  height: 0.5rem;
  background: var(--color-on-dark-2);
}

.cls__texto--curto {
  width: 60%;
}

.cls__texto--movido {
  background: #ff8a70;
}

.cls__formula {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-on-dark);
}

.cls__formula span {
  color: var(--color-signal);
}

.cls__faixas {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--hairline);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-xs);
}

.cls__faixas li {
  display: grid;
  padding: var(--space-2);
  color: var(--color-ink);
}

.cls__faixas strong {
  font-family: var(--font-mono);
}

.cls__faixa--bom {
  background: #7fd8a6;
}

.cls__faixa--medio {
  background: #f5c76c;
}

.cls__faixa--ruim {
  background: #ff8a70;
}
</style>
