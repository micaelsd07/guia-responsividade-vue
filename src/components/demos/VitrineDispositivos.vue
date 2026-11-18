<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, useId } from 'vue'
import ViewportSimulado from './ViewportSimulado.vue'
import MiniSite from './MiniSite.vue'
import { gsap, movimentoReduzido } from '@/composables/useMotion'
import { useViewport } from '@/composables/useViewport'

const presets = [
  { id: 'monitor', rotulo: 'Monitor', largura: 1280 },
  { id: 'tablet', rotulo: 'Tablet', largura: 768 },
  { id: 'celular', rotulo: 'Celular', largura: 375 },
]

const estado = reactive({ largura: 1280 })
const palco = ref(null)
const larguraPalco = ref(0)
let observadorPalco
const idFaixa = useId()
const { altura: alturaJanela, largura: larguraJanela } = useViewport()
let tween
let intro

const larguraInteira = computed({
  get: () => Math.round(estado.largura),
  set: (valor) => {
    pararAnimacoes()
    estado.largura = valor
  },
})

const dispositivo = computed(() => {
  if (estado.largura < 600) return 'celular'
  if (estado.largura < 1024) return 'tablet'
  return 'monitor'
})

const alturaSimulada = computed(() => ({ celular: 760, tablet: 1000, monitor: 820 })[dispositivo.value])

const alturaMaxima = computed(() => {
  const base = alturaJanela.value || 800
  const fator = larguraJanela.value >= 1024 ? 0.52 : 0.46
  return Math.max(260, Math.min(base * fator, 520))
})

const breakpointAtivo = computed(() => {
  const rem = estado.largura / 16
  if (rem >= 64) return '64rem'
  if (rem >= 48) return '48rem'
  if (rem >= 36) return '36rem'
  return null
})

const leitura = computed(() => {
  const rem = estado.largura / 16
  return {
    menu: rem >= 48 ? 'links visíveis' : 'botão hambúrguer',
    cards: rem >= 48 ? 3 : rem >= 36 ? 2 : 1,
    lateral: rem >= 64 ? 'ao lado' : 'abaixo',
  }
})

function pararAnimacoes() {
  intro?.kill()
  tween?.kill()
}

function irPara(preset) {
  pararAnimacoes()
  if (movimentoReduzido()) {
    estado.largura = preset.largura
    return
  }
  tween = gsap.to(estado, { largura: preset.largura, duration: 0.9, ease: 'power3.inOut' })
}

const disponivel = computed(() => {
  if (!larguraPalco.value) return 0
  const moldura = { monitor: 16, tablet: 28, celular: 16 }[dispositivo.value]
  return Math.max(120, larguraPalco.value - moldura)
})

onMounted(() => {
  observadorPalco = new ResizeObserver(([entrada]) => {
    larguraPalco.value = entrada.contentRect.width
  })
  observadorPalco.observe(palco.value)
  if (movimentoReduzido()) return
  intro = gsap
    .timeline({ delay: 1.4 })
    .to(estado, { largura: 768, duration: 1.1, ease: 'power3.inOut' })
    .to(estado, { largura: 375, duration: 1.1, ease: 'power3.inOut' }, '+=0.7')
    .to(estado, { largura: 1280, duration: 1.3, ease: 'power3.inOut' }, '+=0.9')
})

onBeforeUnmount(() => {
  pararAnimacoes()
  observadorPalco?.disconnect()
})
</script>

