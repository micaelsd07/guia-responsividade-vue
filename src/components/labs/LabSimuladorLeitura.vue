<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const PADRAO = 16
const fonteNavegador = ref(PADRAO)
const fonteOriginal = ref(PADRAO)
const alterado = ref(false)

const presets = [
  { valor: 12, nome: 'Pequena' },
  { valor: 16, nome: 'Média' },
  { valor: 20, nome: 'Grande' },
  { valor: 24, nome: 'Muito grande' },
]

const presetAtual = computed(
  () => presets.find((preset) => preset.valor === fonteNavegador.value)?.nome ?? 'Personalizada',
)
const tituloRem = computed(() => +(1.25 * fonteNavegador.value).toFixed(2))

watch(fonteNavegador, (valor) => {
  alterado.value = true
  document.documentElement.style.fontSize = `${valor}px`
})

function restaurar() {
  document.documentElement.style.fontSize = ''
  fonteNavegador.value = fonteOriginal.value
  requestAnimationFrame(() => {
    document.documentElement.style.fontSize = ''
    alterado.value = false
  })
}

onMounted(() => {
  const atual = parseFloat(getComputedStyle(document.documentElement).fontSize) || PADRAO
  fonteOriginal.value = atual
  fonteNavegador.value = atual
  requestAnimationFrame(() => (alterado.value = false))
})

onBeforeUnmount(() => {
  document.documentElement.style.fontSize = ''
})
</script>

<template>
  <div class="simulador">
    <div class="simulador__controles">
      <label class="campo" for="fonte-navegador">
        Tamanho da fonte do navegador
        <span class="simulador__valor">
          {{ fonteNavegador }}px <small>({{ presetAtual }})</small>
        </span>
      </label>
      <input
        id="fonte-navegador"
        v-model.number="fonteNavegador"
        type="range"
        min="12"
        max="24"
        step="1"
        list="presets-fonte"
        aria-describedby="fonte-navegador-ajuda"
      />
      <datalist id="presets-fonte">
        <option v-for="preset in presets" :key="preset.valor" :value="preset.valor" :label="preset.nome"></option>
      </datalist>
      <div class="simulador__presets" aria-hidden="true">
        <span v-for="preset in presets" :key="preset.valor">{{ preset.valor }}</span>
      </div>
      <p id="fonte-navegador-ajuda" class="simulador__ajuda">
        O slider muda o <code>font-size</code> do elemento <code>&lt;html&gt;</code>, exatamente
        o que acontece quando alguém altera a fonte nas configurações do navegador. Repare que o
        guia inteiro cresce junto, porque ele também foi escrito em <code>rem</code>.
      </p>
      <button type="button" class="botao botao--contorno" :disabled="!alterado" @click="restaurar">
        Restaurar tamanho original
      </button>
    </div>

    <div class="simulador__leitura" aria-live="polite">
      <p><strong>1rem agora vale {{ fonteNavegador }}px.</strong></p>
      <p>
        Título do cartão em px: <code>20px</code> (sempre 20px). Título do cartão em rem:
        <code>1.25rem</code> = {{ tituloRem }}px
      </p>
    </div>

    <div class="simulador__cartoes">
      <figure class="simulador__coluna">
        <figcaption class="simulador__legenda simulador__legenda--px">Cartão A: tudo em px</figcaption>
        <article
          class="anuncio"
          style="padding: 16px; gap: 8px; border-radius: 12px; font-size: 14px"
        >
          <svg
            class="anuncio__foto"
            style="height: 112px; border-radius: 8px"
            viewBox="0 0 320 112"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Ilustração de um prédio residencial"
          >
            <rect width="320" height="112" fill="#ece6fd" />
            <circle cx="268" cy="30" r="14" fill="#f0b545" />
            <rect x="40" y="26" width="96" height="86" fill="#5b34c9" />
            <rect x="136" y="46" width="78" height="66" fill="#42239a" />
            <g fill="#d6c9fb">
              <rect x="54" y="38" width="16" height="14" /><rect x="80" y="38" width="16" height="14" /><rect x="106" y="38" width="16" height="14" />
              <rect x="54" y="62" width="16" height="14" /><rect x="80" y="62" width="16" height="14" /><rect x="106" y="62" width="16" height="14" />
              <rect x="150" y="58" width="14" height="12" /><rect x="176" y="58" width="14" height="12" />
              <rect x="150" y="80" width="14" height="12" /><rect x="176" y="80" width="14" height="12" />
            </g>
          </svg>
          <span class="anuncio__tag" style="font-size: 12px; padding: 4px 8px; border-radius: 4px">
            Aluguel
          </span>
          <h3 class="anuncio__titulo" style="font-size: 20px">
            Apartamento com 2 quartos perto do metrô
          </h3>
          <p class="anuncio__preco" style="font-size: 24px">R$ 2.450<span style="font-size: 14px">/mês</span></p>
          <p class="anuncio__detalhes" style="font-size: 14px">68 m², 1 vaga, 2º andar, aceita pets</p>
          <span class="anuncio__botao" style="font-size: 14px; padding: 10px 16px; border-radius: 6px">
            Agendar visita
          </span>
        </article>
      </figure>

      <figure class="simulador__coluna">
        <figcaption class="simulador__legenda simulador__legenda--rem">Cartão B: tudo em rem</figcaption>
        <article
          class="anuncio"
          style="padding: 1rem; gap: 0.5rem; border-radius: 0.75rem; font-size: 0.875rem"
        >
          <svg
            class="anuncio__foto"
            style="height: 7rem; border-radius: 0.5rem"
            viewBox="0 0 320 112"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Ilustração de um prédio residencial"
          >
            <rect width="320" height="112" fill="#ece6fd" />
            <circle cx="268" cy="30" r="14" fill="#f0b545" />
            <rect x="40" y="26" width="96" height="86" fill="#5b34c9" />
            <rect x="136" y="46" width="78" height="66" fill="#42239a" />
            <g fill="#d6c9fb">
              <rect x="54" y="38" width="16" height="14" /><rect x="80" y="38" width="16" height="14" /><rect x="106" y="38" width="16" height="14" />
              <rect x="54" y="62" width="16" height="14" /><rect x="80" y="62" width="16" height="14" /><rect x="106" y="62" width="16" height="14" />
              <rect x="150" y="58" width="14" height="12" /><rect x="176" y="58" width="14" height="12" />
              <rect x="150" y="80" width="14" height="12" /><rect x="176" y="80" width="14" height="12" />
            </g>
          </svg>
          <span class="anuncio__tag" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem">
            Aluguel
          </span>
          <h3 class="anuncio__titulo" style="font-size: 1.25rem">
            Apartamento com 2 quartos perto do metrô
          </h3>
          <p class="anuncio__preco" style="font-size: 1.5rem">R$ 2.450<span style="font-size: 0.875rem">/mês</span></p>
          <p class="anuncio__detalhes" style="font-size: 0.875rem">68 m², 1 vaga, 2º andar, aceita pets</p>
          <span class="anuncio__botao" style="font-size: 0.875rem; padding: 0.625rem 1rem; border-radius: 0.375rem">
            Agendar visita
          </span>
        </article>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.simulador {
  display: grid;
  gap: var(--espaco-5);
  min-width: 0;
}

