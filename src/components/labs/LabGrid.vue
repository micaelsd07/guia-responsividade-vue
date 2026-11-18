<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import BancadaLab from '@/components/guia/BancadaLab.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import CampoSegmentado from '@/components/controles/CampoSegmentado.vue'
import CampoFaixa from '@/components/controles/CampoFaixa.vue'
import { useFlipEmMudancas } from '@/composables/useMotion'

const padrao = { modo: 'auto-fit', colunas: 3, minimo: 14, gap: 1, cards: 6, largura: 100 }

const modo = ref(padrao.modo)
const colunas = ref(padrao.colunas)
const minimo = ref(padrao.minimo)
const gap = ref(padrao.gap)
const cards = ref(padrao.cards)
const largura = ref(padrao.largura)
const estados = { modo, colunas, minimo, gap, cards, largura }

const grade = ref(null)
const larguraGrade = ref(0)
const remPx = ref(16)
const trilhas = ref([])

const metricas = [
  { rotulo: 'Usuários ativos', valor: '12.480' },
  { rotulo: 'Receita mensal', valor: 'R$ 94 mil' },
  { rotulo: 'LCP mediano', valor: '1,9 s' },
  { rotulo: 'Chamados', valor: '37' },
  { rotulo: 'Conversão', valor: '4,6%' },
  { rotulo: 'CLS', valor: '0,04' },
  { rotulo: 'INP', valor: '120 ms' },
  { rotulo: 'Sessões', valor: '58 mil' },
  { rotulo: 'Retenção', valor: '71%' },
]

const opcoesModo = [
  { valor: 'fixo', rotulo: 'repeat(N, 1fr)' },
  { valor: 'auto-fit', rotulo: 'auto-fit' },
  { valor: 'auto-fill', rotulo: 'auto-fill' },
]

const template = computed(() =>
  modo.value === 'fixo'
    ? `repeat(${colunas.value}, 1fr)`
    : `repeat(${modo.value}, minmax(min(${minimo.value}rem, 100%), 1fr))`,
)

const templateCodigo = computed(() =>
  modo.value === 'fixo' ? `repeat(${colunas.value}, 1fr)` : `repeat(${modo.value}, minmax(${minimo.value}rem, 1fr))`,
)

const visiveis = computed(() => trilhas.value.filter((t) => t.largura > 0.5).length)
const colapsadas = computed(() => trilhas.value.filter((t) => t.largura <= 0.5).length)
const vazias = computed(() => Math.max(0, visiveis.value - Math.min(cards.value, visiveis.value)))

function larguraPara(n) {
  const rem = n * minimo.value + (n - 1) * gap.value
  return { rem: +rem.toFixed(2), px: Math.round(rem * remPx.value) }
}

const proxima = computed(() => {
  if (modo.value === 'fixo') return null
  const atuais = Math.max(1, Math.floor((larguraGrade.value / remPx.value + gap.value) / (minimo.value + gap.value)))
  return { n: atuais + 1, ...larguraPara(atuais + 1) }
})

useFlipEmMudancas(grade, [modo, colunas, cards])

function medir() {
  const el = grade.value
  if (!el) return
  remPx.value = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  larguraGrade.value = el.clientWidth
  const estilo = getComputedStyle(el)
  const gapPx = parseFloat(estilo.columnGap) || 0
  let x = 0
  trilhas.value = estilo.gridTemplateColumns
    .split(' ')
    .map((valor) => parseFloat(valor))
    .filter((valor) => Number.isFinite(valor))
    .map((larguraTrilha, i, todas) => {
      const trilha = { i, x, largura: larguraTrilha }
      x += larguraTrilha + (i < todas.length - 1 && larguraTrilha > 0.5 ? gapPx : 0)
      return trilha
    })
}

let observador
onMounted(() => {
  observador = new ResizeObserver(medir)
  observador.observe(grade.value)
  medir()
})
onBeforeUnmount(() => observador?.disconnect())

watch([modo, colunas, minimo, gap, cards, largura], () => nextTick(medir))

const codigo = computed(
  () => `.dashboard {
  display: grid;
  grid-template-columns: ${templateCodigo.value};
  gap: ${gap.value}rem;
}`,
)

function resetar() {
  Object.entries(padrao).forEach(([chave, valor]) => {
    estados[chave].value = valor
  })
}
</script>

