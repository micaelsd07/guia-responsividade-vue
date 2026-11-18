<script setup>
import PaginaSecao from '@/components/guia/PaginaSecao.vue'
import BlocoSecao from '@/components/guia/BlocoSecao.vue'
import CodigoExemplo from '@/components/guia/CodigoExemplo.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import MolduraLab from '@/components/guia/MolduraLab.vue'
import LabSimuladorLeitura from '@/components/labs/LabSimuladorLeitura.vue'
import { exemploUnidadesCss } from '@/data/exemplos'

const unidades = [
  {
    nome: 'px',
    tipo: 'absoluta',
    relativa: 'Nada: é um pixel CSS fixo.',
    uso: 'Bordas finas, sombras e detalhes que não precisam crescer. Evite em fontes.',
  },
  {
    nome: 'rem',
    tipo: 'relativa',
    relativa: 'Tamanho da fonte do elemento raiz, o <html>.',
    uso: 'Fontes, espaçamentos, larguras máximas. A escolha padrão para quase tudo.',
  },
  {
    nome: 'em',
    tipo: 'relativa',
    relativa: 'Tamanho da fonte do próprio elemento (do pai, se usado no font-size).',
    uso: 'Padding de botões e ícones que acompanham o texto. Cuidado: acumula em elementos aninhados.',
  },
  {
    nome: '%',
    tipo: 'relativa',
    relativa: 'O tamanho do elemento pai.',
    uso: 'Larguras fluidas, como width: 50% ou max-width: 100%.',
  },
  {
    nome: 'fr',
    tipo: 'relativa',
    relativa: 'Uma fração do espaço livre de um grid.',
    uso: 'Colunas de grid: 1fr 1fr divide igualmente; 2fr 1fr dá o dobro à primeira.',
  },
  {
    nome: 'vw',
    tipo: 'relativa',
    relativa: '1% da largura da viewport (a janela).',
    uso: 'Títulos que crescem com a tela, de preferência dentro de clamp(). Atenção: 100vw inclui a barra de rolagem e pode gerar rolagem horizontal.',
  },
  {
    nome: 'vh',
    tipo: 'relativa',
    relativa: '1% da altura da viewport.',
    uso: 'Seções altas no desktop. No celular, 100vh pode ficar maior que a área visível por causa da barra do navegador.',
  },
  {
    nome: 'dvh',
    tipo: 'relativa',
    relativa: '1% da altura dinâmica: muda quando a barra do navegador aparece ou some.',
    uso: 'Telas cheias no celular: min-height: 100dvh.',
  },
  {
    nome: 'ch',
    tipo: 'relativa',
    relativa: 'A largura do caractere "0" na fonte atual.',
    uso: 'Limitar o comprimento da linha de leitura (max-width: 65ch) e campos de tamanho fixo, como CEP.',
  },
]

const fontes = [
  {
    titulo: 'CSS values and units',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units',
  },
  {
    titulo: '<length> (inclui vh, dvh e ch)',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length',
  },
  {
    titulo: 'Learn CSS: Sizing units',
    autor: 'web.dev (Google)',
    url: 'https://web.dev/learn/css/sizing',
  },
  {
    titulo: 'Understanding Success Criterion 1.4.4: Resize Text',
    autor: 'W3C · WCAG 2.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html',
  },
  {
    titulo: 'The Surprising Truth About Pixels and Accessibility',
    autor: 'Josh W. Comeau',
    url: 'https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/',
  },
]
</script>

