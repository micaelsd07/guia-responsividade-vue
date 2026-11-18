<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import AberturaSecao from '@/components/guia/AberturaSecao.vue'
import PaginadorSecoes from '@/components/guia/PaginadorSecoes.vue'
import { perguntas } from '@/data/quiz'
import { usePageMotion, gsap, movimentoReduzido } from '@/composables/useMotion'

const raiz = ref(null)
usePageMotion(raiz)

const indice = ref(0)
const escolha = ref(null)
const respostas = reactive({})
const finalizado = ref(false)
const tituloPergunta = ref(null)
const cartao = ref(null)
const placar = ref(null)

const atual = computed(() => perguntas[indice.value])
const respondida = computed(() => respostas[atual.value.id] !== undefined)
const acertos = computed(() => perguntas.filter((p) => respostas[p.id] === p.correta).length)
const respondidas = computed(() => Object.keys(respostas).length)
const percentual = computed(() => Math.round((acertos.value / perguntas.length) * 100))

const mensagem = computed(() => {
  if (acertos.value === perguntas.length) return 'Domínio completo. Você leu, mexeu e calculou tudo.'
  if (acertos.value >= 8) return 'Muito bom. Revise as poucas perguntas marcadas e volte aos laboratórios delas.'
  if (acertos.value >= 5) return 'Bom começo. Os laboratórios das perguntas marcadas vão esclarecer o resto.'
  return 'Vale refazer o caminho: cada pergunta tem um laboratório que mostra a resposta acontecendo.'
})

