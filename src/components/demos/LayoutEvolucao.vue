<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, useId } from 'vue'
import ViewportSimulado from './ViewportSimulado.vue'
import { gsap, ScrollTrigger, movimentoReduzido } from '@/composables/useMotion'

const estado = reactive({ largura: 1100 })
const raiz = ref(null)
const idFaixa = useId()
let animacao
let gatilho

const largura = computed({
  get: () => Math.round(estado.largura),
  set: (valor) => {
    animacao?.kill()
    estado.largura = valor
  },
})

const sobra = computed(() => Math.max(0, 960 - largura.value))

const paineis = [
  {
    id: 'fixo',
    epoca: 'anos 1990–2000',
    titulo: 'Layout fixo',
    regra: 'width: 960px',
  },
  {
    id: 'fluido',
    epoca: 'anos 2000',
    titulo: 'Layout fluido',
    regra: 'width: 33.33%',
  },
  {
    id: 'responsivo',
    epoca: '2010 em diante',
    titulo: 'Layout responsivo',
    regra: '@media (min-width: …)',
  },
]

const diagnostico = computed(() => {
  const l = largura.value
  return {
    fixo: sobra.value > 0 ? `${sobra.value}px fora da tela: rolagem horizontal` : 'cabe inteiro só a partir de 960px',
    fluido: l < 600 ? `colunas de ~${Math.round((l - 48) / 3)}px: texto espremido` : 'as colunas acompanham a largura',
    responsivo: l < 600 ? 'uma coluna: empilha e continua legível' : l < 900 ? 'duas colunas' : 'três colunas',
  }
})

function encolher() {
  animacao?.kill()
  if (movimentoReduzido()) {
    estado.largura = estado.largura > 500 ? 360 : 1100
    return
  }
  const destino = estado.largura > 500 ? 360 : 1100
  animacao = gsap.to(estado, { largura: destino, duration: 2.2, ease: 'power2.inOut' })
}

onMounted(() => {
  if (movimentoReduzido()) return
  gatilho = ScrollTrigger.create({
    trigger: raiz.value,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      animacao = gsap
        .timeline()
        .to(estado, { largura: 360, duration: 2.4, ease: 'power2.inOut', delay: 0.4 })
        .to(estado, { largura: 760, duration: 1.4, ease: 'power2.inOut' }, '+=0.8')
    },
  })
})

onBeforeUnmount(() => {
  animacao?.kill()
  gatilho?.kill()
})
</script>

<template>
  <div ref="raiz" class="evolucao">
    <div class="evolucao__controles">
      <div class="field evolucao__faixa">
        <div class="field__top">
          <label :for="idFaixa">Largura da janela simulada</label>
          <output :for="idFaixa" class="field__value">{{ largura }}px</output>
        </div>
        <input :id="idFaixa" v-model.number="largura" type="range" min="320" max="1280" step="1" />
      </div>
      <button type="button" class="btn btn--hard" @click="encolher">
        {{ estado.largura > 500 ? 'Encolher a janela' : 'Alargar a janela' }}
      </button>
    </div>

    <ol class="evolucao__paineis">
      <li v-for="(painel, i) in paineis" :key="painel.id" class="painel">
        <p class="painel__cabeca">
          <span class="label">{{ String(i + 1).padStart(2, '0') }} · {{ painel.epoca }}</span>
          <strong>{{ painel.titulo }}</strong>
          <code>{{ painel.regra }}</code>
        </p>
        <div class="painel__janela">
          <ViewportSimulado :largura="largura" :altura="440">
            <div class="pg" :class="`pg--${painel.id}`">
              <div class="pg__topo">
                <b>Jornal</b>
                <span>Brasil</span><span>Mundo</span><span>Esporte</span><span>Cultura</span>
              </div>
              <p class="pg__manchete">Chuva forte muda o trânsito da cidade nesta sexta</p>
              <div class="pg__colunas">
                <p v-for="n in 3" :key="n">
                  <span class="pg__foto"></span>
                  Prefeitura recomenda evitar a avenida central entre 17h e 20h e usar o transporte público.
                </p>
              </div>
            </div>
          </ViewportSimulado>
          <div v-if="painel.id === 'fixo'" class="painel__rolagem" :class="{ 'is-vazando': sobra > 0 }" aria-hidden="true">
            <span :style="{ width: `${Math.min(100, (largura / 960) * 100)}%` }"></span>
          </div>
        </div>
        <p class="painel__diagnostico" :class="{ 'is-ruim': (painel.id === 'fixo' && sobra > 0) || (painel.id === 'fluido' && largura < 600) }">
          {{ diagnostico[painel.id] }}
        </p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.evolucao {
  display: grid;
  gap: var(--space-5);
  min-width: 0;
}

.evolucao__controles {
  display: grid;
  gap: var(--space-3);
  align-items: end;
}

.evolucao__controles .btn {
  justify-self: start;
}

.evolucao__paineis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.painel {
  display: grid;
  align-content: start;
  gap: var(--space-2);
  min-width: 0;
}

.painel__cabeca {
  display: grid;
  gap: 0.125rem;
  padding-top: var(--space-2);
  border-top: var(--border-strong);
}

.painel__cabeca .label {
  color: var(--color-ink-3);
}

.painel__cabeca strong {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-stretch: 80%;
}

.painel__cabeca code {
  justify-self: start;
  font-size: var(--text-xs);
}

.painel__janela {
  padding: var(--space-2);
  border: var(--border-strong);
  background: var(--color-paper-2);
}

.painel__rolagem {
  height: 0.375rem;
  margin-top: 0.25rem;
  background: var(--color-rule);
}

.painel__rolagem span {
  display: block;
  height: 100%;
  background: var(--color-ink-3);
}

.painel__rolagem.is-vazando span {
  background: var(--color-bad);
}

.painel__diagnostico {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ok);
}

.painel__diagnostico.is-ruim {
  color: var(--color-bad);
}

.pg {
  display: grid;
  gap: 1rem;
  padding: 1rem 1.5rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.9375rem;
  line-height: 1.4;
  color: #121016;
}

.pg__topo {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1.125rem;
  padding-bottom: 0.625rem;
  border-bottom: 0.1875rem solid #121016;
  font-family: var(--font-body);
  font-size: 0.875rem;
}

.pg__topo b {
  margin-right: auto;
  font-family: var(--font-heading);
  font-size: 1.625rem;
  font-stretch: 75%;
}

.pg__manchete {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.1;
}

.pg__colunas {
  display: flex;
  gap: 1rem;
}

.pg__colunas p {
  min-width: 0;
  overflow-wrap: anywhere;
}

.pg__foto {
  display: block;
  height: 5.625rem;
  margin-bottom: 0.5rem;
  background: #d9d3e8;
}

.pg--fixo {
  width: 960px;
}

.pg--fluido .pg__colunas p {
  width: 33.33%;
}

.pg--responsivo .pg__colunas {
  display: grid;
  grid-template-columns: 1fr;
}

@container tela (min-width: 37.5rem) {
  .pg--responsivo .pg__colunas {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container tela (min-width: 56.25rem) {
  .pg--responsivo .pg__colunas {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 36rem) {
  .evolucao__controles {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}
</style>
