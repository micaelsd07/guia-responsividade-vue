<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import BancadaLab from '@/components/guia/BancadaLab.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import CampoSegmentado from '@/components/controles/CampoSegmentado.vue'

const PADRAO = 16
const fonteNavegador = ref(PADRAO)
const fonteOriginal = ref(PADRAO)

const presets = [
  { valor: 12, rotulo: 'Pequena · 12' },
  { valor: 16, rotulo: 'Média · 16' },
  { valor: 20, rotulo: 'Grande · 20' },
  { valor: 24, rotulo: 'Muito grande · 24' },
]

const nomePreset = computed(() => presets.find((p) => p.valor === fonteNavegador.value)?.rotulo.split(' · ')[0] ?? 'Personalizada')
const tituloRem = computed(() => +(1.25 * fonteNavegador.value).toFixed(2))

watch(fonteNavegador, (valor) => {
  document.documentElement.style.fontSize = valor === fonteOriginal.value ? '' : `${valor}px`
})

function resetar() {
  fonteNavegador.value = fonteOriginal.value
  document.documentElement.style.fontSize = ''
}

onMounted(() => {
  const atual = parseFloat(getComputedStyle(document.documentElement).fontSize) || PADRAO
  fonteOriginal.value = atual
  fonteNavegador.value = atual
})

onBeforeUnmount(() => {
  document.documentElement.style.fontSize = ''
})

const codigo = computed(
  () => `html { font-size: ${fonteNavegador.value}px; } /* fonte "${nomePreset.value}" */

.anuncio-px .titulo  { font-size: 20px; }      /* = 20px sempre */
.anuncio-rem .titulo { font-size: 1.25rem; }   /* = ${tituloRem.value}px agora */`,
)
</script>

<template>
  <BancadaLab
    id="lab-02"
    numero="02"
    titulo="Simulador de leitura"
    resumo="Dois anúncios idênticos: o A tem todos os tamanhos em px, o B usa os mesmos valores em rem. Mude a fonte do navegador e veja qual deles respeita quem lê."
    @reset="resetar"
  >
    <template #controles>
      <CampoSegmentado v-model="fonteNavegador" legenda="Tamanho da fonte do navegador" :opcoes="presets" :mono="false" />
      <div class="field">
        <div class="field__top">
          <label for="lab02-fonte">Ajuste fino</label>
          <output for="lab02-fonte" class="field__value">{{ fonteNavegador }}px</output>
        </div>
        <input id="lab02-fonte" v-model.number="fonteNavegador" type="range" min="12" max="24" step="1" />
      </div>
      <p class="aviso">
        Este controle muda de verdade o <code>font-size</code> do <code>&lt;html&gt;</code>. O guia inteiro cresce
        junto, porque também foi escrito em rem. Ao sair da página, tudo volta ao normal.
      </p>
    </template>

    <template #palco>
      <div class="anuncios">
        <figure class="anuncios__coluna">
          <figcaption class="anuncios__legenda anuncios__legenda--px">A · tudo em px</figcaption>
          <article class="anuncio" style="padding: 16px; gap: 8px; font-size: 14px">
            <span class="anuncio__foto" style="height: 112px"></span>
            <span class="anuncio__tag" style="font-size: 12px; padding: 4px 8px">Aluguel</span>
            <h4 class="anuncio__titulo" style="font-size: 20px">Apartamento com 2 quartos perto do metrô</h4>
            <p class="anuncio__preco" style="font-size: 24px">R$ 2.450<span style="font-size: 14px">/mês</span></p>
            <p class="anuncio__detalhes" style="font-size: 14px">68 m² · 1 vaga · aceita pets</p>
          </article>
        </figure>
        <figure class="anuncios__coluna">
          <figcaption class="anuncios__legenda anuncios__legenda--rem">B · tudo em rem</figcaption>
          <article class="anuncio" style="padding: 1rem; gap: 0.5rem; font-size: 0.875rem">
            <span class="anuncio__foto" style="height: 7rem"></span>
            <span class="anuncio__tag" style="font-size: 0.75rem; padding: 0.25rem 0.5rem">Aluguel</span>
            <h4 class="anuncio__titulo" style="font-size: 1.25rem">Apartamento com 2 quartos perto do metrô</h4>
            <p class="anuncio__preco" style="font-size: 1.5rem">R$ 2.450<span style="font-size: 0.875rem">/mês</span></p>
            <p class="anuncio__detalhes" style="font-size: 0.875rem">68 m² · 1 vaga · aceita pets</p>
          </article>
        </figure>
      </div>
    </template>

    <template #narracao>
      <p>
        <strong>1rem agora vale {{ fonteNavegador }}px.</strong> O título de A continua com 20px; o de B tem
        1.25rem = {{ tituloRem }}px.
      </p>
      <p v-if="fonteNavegador > 16">
        Para quem escolheu a fonte "{{ nomePreset }}", o anúncio A ignora a preferência: é o problema da
        Pergunta-guia 02.
      </p>
      <p v-else-if="fonteNavegador < 16">Com fonte menor, o B encolhe junto; o A fica do mesmo tamanho.</p>
      <p v-else>Com a fonte padrão, os dois parecem iguais. A diferença só aparece quando alguém muda a configuração.</p>
    </template>

    <template #codigo>
      <CodigoEditor arquivo="anuncios.css" linguagem="css" :codigo="codigo" :destaque="[4]" />
    </template>
  </BancadaLab>
</template>

<style scoped>
.aviso {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.anuncios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  gap: var(--space-4);
  align-items: start;
}

.anuncios__coluna {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.anuncios__legenda {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
}

.anuncios__legenda--px {
  color: var(--color-bad);
}

.anuncios__legenda--rem {
  color: var(--color-ok);
}

.anuncio {
  display: grid;
  justify-items: start;
  min-width: 0;
  border: var(--border-strong);
  background: #fff;
  line-height: 1.35;
}

.anuncio__foto {
  display: block;
  width: 100%;
  background:
    linear-gradient(135deg, transparent 50%, rgb(255 255 255 / 0.18) 50%) 0 0 / 100% 100%,
    linear-gradient(var(--color-accent), var(--color-accent-ink));
}

.anuncio__tag {
  background: var(--color-signal);
  font-family: var(--font-mono);
  font-weight: 500;
  text-transform: uppercase;
}

.anuncio__titulo {
  font-family: var(--font-body);
  font-weight: 600;
  font-stretch: 100%;
  line-height: 1.25;
}

.anuncio__preco {
  font-family: var(--font-heading);
  font-weight: 700;
  font-stretch: 80%;
}

.anuncio__detalhes {
  color: var(--color-ink-3);
}
</style>
