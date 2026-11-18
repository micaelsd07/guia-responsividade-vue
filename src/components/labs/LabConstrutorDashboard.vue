<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const minimoCartao = ref(14)
const espacamento = ref(1)
const larguraPalco = ref(100)
const larguraGrid = ref(0)
const remEmPx = ref(16)
const gridRef = ref(null)

const metricas = [
  { rotulo: 'Usuários ativos', valor: '12.480', variacao: '+8,2%', positiva: true },
  { rotulo: 'Receita mensal', valor: 'R$ 94 mil', variacao: '+3,1%', positiva: true },
  { rotulo: 'Tempo de carga (LCP)', valor: '1,9 s', variacao: '-0,4 s', positiva: true },
  { rotulo: 'Chamados abertos', valor: '37', variacao: '+5', positiva: false },
  { rotulo: 'Taxa de conversão', valor: '4,6%', variacao: '+0,3 p.p.', positiva: true },
  { rotulo: 'Estabilidade (CLS)', valor: '0,04', variacao: 'Bom', positiva: true },
]

const minimoValido = computed(() => Math.min(Math.max(Number(minimoCartao.value) || 1, 1), 40))
const gapValido = computed(() => Math.min(Math.max(Number(espacamento.value) || 0, 0), 6))

const estiloGrid = computed(() => ({
  '--minmax': `${minimoValido.value}rem`,
  '--gap': `${gapValido.value}rem`,
}))

const colunas = computed(() => {
  const larguraEmRem = larguraGrid.value / remEmPx.value
  const cabem = Math.floor((larguraEmRem + gapValido.value) / (minimoValido.value + gapValido.value))
  return Math.min(Math.max(cabem, 1), metricas.length)
})

function larguraPara(n) {
  const rem = n * minimoValido.value + (n - 1) * gapValido.value
  return { rem: +rem.toFixed(2), px: Math.round(rem * remEmPx.value) }
}

const proximaQuebra = computed(() =>
  colunas.value < metricas.length ? { colunas: colunas.value + 1, ...larguraPara(colunas.value + 1) } : null,
)

let observador

onMounted(() => {
  remEmPx.value = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  observador = new ResizeObserver(([entrada]) => {
    larguraGrid.value = entrada.contentRect.width
    remEmPx.value = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  })
  observador.observe(gridRef.value)
})

onBeforeUnmount(() => observador?.disconnect())
</script>

