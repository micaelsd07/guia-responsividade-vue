<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const unidades = [
  {
    unidade: 'px',
    tipo: 'absoluta',
    css: 'width: 160px',
    estilo: { width: '160px' },
    relativa: 'Nada. Um pixel CSS fixo.',
    quando: 'Bordas finas e sombras. Evite em fontes.',
  },
  {
    unidade: 'rem',
    tipo: 'relativa',
    css: 'width: 10rem',
    estilo: { width: '10rem' },
    relativa: 'Fonte do <html> (16px por padrão).',
    quando: 'Fontes, espaçamentos, larguras máximas.',
  },
  {
    unidade: 'em',
    tipo: 'relativa',
    css: 'font-size: 0.75rem; width: 10em',
    estilo: { width: '10em', fontSize: '0.75rem' },
    relativa: 'Fonte do próprio elemento.',
    quando: 'Padding de botões e ícones ao lado do texto.',
  },
  {
    unidade: '%',
    tipo: 'relativa',
    css: 'width: 50%',
    estilo: { width: '50%' },
    relativa: 'Largura do elemento pai.',
    quando: 'Larguras fluidas, max-width: 100%.',
  },
  {
    unidade: 'fr',
    tipo: 'relativa',
    css: 'grid-template-columns: 2fr 1fr',
    grade: true,
    relativa: 'Fração do espaço livre do grid.',
    quando: 'Colunas de grid que dividem o espaço.',
  },
  {
    unidade: 'vw',
    tipo: 'relativa',
    css: 'width: 20vw',
    estilo: { width: '20vw' },
    relativa: '1% da largura da janela.',
    quando: 'Dentro de clamp(), em títulos. 100vw pode gerar rolagem.',
  },
  {
    unidade: 'vh',
    tipo: 'relativa',
    css: 'width: 20vh',
    estilo: { width: '20vh' },
    relativa: '1% da altura da janela.',
    quando: 'Seções altas no desktop. No celular, cuidado com a barra.',
  },
  {
    unidade: 'dvh',
    tipo: 'relativa',
    css: 'width: 20dvh',
    estilo: { width: '20dvh' },
    relativa: '1% da altura visível agora (muda com a barra).',
    quando: 'Telas cheias no celular: min-height: 100dvh.',
  },
  {
    unidade: 'ch',
    tipo: 'relativa',
    css: 'width: 10ch',
    estilo: { width: '10ch' },
    texto: '0123456789',
    relativa: 'Largura do caractere "0" na fonte atual.',
    quando: 'Comprimento de linha (max-width: 65ch), campos de CEP.',
  },
]

const medidas = ref({})
const barras = ref([])
let observador

function medir() {
  const novas = {}
  barras.value.forEach((el) => {
    if (el) novas[el.dataset.unidade] = Math.round(el.getBoundingClientRect().width)
  })
  medidas.value = novas
}

onMounted(() => {
  nextTick(medir)
  observador = new ResizeObserver(medir)
  barras.value.forEach((el) => el && observador.observe(el))
  window.addEventListener('resize', medir, { passive: true })
})

onBeforeUnmount(() => {
  observador?.disconnect()
  window.removeEventListener('resize', medir)
})
</script>

<template>
  <div class="especimes">
    <p class="especimes__nota label">Barras reais, medidas agora no seu navegador. Redimensione a janela.</p>
    <ol class="especimes__lista">
      <li v-for="item in unidades" :key="item.unidade" class="especime" data-reveal>
        <div class="especime__nome">
          <code class="especime__unidade">{{ item.unidade }}</code>
          <span class="especime__tipo" :class="`especime__tipo--${item.tipo}`">{{ item.tipo }}</span>
        </div>
        <div class="especime__amostra">
          <div class="especime__pai">
            <div v-if="item.grade" ref="barras" class="especime__grade" :data-unidade="item.unidade">
              <span>2fr</span><span>1fr</span>
            </div>
            <div v-else ref="barras" class="especime__barra" :style="item.estilo" :data-unidade="item.unidade">
              <span v-if="item.texto" class="especime__ch">{{ item.texto }}</span>
            </div>
          </div>
          <p class="especime__css">
            <code>{{ item.css }}</code>
            <span class="especime__medida">= {{ medidas[item.unidade] ?? '…' }}px agora</span>
          </p>
        </div>
        <dl class="especime__info">
          <dt class="label">Relativa a</dt>
          <dd>{{ item.relativa }}</dd>
          <dt class="label">Quando usar</dt>
          <dd>{{ item.quando }}</dd>
        </dl>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.especimes {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.especimes__nota {
  color: var(--color-ink-3);
}

.especimes__lista {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.especime {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border-bottom: var(--border-soft);
}

.especime__nome {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.especime__unidade {
  padding: 0;
  background: none;
  font-size: var(--heading-md);
  font-weight: 500;
  color: var(--color-ink);
}

.especime__tipo {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
}

.especime__tipo--absoluta {
  color: var(--color-bad);
}

.especime__tipo--relativa {
  color: var(--color-ok);
}

.especime__amostra {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.especime__pai {
  width: 100%;
  max-width: 20rem;
  padding: 0.25rem;
  border: var(--hairline) dashed var(--color-ink-3);
  overflow: hidden;
}

.especime__barra {
  display: flex;
  align-items: center;
  height: 1.5rem;
  max-width: none;
  background: var(--color-accent);
}

.especime__ch {
  padding-left: 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.5rem;
  color: #fff;
  letter-spacing: 0;
}

.especime__grade {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0.25rem;
}

.especime__grade span {
  height: 1.5rem;
  background: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  line-height: 1.5rem;
  color: #fff;
  text-align: center;
}

.especime__grade span + span {
  background: var(--color-ink);
}

.especime__css {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--text-sm);
}

.especime__medida {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent-ink);
}

.especime__info {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
}

.especime__info dt {
  color: var(--color-ink-3);
  padding-top: 0.125rem;
}

.especime__info dd {
  color: var(--color-ink-2);
}

@media (min-width: 48rem) {
  .especime {
    grid-template-columns: 6rem minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
    gap: var(--space-5);
  }
}
</style>
