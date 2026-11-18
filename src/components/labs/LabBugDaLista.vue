<script setup>
import { ref, computed, nextTick } from 'vue'
import BancadaLab from '@/components/guia/BancadaLab.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import CampoSegmentado from '@/components/controles/CampoSegmentado.vue'
import { gsap, movimentoReduzido } from '@/composables/useMotion'

const animaisIniciais = [
  { id: 1, nome: 'Capivara', cor: '#5b2be0' },
  { id: 2, nome: 'Tamanduá', cor: '#d2a106' },
  { id: 3, nome: 'Arara-azul', cor: '#1f6fd1' },
  { id: 4, nome: 'Lobo-guará', cor: '#b8321c' },
  { id: 5, nome: 'Onça-pintada', cor: '#11704a' },
]

const modo = ref('sem')
const lista = ref([...animaisIniciais])
const versao = ref(0)
const listaEl = ref(null)
const relato = ref(null)

const opcoesModo = [
  { valor: 'sem', rotulo: 'sem :key' },
  { valor: 'com', rotulo: ':key="animal.id"' },
]

function lerCampos() {
  return [...(listaEl.value?.querySelectorAll('li') ?? [])].map((li) => ({
    li,
    nome: li.dataset.nome,
    texto: li.querySelector('input')?.value ?? '',
  }))
}

async function remover(id) {
  const antes = lerCampos()
  const removido = lista.value.find((animal) => animal.id === id)
  const posicao = lista.value.findIndex((animal) => animal.id === id) + 1
  lista.value = lista.value.filter((animal) => animal.id !== id)
  await nextTick()
  const depois = lerCampos()

  const donos = Object.fromEntries(antes.filter((c) => c.texto).map((c) => [c.texto, c.nome]))
  const trocas = depois
    .filter((c) => c.texto && donos[c.texto] && donos[c.texto] !== c.nome)
    .map((c) => ({ texto: c.texto, era: donos[c.texto], agora: c.nome, li: c.li }))

  relato.value = { removido: removido.nome, posicao, trocas, tinhaTexto: antes.some((c) => c.texto) }

  if (!movimentoReduzido()) {
    trocas.forEach((troca) =>
      gsap.fromTo(troca.li, { backgroundColor: '#fbe2da' }, { backgroundColor: '#ffffff', duration: 2, ease: 'power2.out' }),
    )
  }
}

function restaurar() {
  lista.value = [...animaisIniciais]
  versao.value++
  relato.value = null
}

function trocarModo() {
  restaurar()
}

function resetar() {
  modo.value = 'sem'
  restaurar()
}

const codigo = computed(() =>
  modo.value === 'sem'
    ? `<li v-for="animal in animais">
  {{ animal.nome }}
  <input type="text">
  <button @click="remover(animal.id)">Remover</button>
</li>`
    : `<li v-for="animal in animais" :key="animal.id">
  {{ animal.nome }}
  <input type="text">
  <button @click="remover(animal.id)">Remover</button>
</li>`,
)
</script>