<template>
  <div class="construtor">
    <div class="construtor__controles">
      <label class="campo" for="lab-minmax">
        Largura mínima de cada cartão (rem)
        <input
          id="lab-minmax"
          v-model.number="minimoCartao"
          type="number"
          min="1"
          max="40"
          step="0.5"
          inputmode="decimal"
        />
      </label>
      <label class="campo" for="lab-gap">
        Espaço entre cartões · gap (rem)
        <input
          id="lab-gap"
          v-model.number="espacamento"
          type="number"
          min="0"
          max="6"
          step="0.25"
          inputmode="decimal"
        />
      </label>
      <label class="campo construtor__largura" for="lab-largura">
        Largura do contêiner: {{ larguraPalco }}% da área disponível
        <input id="lab-largura" v-model.number="larguraPalco" type="range" min="25" max="100" step="1" />
      </label>
    </div>

    <pre class="construtor__css"><code>.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(<mark>{{ minimoValido }}rem</mark>, 1fr));
  gap: <mark>{{ gapValido }}rem</mark>;
}</code></pre>

    <dl class="construtor__painel" aria-live="polite">
      <div>
        <dt>Contêiner</dt>
        <dd>{{ Math.round(larguraGrid) }}px</dd>
      </div>
      <div>
        <dt>Colunas</dt>
        <dd>{{ colunas }}</dd>
      </div>
      <div>
        <dt>Próxima coluna</dt>
        <dd v-if="proximaQuebra">a partir de {{ proximaQuebra.px }}px</dd>
        <dd v-else>já no máximo</dd>
      </div>
    </dl>

    <p v-if="proximaQuebra" class="construtor__conta">
      Para {{ proximaQuebra.colunas }} colunas: {{ proximaQuebra.colunas }} × {{ minimoValido }}rem +
      {{ proximaQuebra.colunas - 1 }} × {{ gapValido }}rem = {{ proximaQuebra.rem }}rem =
      {{ proximaQuebra.px }}px
    </p>

    <div class="construtor__trilho">
      <div class="construtor__palco" :style="{ width: `${larguraPalco}%` }">
        <div ref="gridRef" class="dashboard" :style="estiloGrid">
          <article v-for="metrica in metricas" :key="metrica.rotulo" class="metrica">
            <p class="metrica__rotulo">{{ metrica.rotulo }}</p>
            <p class="metrica__valor">{{ metrica.valor }}</p>
            <p class="metrica__variacao" :class="{ 'metrica__variacao--alerta': !metrica.positiva }">
              {{ metrica.variacao }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.construtor {
  display: grid;
  gap: var(--espaco-5);
  min-width: 0;
}

.construtor__controles {
  display: grid;
  gap: var(--espaco-4);
}

.construtor__css {
  padding: var(--espaco-4);
  border-radius: var(--raio-md);
  background: var(--cor-roxo-950);
  color: #ece8f6;
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
  line-height: 1.7;
}

.construtor__css mark {
  padding: 0 0.2em;
  border-radius: var(--raio-sm);
  background: var(--cor-ambar);
  color: var(--cor-roxo-950);
}

.construtor__painel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(8rem, 100%), 1fr));
  gap: var(--espaco-2);
  margin: 0;
}

.construtor__painel div {
  padding: var(--espaco-3);
  border-radius: var(--raio-md);
  background: var(--cor-roxo-50);
  border: var(--borda);
}

.construtor__painel dt {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--cor-roxo-600);
}

.construtor__painel dd {
  margin: 0;
  font-family: var(--fonte-titulo);
  font-size: var(--titulo-sm);
  font-weight: 700;
  color: var(--cor-roxo-900);
}

.construtor__conta {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.construtor__trilho {
  padding: var(--espaco-3);
  border-radius: var(--raio-md);
  background:
    repeating-linear-gradient(
      -45deg,
      var(--cor-roxo-50) 0 0.5rem,
      transparent 0.5rem 1rem
    );
  border: var(--espessura) dashed var(--cor-linha-forte);
}

.construtor__palco {
  min-width: 0;
  max-width: 100%;
  outline: var(--espessura) solid var(--cor-roxo-400);
  outline-offset: 0.25rem;
  border-radius: var(--raio-sm);
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(var(--minmax), 100%), 1fr));
  gap: var(--gap);
}

.metrica {
  display: grid;
  gap: var(--espaco-1);
  min-width: 0;
  padding: var(--espaco-4);
  border-radius: var(--raio-md);
  background: var(--cor-superficie);
  border: var(--borda);
  border-top: 0.25rem solid var(--cor-roxo-600);
}

.metrica__rotulo {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.metrica__valor {
  font-family: var(--fonte-titulo);
  font-size: var(--titulo-md);
  font-weight: 700;
  color: var(--cor-roxo-900);
  overflow-wrap: anywhere;
}

.metrica__variacao {
  justify-self: start;
  padding: 0 var(--espaco-2);
  border-radius: 1rem;
  background: var(--cor-sucesso-suave);
  color: var(--cor-sucesso);
  font-size: var(--texto-xs);
  font-weight: 600;
}

.metrica__variacao--alerta {
  background: var(--cor-erro-suave);
  color: var(--cor-erro);
}

@media (min-width: 48rem) {
  .construtor__controles {
    grid-template-columns: 1fr 1fr;
  }

  .construtor__largura {
    grid-column: 1 / -1;
  }
}
</style>