<template>
  <BancadaLab
    id="lab-04"
    numero="04"
    titulo="Construtor de Grid"
    resumo="Um dashboard de métricas. Compare colunas fixas, auto-fit e auto-fill; as trilhas que o navegador criou aparecem tracejadas, inclusive as vazias."
    @reset="resetar"
  >
    <template #controles>
      <CampoSegmentado v-model="modo" legenda="Modo das colunas" :opcoes="opcoesModo" />
      <CampoFaixa v-if="modo === 'fixo'" v-model="colunas" rotulo="Quantidade de colunas (N)" :min="1" :max="6" />
      <CampoFaixa v-else v-model="minimo" rotulo="Largura mínima · minmax()" :min="6" :max="24" :passo="0.5" unidade="rem" com-numero />
      <CampoFaixa v-model="gap" rotulo="gap" :min="0" :max="3" :passo="0.25" unidade="rem" com-numero />
      <CampoFaixa v-model="cards" rotulo="Quantidade de cards" :min="2" :max="9" />
      <CampoFaixa v-model="largura" rotulo="Largura do contêiner" :min="25" :max="100" unidade="%" />
    </template>

    <template #palco>
      <div class="construtor">
        <dl class="painel">
          <div>
            <dt class="label">Contêiner</dt>
            <dd>{{ Math.round(larguraGrade) }}px</dd>
          </div>
          <div>
            <dt class="label">Colunas</dt>
            <dd>{{ visiveis }}</dd>
          </div>
          <div>
            <dt class="label">{{ modo === 'fixo' ? 'Cada coluna' : 'Próxima coluna' }}</dt>
            <dd v-if="modo === 'fixo'">{{ Math.round(trilhas[0]?.largura ?? 0) }}px</dd>
            <dd v-else>a partir de {{ proxima.px }}px</dd>
          </div>
        </dl>

        <div class="trilho" :style="{ width: `${largura}%` }">
          <div class="area">
            <div class="guias" aria-hidden="true">
              <span
                v-for="trilha in trilhas"
                :key="trilha.i"
                class="guia"
                :class="{ 'guia--vazia': trilha.i >= cards && trilha.largura > 0.5 }"
                :style="{ left: `${trilha.x}px`, width: `${trilha.largura}px` }"
              >
                <span v-if="trilha.largura > 40" class="guia__rotulo">{{ Math.round(trilha.largura) }}</span>
              </span>
            </div>
            <div ref="grade" class="dashboard" :style="{ gridTemplateColumns: template, gap: `${gap}rem` }">
              <article v-for="(metrica, i) in metricas.slice(0, cards)" :key="metrica.rotulo" class="metrica" data-flip>
                <span class="metrica__n">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="metrica__rotulo">{{ metrica.rotulo }}</span>
                <span class="metrica__valor">{{ metrica.valor }}</span>
              </article>
            </div>
          </div>
        </div>
        <p v-if="proxima" class="conta">
          {{ proxima.n }} × {{ minimo }}rem + {{ proxima.n - 1 }} × {{ gap }}rem = {{ proxima.rem }}rem ×
          {{ remPx }}px = <strong>{{ proxima.px }}px</strong>
        </p>
      </div>
    </template>

    <template #narracao>
      <p v-if="modo === 'fixo'">
        <strong>Colunas fixas:</strong> sempre {{ colunas }}, não importa a largura. Diminua o contêiner e veja as
        colunas ficarem estreitas demais. É por isso que repeat(N, 1fr) costuma precisar de media queries.
      </p>
      <p v-else>
        O navegador cabe quantas trilhas de {{ minimo }}rem (+ gap) couberem: agora são
        <strong>{{ visiveis }} {{ visiveis === 1 ? 'coluna' : 'colunas' }}</strong>. Ele soma uma coluna quando o
        contêiner chega a {{ proxima.px }}px.
      </p>
      <p v-if="modo === 'auto-fill' && vazias > 0">
        <strong>auto-fill</strong> mantém {{ vazias }} {{ vazias === 1 ? 'trilha vazia' : 'trilhas vazias' }}
        (tracejado laranja): os cards não se esticam para ocupá-las.
      </p>
      <p v-if="modo === 'auto-fit' && colapsadas > 0">
        <strong>auto-fit</strong> colapsou {{ colapsadas }} {{ colapsadas === 1 ? 'trilha vazia' : 'trilhas vazias' }}
        para 0px, e os cards se esticaram para ocupar a linha toda.
      </p>
    </template>

    <template #codigo>
      <CodigoEditor arquivo="dashboard.css" linguagem="css" :codigo="codigo" :destaque="[3, 4]" />
    </template>
  </BancadaLab>
</template>

<style scoped>
.construtor {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}

.painel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: var(--border-strong);
  background: var(--color-surface);
}

.painel div {
  display: grid;
  gap: 0.125rem;
  padding: var(--space-2) var(--space-3);
}

.painel div + div {
  border-left: var(--border-soft);
}

.painel dt {
  color: var(--color-ink-3);
  font-size: var(--text-2xs);
}

.painel dd {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  font-stretch: 80%;
  line-height: 1.1;
}

.trilho {
  min-width: 0;
  max-width: 100%;
  transition: width var(--duration-base) var(--ease-out);
}

.area {
  position: relative;
  padding: var(--space-2);
  border: 0.125rem solid var(--color-ink);
  background: var(--color-surface);
}

.guias {
  position: absolute;
  inset: var(--space-2);
  pointer-events: none;
}

.guia {
  position: absolute;
  top: 0;
  bottom: 0;
  border: 0.0625rem dashed var(--color-accent);
  background: rgb(91 43 224 / 0.05);
  transition:
    left var(--duration-base) var(--ease-out),
    width var(--duration-base) var(--ease-out);
}

.guia--vazia {
  border-color: #d9690f;
  background: repeating-linear-gradient(-45deg, rgb(217 105 15 / 0.12) 0 0.375rem, transparent 0.375rem 0.75rem);
}

.guia__rotulo {
  position: absolute;
  bottom: 0.125rem;
  right: 0.25rem;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-accent);
}

.dashboard {
  position: relative;
  display: grid;
}

.metrica {
  display: grid;
  gap: 0.125rem;
  min-width: 0;
  min-height: 5.5rem;
  padding: var(--space-3);
  border: var(--border-strong);
  border-top: 0.25rem solid var(--color-accent);
  background: #fff;
}

.metrica__n {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}

.metrica__rotulo {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
  overflow-wrap: anywhere;
}

.metrica__valor {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  font-stretch: 78%;
  overflow-wrap: anywhere;
}

.conta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-2);
}
</style>