function animar(el, de) {
  if (!el || movimentoReduzido()) return
  gsap.fromTo(el, de, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' })
}

function verificar() {
  if (escolha.value === null || respondida.value) return
  respostas[atual.value.id] = escolha.value
  nextTick(() => {
    animar(raiz.value?.querySelector('.retorno'), { autoAlpha: 0, y: 12 })
    if (respostas[atual.value.id] === atual.value.correta) animar(placar.value, { scale: 1.15 })
  })
}

async function irPara(novo) {
  finalizado.value = false
  indice.value = novo
  escolha.value = respostas[perguntas[novo].id] ?? null
  await nextTick()
  animar(cartao.value, { autoAlpha: 0, x: 24 })
  tituloPergunta.value?.focus()
}

function proxima() {
  if (indice.value < perguntas.length - 1) irPara(indice.value + 1)
  else concluir()
}

async function concluir() {
  finalizado.value = true
  await nextTick()
  const el = raiz.value?.querySelector('.resultado')
  animar(el, { autoAlpha: 0, y: 24 })
  el?.querySelector('h2')?.focus()
}

function refazer() {
  Object.keys(respostas).forEach((chave) => delete respostas[chave])
  irPara(0)
}

function estadoAlternativa(i) {
  if (!respondida.value) return escolha.value === i ? 'escolhida' : ''
  if (i === atual.value.correta) return 'correta'
  if (i === respostas[atual.value.id]) return 'errada'
  return 'neutra'
}

function rotuloSegmento(p, i) {
  const estado = respostas[p.id] === undefined ? '' : respostas[p.id] === p.correta ? ', acertada' : ', errada'
  return `Ir para a pergunta ${i + 1}${estado}`
}
</script>

<template>
  <div ref="raiz">
    <AberturaSecao nome="desafio" />

    <section id="quiz" class="quiz wrap" aria-labelledby="quiz-titulo">
      <h2 id="quiz-titulo" class="sr-only">Perguntas do desafio</h2>

      <div class="progresso">
        <p class="progresso__texto" aria-live="polite">
          <span class="label">Pergunta {{ finalizado ? perguntas.length : indice + 1 }} de {{ perguntas.length }}</span>
          <span ref="placar" class="progresso__placar">{{ acertos }} {{ acertos === 1 ? 'acerto' : 'acertos' }}</span>
        </p>
        <ol class="progresso__segmentos" aria-label="Progresso das respostas">
          <li v-for="(p, i) in perguntas" :key="p.id">
            <button
              type="button"
              class="segmento"
              :class="{
                'is-atual': !finalizado && i === indice,
                'is-certa': respostas[p.id] === p.correta,
                'is-errada': respostas[p.id] !== undefined && respostas[p.id] !== p.correta,
              }"
              :aria-label="rotuloSegmento(p, i)"
              :aria-current="!finalizado && i === indice ? 'step' : undefined"
              @click="irPara(i)"
            ></button>
          </li>
        </ol>
      </div>

      <div v-if="!finalizado" ref="cartao" :key="atual.id" class="cartao">
        <p v-if="atual.destaque" class="cartao__destaque label">{{ atual.destaque }}</p>
        <fieldset class="cartao__campo">
          <legend>
            <span ref="tituloPergunta" class="cartao__enunciado" tabindex="-1">{{ atual.enunciado }}</span>
          </legend>
          <div class="alternativas">
            <label
              v-for="(alternativa, i) in atual.alternativas"
              :key="alternativa"
              class="alternativa"
              :class="`alternativa--${estadoAlternativa(i)}`"
            >
              <input v-model="escolha" class="sr-only" type="radio" :name="atual.id" :value="i" :disabled="respondida" />
              <span class="alternativa__letra" aria-hidden="true">{{ 'ABCD'[i] }}</span>
              <span class="alternativa__texto">{{ alternativa }}</span>
              <span v-if="estadoAlternativa(i) === 'correta'" class="alternativa__marca">correta</span>
              <span v-else-if="estadoAlternativa(i) === 'errada'" class="alternativa__marca">sua resposta</span>
            </label>
          </div>
        </fieldset>

        <div
          v-if="respondida"
          class="retorno"
          :class="respostas[atual.id] === atual.correta ? 'retorno--certo' : 'retorno--errado'"
          role="status"
        >
          <p class="retorno__titulo">{{ respostas[atual.id] === atual.correta ? 'Certo.' : 'Não foi dessa vez.' }}</p>
          <p>{{ atual.explicacao }}</p>
          <RouterLink :to="{ path: atual.secao.caminho, hash: atual.secao.hash }" class="retorno__link">
            Rever na seção {{ atual.secao.numero }} →
          </RouterLink>
        </div>

        <div class="cartao__acoes">
          <button type="button" class="btn btn--ghost" :disabled="indice === 0" @click="irPara(indice - 1)">← Anterior</button>
          <button v-if="!respondida" type="button" class="btn btn--hard" :disabled="escolha === null" @click="verificar">
            Verificar resposta
          </button>
          <button v-else type="button" class="btn btn--hard" @click="proxima">
            {{ indice < perguntas.length - 1 ? 'Próxima pergunta →' : 'Ver resultado' }}
          </button>
        </div>
      </div>

      <section v-else id="resultado" class="resultado" aria-labelledby="resultado-titulo">
        <p class="label resultado__rotulo">Resultado</p>
        <h2 id="resultado-titulo" class="resultado__nota" tabindex="-1">
          {{ acertos }}<span>/{{ perguntas.length }}</span>
        </h2>
        <p class="resultado__barra" aria-hidden="true"><span :style="{ width: `${percentual}%` }"></span></p>
        <p class="lead">{{ mensagem }}</p>
        <p v-if="respondidas < perguntas.length" class="resultado__aviso">
          Você deixou {{ perguntas.length - respondidas }} sem responder.
        </p>
        <ol class="revisao">
          <li v-for="(p, i) in perguntas" :key="p.id" :class="respostas[p.id] === p.correta ? 'is-certa' : 'is-errada'">
            <span class="revisao__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="revisao__texto">{{ p.enunciado }}</span>
            <span class="revisao__estado">
              {{ respostas[p.id] === p.correta ? 'acertou' : respostas[p.id] === undefined ? 'em branco' : 'errou' }}
            </span>
            <RouterLink :to="{ path: p.secao.caminho, hash: p.secao.hash }" class="revisao__link">
              Seção {{ p.secao.numero }}
            </RouterLink>
          </li>
        </ol>
        <div class="cartao__acoes">
          <button type="button" class="btn btn--hard" @click="refazer">Refazer o desafio</button>
          <RouterLink to="/laboratorios" class="btn btn--ghost">Voltar aos laboratórios</RouterLink>
        </div>
      </section>
    </section>

    <PaginadorSecoes nome="desafio" />
  </div>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: var(--space-6);
  padding-top: var(--space-7);
}

