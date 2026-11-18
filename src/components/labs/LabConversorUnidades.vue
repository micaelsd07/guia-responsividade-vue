<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BancadaLab from '@/components/guia/BancadaLab.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import CampoSegmentado from '@/components/controles/CampoSegmentado.vue'
import CampoFaixa from '@/components/controles/CampoFaixa.vue'
import ViewportSimulado from '@/components/demos/ViewportSimulado.vue'

const padrao = {
  unidade: 'rem',
  propriedade: 'width',
  valor: 10,
  fonteRaiz: 16,
  fontePai: 20,
  conteiner: 600,
  viewportL: 1024,
  viewportA: 768,
}

const unidade = ref(padrao.unidade)
const propriedade = ref(padrao.propriedade)
const valor = ref(padrao.valor)
const fonteRaiz = ref(padrao.fonteRaiz)
const fontePai = ref(padrao.fontePai)
const conteiner = ref(padrao.conteiner)
const viewportL = ref(padrao.viewportL)
const viewportA = ref(padrao.viewportA)
const proporcaoCh = ref(0.55)

const faixas = {
  px: { min: 0, max: 600, passo: 1 },
  rem: { min: 0, max: 40, passo: 0.25 },
  em: { min: 0, max: 40, passo: 0.25 },
  '%': { min: 0, max: 100, passo: 1 },
  vw: { min: 0, max: 100, passo: 1 },
  vh: { min: 0, max: 100, passo: 1 },
  ch: { min: 0, max: 80, passo: 1 },
}

const opcoesUnidade = Object.keys(faixas).map((u) => ({ valor: u }))
const opcoesPropriedade = [
  { valor: 'width', rotulo: 'width' },
  { valor: 'font-size', rotulo: 'font-size' },
]

const faixa = computed(() => faixas[unidade.value])
const conteinerEfetivo = computed(() => Math.min(conteiner.value, viewportL.value - 32))

watch(unidade, (nova) => {
  const { min, max } = faixas[nova]
  if (valor.value > max || valor.value < min) valor.value = Math.round((max - min) / 4)
})

const fonteDoElemento = computed(() => (propriedade.value === 'width' ? fontePai.value : resultado.value.px))

const resultado = computed(() => {
  const v = valor.value
  const R = fonteRaiz.value
  const F = fontePai.value
  const C = conteinerEfetivo.value
  const chPx = proporcaoCh.value * F
  const fmt = (n) => +n.toFixed(2)
  const tabela = {
    px: { px: v, conta: `${v}px é absoluto: não depende de nada` },
    rem: { px: v * R, conta: `${v} × ${R}px (fonte do <html>)` },
    em:
      propriedade.value === 'width'
        ? { px: v * F, conta: `${v} × ${F}px (fonte do próprio elemento, herdada do pai)` }
        : { px: v * F, conta: `${v} × ${F}px (em no font-size usa a fonte do pai)` },
    '%':
      propriedade.value === 'width'
        ? { px: (v / 100) * C, conta: `${v}% × ${C}px (largura do contêiner pai)` }
        : { px: (v / 100) * F, conta: `${v}% × ${F}px (% no font-size usa a fonte do pai)` },
    vw: { px: (v / 100) * viewportL.value, conta: `${v}% × ${viewportL.value}px (largura da viewport)` },
    vh: { px: (v / 100) * viewportA.value, conta: `${v}% × ${viewportA.value}px (altura da viewport)` },
    ch: { px: v * chPx, conta: `${v} × ${fmt(chPx)}px (largura do "0" a ${F}px)` },
  }
  const r = tabela[unidade.value]
  return { px: fmt(r.px), conta: r.conta }
})

const vazou = computed(() => propriedade.value === 'width' && resultado.value.px > conteinerEfetivo.value)

const codigo = computed(
  () => `html {
  font-size: ${fonteRaiz.value}px; /* simula a preferência do navegador */
}

.pai {
  width: ${conteinerEfetivo.value}px;
  font-size: ${fontePai.value}px;
}

.elemento {
  ${propriedade.value}: ${valor.value}${unidade.value}; /* = ${resultado.value.px}px */
}`,
)

function resetar() {
  unidade.value = padrao.unidade
  propriedade.value = padrao.propriedade
  valor.value = padrao.valor
  fonteRaiz.value = padrao.fonteRaiz
  fontePai.value = padrao.fontePai
  conteiner.value = padrao.conteiner
  viewportL.value = padrao.viewportL
  viewportA.value = padrao.viewportA
}

onMounted(() => {
  const contexto = document.createElement('canvas').getContext('2d')
  if (!contexto) return
  contexto.font = '100px Inter, system-ui, sans-serif'
  const medida = contexto.measureText('0').width / 100
  if (medida > 0.3 && medida < 0.9) proporcaoCh.value = +medida.toFixed(3)
})
</script>