<template>
  <BancadaLab
    id="lab-07"
    numero="07"
    titulo="O bug da lista"
    resumo="Uma lista de animais com um campo de texto em cada item. Escreva no campo de um animal, remova um animal acima dele e veja para onde o texto vai, com e sem :key."
    @reset="resetar"
  >
    <template #controles>
      <CampoSegmentado v-model="modo" legenda="Renderizar com" :opcoes="opcoesModo" @update:model-value="trocarModo" />
      <ol class="passos">
        <li>Escreva algo no campo do <strong>Tamanduá</strong>.</li>
        <li>Remova a <strong>Capivara</strong> (o animal acima).</li>
        <li>Veja onde o texto foi parar. Troque o modo e repita.</li>
      </ol>
      <button type="button" class="btn btn--ghost" @click="restaurar">Restaurar a lista</button>
    </template>

    <template #palco>
      <div class="cena" :class="`cena--${modo}`">
        <p class="cena__modo label">{{ modo === 'sem' ? 'v-for sem :key' : 'v-for com :key="animal.id"' }}</p>
        <ul v-if="modo === 'sem'" ref="listaEl" :key="`sem-${versao}`" class="lista">
          <li v-for="animal in lista" class="item" :data-nome="animal.nome">
            <span class="item__nome"><span class="item__cor" :style="{ background: animal.cor }"></span>{{ animal.nome }}</span>
            <input class="input item__campo" type="text" :placeholder="`Apelido para ${animal.nome}`" :aria-label="`Apelido para ${animal.nome}`" />
            <button type="button" class="btn btn--small btn--ghost" @click="remover(animal.id)">
              Remover<span class="sr-only"> {{ animal.nome }}</span>
            </button>
          </li>
        </ul>
        <ul v-else ref="listaEl" :key="`com-${versao}`" class="lista">
          <li v-for="animal in lista" :key="animal.id" class="item" :data-nome="animal.nome">
            <span class="item__nome"><span class="item__cor" :style="{ background: animal.cor }"></span>{{ animal.nome }}</span>
            <input class="input item__campo" type="text" :placeholder="`Apelido para ${animal.nome}`" :aria-label="`Apelido para ${animal.nome}`" />
            <button type="button" class="btn btn--small btn--ghost" @click="remover(animal.id)">
              Remover<span class="sr-only"> {{ animal.nome }}</span>
            </button>
          </li>
        </ul>
        <p v-if="!lista.length" class="cena__vazia">A lista ficou vazia. Clique em Restaurar.</p>
      </div>
    </template>

    <template #narracao>
      <p v-if="!relato">
        Os campos não usam <code>v-model</code> de propósito: o texto digitado vive só no DOM, como foco, seleção ou o
        estado de um componente de terceiros.
      </p>
      <template v-else>
        <p>Você removeu <strong>{{ relato.removido }}</strong> (posição {{ relato.posicao }}).</p>
        <p v-for="troca in relato.trocas" :key="troca.texto" class="alerta">
          O texto "{{ troca.texto }}" era do <strong>{{ troca.era }}</strong> e agora aparece ao lado de
          <strong>{{ troca.agora }}</strong>.
        </p>
        <p v-if="relato.trocas.length && modo === 'sem'">
          Sem <code>:key</code>, o Vue reaproveitou os <code>&lt;li&gt;</code> por posição: trocou só os nomes e
          apagou o último item. Os inputs ficaram onde estavam.
        </p>
        <p v-else-if="modo === 'com' && relato.tinhaTexto">
          Com <code>:key</code>, o Vue sabia qual elemento era de quem e removeu exatamente o de
          {{ relato.removido }}. Nenhum texto trocou de dono.
        </p>
        <p v-else-if="!relato.tinhaTexto">Nenhum campo tinha texto. Escreva em um campo abaixo do removido e repita.</p>
      </template>
    </template>

    <template #codigo>
      <CodigoEditor :arquivo="`ListaAnimais.vue · ${modo === 'sem' ? 'sem :key' : 'com :key'}`" linguagem="vue" :codigo="codigo" :destaque="[1]" />
    </template>
  </BancadaLab>
</template>

<style scoped>
.passos {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding-left: var(--space-5);
  font-size: var(--text-sm);
}

.cena {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-3);
  border: var(--border-strong);
  border-top: 0.375rem solid var(--color-bad);
  background: var(--color-surface);
}

.cena--com {
  border-top-color: var(--color-ok);
}

.cena__modo {
  color: var(--color-bad);
}

.cena--com .cena__modo {
  color: var(--color-ok);
}

.lista {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-2);
  border: var(--border-soft);
  background: #fff;
}

.item__nome {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
}

.item__cor {
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
}

.item__campo {
  grid-column: 1 / -1;
  grid-row: 2;
  min-height: 2.5rem;
}

.cena__vazia {
  font-size: var(--text-sm);
  color: var(--color-ink-3);
}

.alerta {
  padding: var(--space-2) var(--space-3);
  background: var(--color-bad-soft);
  color: var(--color-bad);
}

@container lab (min-width: 40rem) {
  .item {
    grid-template-columns: 9rem minmax(0, 1fr) auto;
  }

  .item__campo {
    grid-column: auto;
    grid-row: auto;
  }
}
</style>
