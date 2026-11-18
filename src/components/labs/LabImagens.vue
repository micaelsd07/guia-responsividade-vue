<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import BancadaLab from '@/components/guia/BancadaLab.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import CampoSegmentado from '@/components/controles/CampoSegmentado.vue'
import CampoFaixa from '@/components/controles/CampoFaixa.vue'
import { fotos, larguras } from '@/data/fotos'

const foto = fotos.notebookCelular
const padrao = { largura: 100, proporcao: 'auto', ajuste: 'fill', posicao: 'center', arquivo: 960, carregamento: 'lazy' }

const largura = ref(padrao.largura)
const proporcao = ref(padrao.proporcao)
const ajuste = ref(padrao.ajuste)
const posicao = ref(padrao.posicao)
const arquivo = ref(padrao.arquivo)
const carregamento = ref(padrao.carregamento)
const estados = { largura, proporcao, ajuste, posicao, arquivo, carregamento }

const imagem = ref(null)
const caixa = ref({ largura: 0, altura: 0 })
const tamanhoKb = ref(null)
const dpr = ref(1)

const presets = [
  { id: 'deformada', rotulo: 'Deformada', valores: { proporcao: '1 / 1', ajuste: 'fill' } },
  { id: 'cortada', rotulo: 'Cortada', valores: { proporcao: '1 / 1', ajuste: 'cover' } },
  { id: 'adaptada', rotulo: 'Adaptada', valores: { proporcao: '1 / 1', ajuste: 'contain' } },
  { id: 'responsiva', rotulo: 'Responsiva', valores: { proporcao: 'auto', ajuste: 'fill' } },
]

const presetAtivo = computed(
  () => presets.find((p) => p.valores.proporcao === proporcao.value && p.valores.ajuste === ajuste.value)?.id,
)

const opcoes = {
  proporcao: ['auto', '16 / 9', '3 / 2', '1 / 1', '4 / 5'].map((valor) => ({ valor })),
  ajuste: ['fill', 'contain', 'cover', 'none', 'scale-down'].map((valor) => ({ valor })),
  posicao: [
    { valor: 'left', rotulo: 'esquerda' },
    { valor: 'center', rotulo: 'centro' },
    { valor: 'right', rotulo: 'direita' },
  ],
  arquivo: larguras.map((w) => ({ valor: w, rotulo: `${w}w` })),
  carregamento: ['lazy', 'eager'].map((valor) => ({ valor })),
}

const alturaArquivo = computed(() => Math.round((arquivo.value * foto.altura) / foto.largura))
const src = computed(() => `/img/fotos/${foto.nome}-${arquivo.value}.webp`)

const estiloImagem = computed(() =>
  proporcao.value === 'auto'
    ? { width: '100%', height: 'auto' }
    : { width: '100%', aspectRatio: proporcao.value, objectFit: ajuste.value, objectPosition: posicao.value },
)

const necessario = computed(() => Math.ceil(caixa.value.largura * dpr.value))
const escolhaSrcset = computed(() => larguras.find((w) => w >= necessario.value) ?? larguras.at(-1))

const diagnostico = computed(() => {
  if (proporcao.value === 'auto') return { tipo: 'bom', texto: 'Responsiva: a caixa segue a proporção da foto e nada é cortado ou distorcido.' }
  if (ajuste.value === 'fill') return { tipo: 'ruim', texto: 'Deformada: fill estica a foto até preencher a caixa, ignorando a proporção.' }
  if (ajuste.value === 'cover') return { tipo: 'neutro', texto: 'Cortada: cover preenche a caixa sem distorcer, sacrificando as bordas.' }
  if (ajuste.value === 'contain') return { tipo: 'neutro', texto: 'Adaptada: contain mostra a foto inteira e deixa faixas vazias.' }
  if (ajuste.value === 'none') return { tipo: 'ruim', texto: 'none: a foto fica no tamanho original do arquivo; só um recorte aparece.' }
  return { tipo: 'neutro', texto: 'scale-down: escolhe o menor resultado entre none e contain.' }
})