.simulador__controles {
  display: grid;
  gap: var(--espaco-3);
  max-width: 34rem;
}

.simulador__controles .campo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--espaco-2);
}

.simulador__valor {
  font-family: var(--fonte-codigo);
  color: var(--cor-roxo-700);
}

.simulador__valor small {
  color: var(--cor-tinta-suave);
}

.simulador__presets {
  display: flex;
  justify-content: space-between;
  margin-top: calc(-1 * var(--espaco-2));
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  color: var(--cor-tinta-suave);
}

.simulador__ajuda {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.simulador__controles .botao {
  justify-self: start;
}

.simulador__leitura {
  display: grid;
  gap: var(--espaco-1);
  padding: var(--espaco-3) var(--espaco-4);
  border-radius: var(--raio-md);
  background: var(--cor-ambar-suave);
  font-size: var(--texto-sm);
}

.simulador__cartoes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: var(--espaco-5);
  align-items: start;
}

.simulador__coluna {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  min-width: 0;
}

.simulador__legenda {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.simulador__legenda--px {
  color: var(--cor-erro);
}

.simulador__legenda--rem {
  color: var(--cor-sucesso);
}

.anuncio {
  display: grid;
  justify-items: start;
  min-width: 0;
  border: var(--borda);
  background: var(--cor-superficie);
  line-height: 1.4;
}

.anuncio__foto {
  width: 100%;
}

.anuncio__tag {
  background: var(--cor-roxo-100);
  color: var(--cor-roxo-800);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.anuncio__titulo {
  font-family: var(--fonte-texto);
  font-weight: 600;
  line-height: 1.25;
  color: var(--cor-tinta);
}

.anuncio__preco {
  font-family: var(--fonte-titulo);
  font-weight: 700;
  color: var(--cor-roxo-800);
}

.anuncio__detalhes {
  color: var(--cor-tinta-suave);
}

.anuncio__botao {
  background: var(--cor-roxo-700);
  color: #fff;
  font-weight: 600;
}
</style>