<template>
  <BancadaLab
    id="lab-01"
    numero="01"
    titulo="Conversor de unidades"
    resumo="Escolha uma unidade e um contexto (fonte da raiz, fonte do pai, contêiner, viewport). O laboratório calcula o valor em pixels como o navegador faria e mostra a conta."
    @reset="resetar"
  >
    <template #controles>
      <CampoSegmentado v-model="unidade" legenda="Unidade" :opcoes="opcoesUnidade" />
      <CampoSegmentado v-model="propriedade" legenda="Aplicar em" :opcoes="opcoesPropriedade" />
      <CampoFaixa v-model="valor" rotulo="Valor" :min="faixa.min" :max="faixa.max" :passo="faixa.passo" :unidade="unidade" com-numero />
      <CampoFaixa v-model="fonteRaiz" rotulo="Fonte do <html>" :min="10" :max="32" unidade="px" />
      <CampoFaixa v-model="fontePai" rotulo="Fonte do elemento pai" :min="10" :max="40" unidade="px" />
      <CampoFaixa v-model="conteiner" rotulo="Largura do contêiner pai" :min="160" :max="1200" :passo="10" unidade="px" />
      <CampoFaixa v-model="viewportL" rotulo="Largura da viewport" :min="320" :max="1920" :passo="10" unidade="px" />
      <CampoFaixa v-model="viewportA" rotulo="Altura da viewport" :min="480" :max="1200" :passo="10" unidade="px" />
    </template>

    <template #palco>
      <div class="conversor">
        <p class="conversor__resultado">
          <span class="conversor__entrada">{{ valor }}{{ unidade }}</span>
          <span class="conversor__seta" aria-hidden="true">→</span>
          <span class="conversor__saida">{{ resultado.px }}px</span>
        </p>
        <p class="conversor__conta"><code>{{ resultado.conta }} = {{ resultado.px }}px</code></p>

        <div class="conversor__janela">
          <p class="conversor__legenda label">Viewport simulada {{ viewportL }} × {{ viewportA }}</p>
          <ViewportSimulado :largura="viewportL" :altura="viewportA" :altura-maxima="340">
            <div class="cena" :style="{ fontSize: `${fonteRaiz}px` }">
              <div class="cena__pai" :style="{ width: `${conteinerEfetivo}px`, fontSize: `${fontePai}px` }">
                <span class="cena__rotulo">.pai · {{ conteinerEfetivo }}px · fonte {{ fontePai }}px</span>
                <div
                  v-if="propriedade === 'width'"
                  class="cena__barra"
                  :class="{ 'is-vazando': vazou }"
                  :style="{ width: `${resultado.px}px` }"
                >
                  {{ resultado.px }}px
                </div>
                <p v-else class="cena__texto" :style="{ fontSize: `${Math.min(resultado.px, 400)}px` }">Aa</p>
              </div>
            </div>
          </ViewportSimulado>
        </div>
      </div>
    </template>

    <template #narracao>
      <p v-if="unidade === 'px'">
        <strong>px é absoluto.</strong> Mude a fonte, o contêiner ou a viewport: o resultado não se move.
      </p>
      <p v-else-if="unidade === 'rem'">
        <strong>rem olha só para o &lt;html&gt;.</strong> Mexa na fonte do pai: nada muda. Mexa na fonte do
        &lt;html&gt;: tudo acompanha.
      </p>
      <p v-else-if="unidade === 'em'">
        <strong>em olha para a fonte do elemento.</strong> Com {{ propriedade }}, a referência é {{ fontePai }}px.
        Em componentes aninhados, o em multiplica de novo a cada nível.
      </p>
      <p v-else-if="unidade === '%'">
        <strong>% depende da propriedade.</strong>
        {{ propriedade === 'width' ? 'Em width, é a largura do pai.' : 'Em font-size, é a fonte do pai.' }}
      </p>
      <p v-else-if="unidade === 'vw' || unidade === 'vh'">
        <strong>{{ unidade }} ignora o pai</strong> e olha para a janela inteira: {{ unidade === 'vw' ? 'largura' : 'altura' }}
        de {{ unidade === 'vw' ? viewportL : viewportA }}px.
      </p>
      <p v-else>
        <strong>ch é a largura do caractere "0".</strong> Nesta fonte, 1ch ≈ {{ (proporcaoCh * fonteDoElemento).toFixed(1) }}px.
      </p>
      <p v-if="vazou" class="conversor__alerta">
        A barra ficou maior que o contêiner ({{ resultado.px }}px &gt; {{ conteinerEfetivo }}px): em um site de
        verdade, isso vazaria e poderia criar rolagem horizontal.
      </p>
    </template>

    <template #codigo>
      <CodigoEditor arquivo="conversor.css" linguagem="css" :codigo="codigo" :destaque="[11]" />
    </template>
  </BancadaLab>
</template>

<style scoped>
.conversor {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}

.conversor__resultado {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2) var(--space-3);
  font-family: var(--font-heading);
  font-size: var(--heading-lg);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.conversor__entrada {
  color: var(--color-ink-3);
}

.conversor__seta {
  font-family: var(--font-mono);
  font-size: 0.5em;
  color: var(--color-ink-3);
}

.conversor__saida {
  color: var(--color-accent);
}

.conversor__conta code {
  font-size: var(--text-sm);
}

.conversor__janela {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.conversor__legenda {
  color: var(--color-ink-3);
}

.conversor__janela :deep(.simulado__area) {
  border: var(--border-strong);
}

.cena {
  height: 100%;
  padding: 16px;
  background:
    linear-gradient(var(--color-rule) 1px, transparent 1px) 0 0 / 40px 40px,
    linear-gradient(90deg, var(--color-rule) 1px, transparent 1px) 0 0 / 40px 40px,
    #fff;
}

.cena__pai {
  display: grid;
  gap: 12px;
  padding: 12px 0;
  border: 2px dashed var(--color-ink-3);
  background: rgb(91 43 224 / 0.04);
}

.cena__rotulo {
  padding: 0 12px;
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-ink-3);
}

.cena__barra {
  min-height: 56px;
  padding: 0 12px;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 22px;
  line-height: 56px;
  white-space: nowrap;
  transition: width var(--duration-base) var(--ease-out);
}

.cena__barra.is-vazando {
  background: var(--color-bad);
}

.cena__texto {
  padding: 0 12px;
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1;
  color: var(--color-accent);
}

.conversor__alerta {
  padding: var(--space-2) var(--space-3);
  background: var(--color-bad-soft);
  color: var(--color-bad);
}
</style>
