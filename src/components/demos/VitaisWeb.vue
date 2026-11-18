<script setup>
const vitais = [
  {
    sigla: 'LCP',
    nome: 'Largest Contentful Paint',
    mede: 'Carregamento: quando o maior elemento visível (foto de capa, título) termina de aparecer.',
    bom: 2.5,
    ruim: 4,
    maximo: 6,
    unidade: 's',
    casas: 1,
    dica: 'Não use lazy na foto do topo; sirva o tamanho certo com srcset; divida o JavaScript por rota.',
  },
  {
    sigla: 'INP',
    nome: 'Interaction to Next Paint',
    mede: 'Interatividade: quanto a página demora para responder a um clique, toque ou tecla.',
    bom: 200,
    ruim: 500,
    maximo: 700,
    unidade: 'ms',
    casas: 0,
    dica: 'Evite tarefas longas no clique; anime com transform e opacity; carregue menos JavaScript.',
  },
  {
    sigla: 'CLS',
    nome: 'Cumulative Layout Shift',
    mede: 'Estabilidade visual: quanto o conteúdo pula enquanto a página carrega.',
    bom: 0.1,
    ruim: 0.25,
    maximo: 0.4,
    unidade: '',
    casas: 2,
    dica: 'width e height nas imagens; aspect-ratio em vídeos e anúncios; nada de inserir conteúdo acima do que já está na tela.',
  },
]

function porcentagem(valor, maximo) {
  return `${(valor / maximo) * 100}%`
}

function formatar(valor, casas) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })
}
</script>

<template>
  <ol class="vitais">
    <li v-for="vital in vitais" :key="vital.sigla" class="vital" data-assemble>
      <header class="vital__cabeca">
        <p class="vital__sigla" data-piece>{{ vital.sigla }}</p>
        <p class="label vital__nome">{{ vital.nome }}</p>
      </header>
      <p class="vital__mede">{{ vital.mede }}</p>
      <div class="medidor" data-piece role="img" :aria-label="`${vital.sigla}: bom até ${formatar(vital.bom, vital.casas)}${vital.unidade}, ruim acima de ${formatar(vital.ruim, vital.casas)}${vital.unidade}`">
        <span class="medidor__faixa medidor__faixa--bom" :style="{ width: porcentagem(vital.bom, vital.maximo) }"></span>
        <span class="medidor__faixa medidor__faixa--medio" :style="{ width: porcentagem(vital.ruim - vital.bom, vital.maximo) }"></span>
        <span class="medidor__faixa medidor__faixa--ruim"></span>
      </div>
      <p class="vital__limites">
        <span>bom até <strong><span :data-count="vital.bom" :data-decimals="vital.casas">{{ formatar(vital.bom, vital.casas) }}</span>{{ vital.unidade && ` ${vital.unidade}` }}</strong></span>
        <span>ruim acima de {{ formatar(vital.ruim, vital.casas) }}{{ vital.unidade && ` ${vital.unidade}` }}</span>
      </p>
      <p class="vital__dica"><span class="label">Como melhorar</span>{{ vital.dica }}</p>
    </li>
  </ol>
</template>

<style scoped>
.vitais {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr));
  gap: var(--space-5) var(--column-gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

.vital {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: var(--border-strong);
}

.vital__cabeca {
  display: grid;
  gap: var(--space-1);
}

.vital__sigla {
  font-family: var(--font-heading);
  font-size: var(--heading-lg);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.9;
}

.vital__nome {
  color: var(--color-ink-3);
}

.vital__mede {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.medidor {
  display: flex;
  height: 0.75rem;
  border: var(--border-strong);
}

.medidor__faixa--bom {
  background: #7fd8a6;
}

.medidor__faixa--medio {
  background: #f5c76c;
}

.medidor__faixa--ruim {
  flex: 1;
  background: #ff8a70;
}

.vital__limites {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.vital__limites strong {
  color: var(--color-ok);
}

.vital__dica {
  display: grid;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.vital__dica .label {
  color: var(--color-accent);
}
</style>