.progresso {
  display: grid;
  gap: var(--space-3);
}

.progresso__texto {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
}

.progresso__placar {
  display: inline-block;
  padding: 0 var(--space-2);
  background: var(--color-signal);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.progresso__segmentos {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.segmento {
  display: block;
  width: 100%;
  height: 2.75rem;
  padding: 0;
  border: 0;
  background: transparent;
}

.segmento::after {
  content: '';
  display: block;
  height: 0.5rem;
  background: var(--color-rule);
  transition: background-color var(--duration-base) var(--ease-out);
}

.segmento.is-atual::after {
  background: var(--color-ink);
}

.segmento.is-certa::after {
  background: var(--color-ok);
}

.segmento.is-errada::after {
  background: var(--color-bad);
}

.cartao {
  display: grid;
  gap: var(--space-5);
  max-width: 52rem;
}

.cartao__destaque {
  justify-self: start;
  padding: var(--space-1) var(--space-2);
  background: var(--color-accent);
  color: #fff;
}

.cartao__campo {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.cartao__campo legend {
  padding: 0;
  margin-bottom: var(--space-5);
}

.cartao__enunciado {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 80%;
  line-height: 1.1;
  outline: none;
}

.alternativas {
  display: grid;
  gap: var(--space-2);
}

.alternativa {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-3);
  min-height: 3.5rem;
  padding: var(--space-2) var(--space-3) var(--space-2) var(--space-2);
  border: var(--border-strong);
  background: var(--color-surface);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.alternativa:hover {
  background: var(--color-accent-soft);
}

.alternativa:has(input:focus-visible) {
  outline: 0.1875rem solid var(--color-accent);
  outline-offset: 0.125rem;
}

.alternativa:has(input:disabled) {
  cursor: default;
}

.alternativa__letra {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: var(--border-strong);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.alternativa__marca {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
}

.alternativa--escolhida {
  background: var(--color-ink);
  color: var(--color-paper);
  transform: translate(-0.125rem, -0.125rem);
  box-shadow: var(--shadow-hard-sm);
}

.alternativa--escolhida:hover {
  background: var(--color-ink);
}

.alternativa--escolhida .alternativa__letra {
  border-color: var(--color-signal);
  color: var(--color-signal);
}

.alternativa--correta {
  background: var(--color-ok-soft);
  border-color: var(--color-ok);
  color: var(--color-ok);
}

.alternativa--errada {
  background: var(--color-bad-soft);
  border-color: var(--color-bad);
  color: var(--color-bad);
}

.alternativa--neutra {
  opacity: 0.55;
}

.retorno {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  border-left: 0.3125rem solid var(--color-ok);
  background: var(--color-ok-soft);
}

.retorno--errado {
  border-left-color: var(--color-bad);
  background: var(--color-bad-soft);
}

.retorno__titulo {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  font-stretch: 80%;
}

.retorno__link {
  justify-self: start;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.cartao__acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.resultado {
  display: grid;
  gap: var(--space-4);
  max-width: 52rem;
}

.resultado__rotulo {
  color: var(--color-accent);
}

.resultado__nota {
  font-size: clamp(5rem, 3rem + 10vw, 11rem);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.85;
  letter-spacing: -0.04em;
  outline: none;
}

.resultado__nota span {
  color: var(--color-ink-3);
}

.resultado__barra {
  height: 0.75rem;
  border: var(--border-strong);
}

.resultado__barra span {
  display: block;
  height: 100%;
  background: var(--color-accent);
}

.resultado__aviso {
  color: var(--color-warn);
}

.revisao {
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.revisao li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto;
  gap: var(--space-1) var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: var(--border-soft);
  font-size: var(--text-sm);
}

.revisao__n {
  font-family: var(--font-mono);
  color: var(--color-ink-3);
}

.revisao__estado {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.is-certa .revisao__estado {
  color: var(--color-ok);
}

.is-errada .revisao__estado {
  color: var(--color-bad);
}

.revisao__link {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}
</style>