const qualidade = computed(() => {
  if (!caixa.value.largura) return null
  if (arquivo.value < necessario.value * 0.9) {
    return { tipo: 'ruim', texto: `O arquivo de ${arquivo.value}px é menor que os ~${necessario.value}px que esta tela precisa: vai parecer borrado.` }
  }
  if (arquivo.value > necessario.value * 2) {
    return { tipo: 'neutro', texto: `O arquivo de ${arquivo.value}px é bem maior que os ~${necessario.value}px necessários: bytes desperdiçados.` }
  }
  return { tipo: 'bom', texto: `O arquivo de ${arquivo.value}px atende bem aos ~${necessario.value}px necessários.` }
})

function aplicarPreset(preset) {
  Object.entries(preset.valores).forEach(([chave, valor]) => {
    estados[chave].value = valor
  })
}

function medir() {
  const el = imagem.value
  if (!el) return
  caixa.value = { largura: Math.round(el.clientWidth), altura: Math.round(el.clientHeight) }
  dpr.value = window.devicePixelRatio || 1
}

function aoCarregar() {
  medir()
  const entrada = performance.getEntriesByName(new URL(src.value, location.href).href).at(-1)
  tamanhoKb.value = entrada?.encodedBodySize ? Math.round(entrada.encodedBodySize / 1024) : null
}

let observador
onMounted(() => {
  observador = new ResizeObserver(medir)
  observador.observe(imagem.value)
})
onBeforeUnmount(() => observador?.disconnect())

watch(arquivo, () => {
  tamanhoKb.value = null
})

const codigo = computed(() => {
  const css =
    proporcao.value === 'auto'
      ? `.foto {
  max-width: 100%;
  height: auto;
}`
      : `.foto {
  width: 100%;
  aspect-ratio: ${proporcao.value};
  object-fit: ${ajuste.value};
  object-position: ${posicao.value};
}`
  return `<img
  class="foto"
  src="${foto.nome}-${arquivo.value}.webp"
  srcset="${larguras.map((w) => `${foto.nome}-${w}.webp ${w}w`).join(', ')}"
  sizes="(min-width: 64rem) 50vw, 100vw"
  width="${arquivo.value}"
  height="${alturaArquivo.value}"
  loading="${carregamento.value}"
  alt="${foto.alt}"
>

<style>
${css}
</style>`
})

function resetar() {
  Object.entries(padrao).forEach(([chave, valor]) => {
    estados[chave].value = valor
  })
}
</script>

