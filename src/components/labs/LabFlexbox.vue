<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import BancadaLab from '@/components/guia/BancadaLab.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import CampoSegmentado from '@/components/controles/CampoSegmentado.vue'
import CampoFaixa from '@/components/controles/CampoFaixa.vue'
import { useFlipEmMudancas } from '@/composables/useMotion'

const padrao = {
  direcao: 'row',
  justify: 'flex-start',
  align: 'stretch',
  wrap: 'nowrap',
  gap: 0.5,
  quantidade: 5,
  largura: 100,
}

const direcao = ref(padrao.direcao)
const justify = ref(padrao.justify)
const align = ref(padrao.align)
const wrap = ref(padrao.wrap)
const gap = ref(padrao.gap)
const quantidade = ref(padrao.quantidade)
const largura = ref(padrao.largura)
const caixa = ref(null)
const vazamento = ref(0)

const rotulos = ['Início', 'Produtos', 'Sobre nós', 'Contato', 'Blog', 'Carreiras', 'Ajuda', 'Entrar']
const alturas = [3, 4.5, 2.75, 3.75, 5, 3.25, 4.25, 2.5]
const itens = computed(() =>
  rotulos.slice(0, quantidade.value).map((rotulo, i) => ({ id: i, rotulo, altura: alturas[i] })),
)

const opcoes = {
  direcao: ['row', 'row-reverse', 'column', 'column-reverse'].map((valor) => ({ valor })),
  justify: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map((valor) => ({ valor })),
  align: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'].map((valor) => ({ valor })),
  wrap: ['nowrap', 'wrap'].map((valor) => ({ valor })),
}

const horizontal = computed(() => direcao.value.startsWith('row'))
const invertido = computed(() => direcao.value.endsWith('reverse'))

useFlipEmMudancas(caixa, [direcao, justify, align, wrap, quantidade])

function medirVazamento() {
  const el = caixa.value
  if (!el) return
  vazamento.value = Math.max(0, horizontal.value ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight)
}

let observador
onMounted(() => {
  observador = new ResizeObserver(medirVazamento)
  observador.observe(caixa.value)
  medirVazamento()
})
onBeforeUnmount(() => observador?.disconnect())

watch([direcao, justify, align, wrap, gap, quantidade, largura], () => nextTick(() => setTimeout(medirVazamento, 600)))

const narracao = computed(() => {
  const eixo = horizontal.value ? 'horizontal' : 'vertical'
  const sentido = horizontal.value
    ? invertido.value
      ? 'da direita para a esquerda'
      : 'da esquerda para a direita'
    : invertido.value
      ? 'de baixo para cima'
      : 'de cima para baixo'
  const cruzado = horizontal.value ? 'vertical' : 'horizontal'
  const explicacaoJustify = {
    'flex-start': 'junta os itens no início do eixo principal',
    center: 'centraliza os itens no eixo principal',
    'flex-end': 'empurra os itens para o fim do eixo principal',
    'space-between': 'cola o primeiro e o último nas bordas e divide o resto do espaço entre eles',
    'space-around': 'dá a cada item o mesmo espaço dos dois lados (as bordas ficam com metade)',
    'space-evenly': 'deixa todos os espaços iguais, inclusive nas bordas',
  }[justify.value]
  const explicacaoAlign = {
    stretch: 'estica os itens até ocupar a altura da linha',
    'flex-start': 'alinha os itens no início do eixo cruzado',
    center: 'centraliza os itens no eixo cruzado',
    'flex-end': 'alinha os itens no fim do eixo cruzado',
    baseline: 'alinha os itens pela linha de base do texto',
  }[align.value]
  return { eixo, sentido, cruzado, explicacaoJustify, explicacaoAlign }
})

const codigo = computed(
  () => `.menu {
  display: flex;
  flex-direction: ${direcao.value};
  justify-content: ${justify.value};
  align-items: ${align.value};
  flex-wrap: ${wrap.value};
  gap: ${gap.value}rem;
}`,
)

const estados = { direcao, justify, align, wrap, gap, quantidade, largura }

function resetar() {
  Object.entries(padrao).forEach(([chave, valor]) => {
    estados[chave].value = valor
  })
}
</script>