<template>
  <PaginaSecao
    nome="unidades"
    resumo="Cada unidade CSS responde a uma pergunta diferente: relativa a quê? Escolher bem é o que separa um layout que se adapta de um que quebra, ou que ignora quem precisa de letras maiores."
  >
    <BlocoSecao id="explicacao" rotulo="Explicação" titulo="Absolutas e relativas">
      <div class="texto">
        <p>
          Uma unidade <strong>absoluta</strong> tem sempre o mesmo tamanho: <code>16px</code> são
          16px em qualquer contexto. Uma unidade <strong>relativa</strong> é calculada a partir de
          outra coisa: a fonte da raiz, o elemento pai, o tamanho da janela...
        </p>
        <p>
          Em layouts responsivos, as relativas são as protagonistas, porque acompanham a tela e as
          preferências de quem está lendo. Neste guia, por exemplo, todas as fontes e
          espaçamentos estão em <code>rem</code>.
        </p>
      </div>

      <dl class="unidades">
        <div v-for="unidade in unidades" :key="unidade.nome" class="unidade">
          <dt class="unidade__nome">
            <code>{{ unidade.nome }}</code>
            <span class="unidade__tipo" :class="`unidade__tipo--${unidade.tipo}`">{{ unidade.tipo }}</span>
          </dt>
          <dd class="unidade__relativa">
            <span>Relativa a</span>
            {{ unidade.relativa }}
          </dd>
          <dd class="unidade__uso">
            <span>Quando usar</span>
            {{ unidade.uso }}
          </dd>
        </div>
      </dl>
    </BlocoSecao>

    <BlocoSecao id="codigo" rotulo="Exemplo de código" titulo="Cada unidade no seu lugar">
      <CodigoExemplo arquivo="unidades.css" linguagem="css" :codigo="exemploUnidadesCss" />
    </BlocoSecao>

    <MolduraLab
      numero="1"
      titulo="Simulador de leitura"
      descricao="Dois anúncios idênticos: o Cartão A tem todos os tamanhos escritos em px; o Cartão B usa os mesmos valores em rem. Aumente a fonte do navegador e veja qual deles respeita a preferência de quem lê."
    >
      <LabSimuladorLeitura />
    </MolduraLab>

    <PerguntaGuia
      numero="2"
      pergunta="Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?"
    >
      <p>
        <code>px</code> é uma <strong>unidade absoluta</strong>: 16px são sempre 16px, não
        importa o que o usuário configurou. Quando alguém aumenta a fonte nas configurações, o
        navegador muda o tamanho de fonte padrão do elemento raiz, o <code>&lt;html&gt;</code>
        (de 16px para 20px ou 24px, por exemplo). Um texto com <code>font-size: 16px</code>
        <strong>ignora essa configuração de acessibilidade</strong>.
      </p>
      <p>
        <code>rem</code> significa <em>root em</em>: <strong>1rem é igual ao tamanho da fonte do
        elemento raiz</strong>. Se a raiz passa de 16px para 24px, 1rem passa a valer 24px, e
        tudo o que foi escrito em rem (fontes, espaçamentos, larguras) cresce na mesma
        proporção, mantendo o layout harmônico.
      </p>
      <p>
        Por isso, rem não é só uma preferência de estilo: é o que permite que uma pessoa com baixa
        visão leia o site com letras maiores. Vale notar que o zoom da página (Ctrl +) amplia
        até o px; a diferença aparece justamente na configuração de fonte, que muita gente usa
        de forma permanente no celular e no computador.
      </p>
    </PerguntaGuia>

    <FontesConsultadas :fontes="fontes" />
  </PaginaSecao>
</template>

<style scoped>
.unidades {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: var(--espaco-3);
  margin: 0;
}

.unidade {
  display: grid;
  align-content: start;
  gap: var(--espaco-3);
  padding: var(--espaco-4);
  border: var(--borda);
  border-radius: var(--raio-md);
  background: var(--cor-superficie);
}

.unidade__nome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
}

.unidade__nome code {
  padding: 0;
  background: none;
  font-size: var(--titulo-md);
  font-weight: 500;
  color: var(--cor-roxo-800);
}

.unidade__tipo {
  padding: 0 var(--espaco-2);
  border-radius: 1rem;
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.unidade__tipo--absoluta {
  background: var(--cor-erro-suave);
  color: var(--cor-erro);
}

.unidade__tipo--relativa {
  background: var(--cor-sucesso-suave);
  color: var(--cor-sucesso);
}

.unidade dd {
  display: grid;
  gap: var(--espaco-1);
  margin: 0;
  font-size: var(--texto-sm);
}

.unidade dd span {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--cor-roxo-600);
}

.unidade__uso {
  color: var(--cor-tinta-suave);
}
</style>