<template>
  <div class="vitrine">
    <div class="vitrine__controles">
      <div class="vitrine__presets" role="group" aria-label="Escolher dispositivo">
        <button
          v-for="preset in presets"
          :key="preset.id"
          type="button"
          class="vitrine__preset"
          :class="{ 'is-ativo': dispositivo === preset.id }"
          :aria-pressed="dispositivo === preset.id"
          @click="irPara(preset)"
        >
          <span class="icone" :class="`icone--${preset.id}`" aria-hidden="true"></span>
          <span>{{ preset.rotulo }}</span>
          <span class="vitrine__px">{{ preset.largura }}</span>
        </button>
      </div>
      <div class="vitrine__faixa">
        <label :for="idFaixa" class="label">Largura</label>
        <input :id="idFaixa" v-model.number="larguraInteira" type="range" min="320" max="1440" step="1" />
        <output :for="idFaixa" class="vitrine__valor">{{ larguraInteira }}px</output>
      </div>
    </div>

    <div ref="palco" class="vitrine__palco">
      <div class="aparelho" :class="`aparelho--${dispositivo}`">
        <div class="aparelho__tela">
          <ViewportSimulado :largura="Math.round(estado.largura)" :altura="alturaSimulada" :altura-maxima="alturaMaxima" :disponivel-externo="disponivel">
            <MiniSite />
          </ViewportSimulado>
        </div>
        <span v-if="dispositivo === 'monitor'" class="aparelho__pe" aria-hidden="true"></span>
      </div>
    </div>

    <dl class="vitrine__leitura" aria-live="polite">
      <div>
        <dt>@container</dt>
        <dd>{{ breakpointAtivo ? `min-width: ${breakpointAtivo}` : 'base (celular)' }}</dd>
      </div>
      <div>
        <dt>menu</dt>
        <dd>{{ leitura.menu }}</dd>
      </div>
      <div>
        <dt>cards</dt>
        <dd>{{ leitura.cards }} {{ leitura.cards > 1 ? 'colunas' : 'coluna' }}</dd>
      </div>
      <div>
        <dt>frete</dt>
        <dd>{{ leitura.lateral }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.vitrine {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}

.vitrine__controles {
  display: grid;
  gap: var(--space-3);
}

.vitrine__presets {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: var(--border-strong);
}

.vitrine__preset {
  display: grid;
  justify-items: center;
  gap: 0.125rem;
  min-height: 3.5rem;
  padding: var(--space-2) var(--space-1);
  border: 0;
  background: var(--color-surface);
  font-size: var(--text-xs);
  font-weight: 500;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.vitrine__preset + .vitrine__preset {
  border-left: var(--border-strong);
}

.vitrine__preset:hover {
  background: var(--color-accent-soft);
}

.vitrine__preset.is-ativo {
  background: var(--color-ink);
  color: var(--color-paper);
}

.vitrine__px {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  opacity: 0.7;
}

.icone {
  display: block;
  border: 0.125rem solid currentColor;
}

.icone--monitor {
  width: 1.25rem;
  height: 0.875rem;
  border-radius: 0.125rem;
}

.icone--tablet {
  width: 0.875rem;
  height: 1.125rem;
  border-radius: 0.1875rem;
}

.icone--celular {
  width: 0.625rem;
  height: 1.0625rem;
  border-radius: 0.1875rem;
}

.vitrine__faixa {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 4rem;
  align-items: center;
  gap: var(--space-3);
}

.vitrine__valor {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  text-align: right;
}

.vitrine__palco {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  place-items: center;
  min-width: 0;
  min-height: 18rem;
  padding: var(--space-4) var(--space-2);
  border: var(--border-strong);
  background:
    linear-gradient(var(--color-rule) var(--hairline), transparent var(--hairline)) 0 0 / 1.5rem 1.5rem,
    linear-gradient(90deg, var(--color-rule) var(--hairline), transparent var(--hairline)) 0 0 / 1.5rem 1.5rem,
    var(--color-paper-2);
}

.aparelho {
  display: grid;
  justify-items: center;
  width: 100%;
  min-width: 0;
  transition: max-width var(--duration-slow) var(--ease-out);
}

.aparelho__tela {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background: var(--color-ink);
  box-shadow: var(--shadow-soft);
}

.aparelho--tablet .aparelho__tela {
  width: auto;
  padding: 0.875rem;
  border-radius: 1.25rem;
}

.aparelho--celular .aparelho__tela {
  width: auto;
  padding: 0.625rem 0.5rem;
  border-radius: 1.75rem;
}

.aparelho--celular .aparelho__tela :deep(.simulado__area) {
  border-radius: 1.25rem;
}

.aparelho--tablet .aparelho__tela :deep(.simulado__area) {
  border-radius: 0.5rem;
}

.aparelho__pe {
  width: 22%;
  height: 1.25rem;
  background: linear-gradient(var(--color-ink-2), var(--color-ink));
  clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
}

.vitrine__leitura {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: var(--border-strong);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.vitrine__leitura div {
  display: grid;
  padding: var(--space-2) var(--space-2) var(--space-2) 0;
  border-bottom: var(--border-soft);
}

.vitrine__leitura dt {
  color: var(--color-ink-3);
}

.vitrine__leitura dd {
  margin: 0;
  color: var(--color-ink);
}

@media (min-width: 36rem) {
  .vitrine__leitura {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