<template>
  <BancadaLab
    id="lab-03"
    numero="03"
    titulo="Bancada Flexbox"
    resumo="Um menu com itens de tamanhos diferentes. Mude a direção e veja os eixos girarem; mude os alinhamentos e veja os itens se redistribuírem."
    @reset="resetar"
  >
    <template #controles>
      <CampoSegmentado v-model="direcao" legenda="flex-direction" :opcoes="opcoes.direcao" />
      <CampoSegmentado v-model="justify" legenda="justify-content" :opcoes="opcoes.justify" />
      <CampoSegmentado v-model="align" legenda="align-items" :opcoes="opcoes.align" />
      <CampoSegmentado v-model="wrap" legenda="flex-wrap" :opcoes="opcoes.wrap" />
      <CampoFaixa v-model="gap" rotulo="gap" :min="0" :max="3" :passo="0.25" unidade="rem" />
      <CampoFaixa v-model="quantidade" rotulo="Quantidade de itens" :min="2" :max="8" />
      <CampoFaixa v-model="largura" rotulo="Largura do contêiner" :min="30" :max="100" unidade="%" />
    </template>

    <template #palco>
      <div class="bancada">
        <div class="eixos" aria-hidden="true">
          <span class="eixo eixo--principal" :class="{ 'is-vertical': !horizontal, 'is-invertido': invertido }">
            eixo principal
          </span>
          <span class="eixo eixo--cruzado" :class="{ 'is-horizontal': !horizontal }">eixo cruzado</span>
        </div>
        <div class="trilho" :style="{ width: `${largura}%` }">
          <div
            ref="caixa"
            class="flex"
            :class="{ 'flex--coluna': !horizontal }"
            :style="{
              flexDirection: direcao,
              justifyContent: justify,
              alignItems: align,
              flexWrap: wrap,
              gap: `${gap}rem`,
            }"
          >
            <span
              v-for="item in itens"
              :key="item.id"
              class="flex__item"
              data-flip
              :data-flip-id="`flex-${item.id}`"
              :style="{ minHeight: `${item.altura}rem` }"
            >
              <span class="flex__n">{{ item.id + 1 }}</span>
              {{ item.rotulo }}
            </span>
          </div>
        </div>
        <p v-if="vazamento > 0" class="bancada__alerta">
          {{ vazamento }}px vazando do contêiner. Experimente <code>flex-wrap: wrap</code>.
        </p>
      </div>
    </template>

    <template #narracao>
      <p>
        Com <code>{{ direcao }}</code>, o <strong>eixo principal é {{ narracao.eixo }}</strong> e corre
        {{ narracao.sentido }}. O eixo cruzado fica {{ narracao.cruzado }}.
      </p>
      <p><code>justify-content: {{ justify }}</code> {{ narracao.explicacaoJustify }}.</p>
      <p><code>align-items: {{ align }}</code> {{ narracao.explicacaoAlign }}.</p>
      <p v-if="wrap === 'nowrap' && vazamento > 0">
        Sem <code>flex-wrap</code>, os itens tentam caber em uma única linha. Quando não conseguem encolher mais,
        vazam.
      </p>
    </template>

    <template #codigo>
      <CodigoEditor arquivo="menu.css" linguagem="css" :codigo="codigo" :destaque="[3, 4, 5, 6]" />
    </template>
  </BancadaLab>
</template>

<style scoped>
.bancada {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.eixos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
}

.eixo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.eixo::before {
  content: '';
  width: 2.5rem;
  height: 0.125rem;
  background: currentColor;
}

.eixo::after {
  content: '▶';
  margin-left: -0.625rem;
  font-size: 0.5rem;
}

.eixo--principal {
  color: var(--color-accent);
}

.eixo--principal.is-invertido::after {
  content: '◀';
  order: -1;
  margin: 0 -0.625rem 0 0;
}

.eixo--principal.is-vertical::before {
  width: 0.125rem;
  height: 1.5rem;
}

.eixo--principal.is-vertical::after {
  content: '▼';
  margin-left: -0.5rem;
}

.eixo--principal.is-vertical.is-invertido::after {
  content: '▲';
}

.eixo--cruzado {
  color: var(--color-ink-3);
}

.eixo--cruzado:not(.is-horizontal)::before {
  width: 0.125rem;
  height: 1.5rem;
}

.eixo--cruzado:not(.is-horizontal)::after {
  content: '▼';
  margin-left: -0.5rem;
}

.trilho {
  min-width: 0;
  max-width: 100%;
  transition: width var(--duration-base) var(--ease-out);
}

.flex {
  display: flex;
  min-height: 14rem;
  padding: var(--space-2);
  border: 0.125rem dashed var(--color-accent);
  background: rgb(91 43 224 / 0.05);
  overflow: hidden;
}

.flex--coluna {
  height: 26rem;
}

.flex__item {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: var(--border-strong);
  background: var(--color-surface);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  box-shadow: var(--shadow-hard-sm);
}

.flex__item:nth-child(3n + 2) {
  background: var(--color-signal);
}

.flex__item:nth-child(3n) {
  background: var(--color-accent-soft);
  font-size: var(--text-lg);
}

.flex__n {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  font-weight: 400;
  color: var(--color-ink-3);
}

.bancada__alerta {
  padding: var(--space-2) var(--space-3);
  background: var(--color-bad-soft);
  color: var(--color-bad);
  font-size: var(--text-sm);
}
</style>