<template>
  <BancadaLab
    id="lab-05"
    numero="05"
    titulo="Comparador de imagens"
    resumo="A mesma foto dentro de uma caixa que você controla. Escolha a proporção, o object-fit e o arquivo do srcset, ou use os atalhos para ver os quatro casos clássicos."
    @reset="resetar"
  >
    <template #controles>
      <div class="presets" role="group" aria-label="Casos clássicos">
        <button
          v-for="preset in presets"
          :key="preset.id"
          type="button"
          class="preset"
          :class="{ 'is-ativo': presetAtivo === preset.id }"
          :aria-pressed="presetAtivo === preset.id"
          @click="aplicarPreset(preset)"
        >
          {{ preset.rotulo }}
        </button>
      </div>
      <CampoFaixa v-model="largura" rotulo="Largura do contêiner" :min="30" :max="100" unidade="%" />
      <CampoSegmentado v-model="proporcao" legenda="aspect-ratio da caixa" :opcoes="opcoes.proporcao" />
      <CampoSegmentado v-if="proporcao !== 'auto'" v-model="ajuste" legenda="object-fit" :opcoes="opcoes.ajuste" />
      <CampoSegmentado
        v-if="proporcao !== 'auto' && ['cover', 'none'].includes(ajuste)"
        v-model="posicao"
        legenda="object-position"
        :opcoes="opcoes.posicao"
        :mono="false"
      />
      <CampoSegmentado v-model="arquivo" legenda="Arquivo carregado (tamanho)" :opcoes="opcoes.arquivo" />
      <CampoSegmentado v-model="carregamento" legenda="loading" :opcoes="opcoes.carregamento" />
    </template>

    <template #palco>
      <div class="comparador">
        <div class="comparador__trilho" :style="{ width: `${largura}%` }">
          <p class="comparador__medida label">
            caixa {{ caixa.largura }} × {{ caixa.altura }}px · arquivo {{ arquivo }} × {{ alturaArquivo }}px
          </p>
          <div class="comparador__caixa">
            <img
              ref="imagem"
              :src="src"
              :width="arquivo"
              :height="alturaArquivo"
              :alt="foto.alt"
              :loading="carregamento"
              decoding="async"
              :style="estiloImagem"
              @load="aoCarregar"
            />
          </div>
        </div>
        <dl class="fichas">
          <div>
            <dt class="label">Arquivo</dt>
            <dd>{{ arquivo }}w{{ tamanhoKb ? ` · ${tamanhoKb} KB` : '' }}</dd>
          </div>
          <div>
            <dt class="label">Tela precisa</dt>
            <dd>~{{ necessario }}px (dpr {{ dpr }})</dd>
          </div>
          <div>
            <dt class="label">srcset escolheria</dt>
            <dd>{{ escolhaSrcset }}w</dd>
          </div>
        </dl>
      </div>
    </template>

    <template #narracao>
      <p :class="`nota nota--${diagnostico.tipo}`">{{ diagnostico.texto }}</p>
      <p v-if="qualidade" :class="`nota nota--${qualidade.tipo}`">{{ qualidade.texto }}</p>
      <p>
        <code>loading="{{ carregamento }}"</code>:
        <template v-if="carregamento === 'lazy'">
          o navegador só baixa a imagem quando ela se aproxima da tela. Ótimo para fotos abaixo da dobra; ruim para a
          foto principal do topo, que costuma ser o LCP.
        </template>
        <template v-else>
          a imagem é baixada imediatamente. É o certo para a foto do topo; use <code>fetchpriority="high"</code> se ela
          for o LCP.
        </template>
      </p>
    </template>

    <template #codigo>
      <CodigoEditor arquivo="foto.html" linguagem="html" :codigo="codigo" />
    </template>
  </BancadaLab>
</template>

<style scoped>
.presets {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem;
}

.preset {
  min-height: 2.75rem;
  border: var(--border-strong);
  border-radius: var(--radius-xs);
  background: var(--color-surface);
  font-size: var(--text-sm);
  font-weight: 600;
}

.preset:hover {
  background: var(--color-accent-soft);
}

.preset.is-ativo {
  background: var(--color-ink);
  color: var(--color-signal);
}

.comparador {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}

.comparador__trilho {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
  max-width: 100%;
  transition: width var(--duration-base) var(--ease-out);
}

.comparador__medida {
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}

.comparador__caixa {
  outline: 0.125rem dashed var(--color-accent);
  outline-offset: 0.25rem;
  background: repeating-conic-gradient(var(--color-paper-2) 0 25%, var(--color-surface) 0 50%) 0 0 / 1rem 1rem;
}

.comparador__caixa img {
  display: block;
  max-width: 100%;
  transition: aspect-ratio var(--duration-slow) var(--ease-out);
}

.fichas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(9rem, 100%), 1fr));
  border: var(--border-strong);
  background: var(--color-surface);
}

.fichas div {
  display: grid;
  gap: 0.125rem;
  padding: var(--space-2) var(--space-3);
  border-bottom: var(--border-soft);
}

.fichas dt {
  font-size: var(--text-2xs);
  color: var(--color-ink-3);
}

.fichas dd {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.nota {
  padding-left: var(--space-3);
  border-left: 0.1875rem solid var(--color-ink-3);
}

.nota--bom {
  border-color: var(--color-ok);
}

.nota--ruim {
  border-color: var(--color-bad);
}
</style>
