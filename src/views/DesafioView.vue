<script setup>
import { ref, computed } from 'vue'
import PaginaSecao from '@/components/guia/PaginaSecao.vue'
import BlocoSecao from '@/components/guia/BlocoSecao.vue'

const RESPOSTA = 704

const palpite = ref('')
const tentativas = ref(0)
const verificado = ref(false)
const solucaoAberta = ref(false)

const dicas = [
  'Abra o Laboratório 02 (Flexbox e Grid) e coloque 14 na largura mínima e 1 no gap.',
  'Arraste a largura do contêiner e observe o painel "Próxima coluna". A conta da Pergunta-guia 3 vale para qualquer número de colunas.',
  'Três colunas têm quantos espaços (gaps) entre elas? Não são três.',
]

const dicasVisiveis = ref(0)

const valor = computed(() => Number(String(palpite.value).replace(',', '.').replace(/px/i, '').trim()))

const retorno = computed(() => {
  if (!verificado.value) return null
  if (!Number.isFinite(valor.value) || String(palpite.value).trim() === '') {
    return { tipo: 'aviso', texto: 'Digite um número em px, por exemplo 500.' }
  }
  if (valor.value === RESPOSTA) {
    return { tipo: 'certo', texto: 'Isso! A partir de 704px de contêiner aparecem 3 colunas.' }
  }
  if (valor.value === 464) {
    return { tipo: 'erro', texto: '464px é a largura para 2 colunas (Pergunta-guia 3). Agora faça a conta para 3.' }
  }
  if (valor.value === 672) {
    return { tipo: 'erro', texto: 'Quase! 3 × 14rem = 672px, mas você esqueceu dos gaps entre as colunas.' }
  }
  if (valor.value === 720) {
    return { tipo: 'erro', texto: 'Perto! Mas entre 3 colunas existem só 2 gaps, não 3.' }
  }
  return { tipo: 'erro', texto: 'Ainda não. Use as dicas abaixo ou confira no Laboratório 02.' }
})

function verificar() {
  verificado.value = true
  tentativas.value++
}

function mostrarDica() {
  dicasVisiveis.value = Math.min(dicasVisiveis.value + 1, dicas.length)
}
</script>

<template>
  <PaginaSecao
    nome="desafio"
    resumo="Uma pergunta que só se responde usando o próprio guia. Você vai precisar da conta da seção 03 e do Laboratório 02 para chegar ao número exato."
  >
    <section class="desafio" aria-labelledby="desafio-pergunta">
      <p class="desafio__selo">O desafio</p>
      <h2 id="desafio-pergunta" class="desafio__pergunta">
        No nosso Laboratório 02, o Construtor de Dashboard, os cartões usam
        <code>repeat(auto-fit, minmax(14rem, 1fr))</code> com <code>gap: 1rem</code>. A partir de
        qual largura do contêiner, em px, aparecem <strong>3 colunas</strong>?
      </h2>
      <p class="desafio__nota">Considere 1rem = 16px (o padrão do navegador).</p>

      <form class="desafio__form" @submit.prevent="verificar">
        <label class="campo" for="palpite">
          Sua resposta (em px)
          <input
            id="palpite"
            v-model="palpite"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            placeholder="Ex.: 500"
          />
        </label>
        <button type="submit" class="botao desafio__botao">Verificar</button>
      </form>

      <p
        v-if="retorno"
        class="desafio__retorno"
        :class="`desafio__retorno--${retorno.tipo}`"
        role="status"
      >
        {{ retorno.texto }}
        <span v-if="tentativas > 1"> ({{ tentativas }} tentativas)</span>
      </p>
    </section>

    <BlocoSecao id="dicas" rotulo="Dicas" titulo="Travou? Peça uma dica de cada vez">
      <ol v-if="dicasVisiveis" class="dicas">
        <li v-for="dica in dicas.slice(0, dicasVisiveis)" :key="dica">{{ dica }}</li>
      </ol>
      <div class="acoes">
        <button
          type="button"
          class="botao botao--contorno"
          :disabled="dicasVisiveis === dicas.length"
          @click="mostrarDica"
        >
          {{ dicasVisiveis === dicas.length ? 'Sem mais dicas' : `Mostrar dica ${dicasVisiveis + 1} de ${dicas.length}` }}
        </button>
        <RouterLink class="botao botao--contorno" to="/flexbox-grid#lab-2-titulo">Ir para o Laboratório 02</RouterLink>
      </div>
    </BlocoSecao>

    <BlocoSecao id="solucao" rotulo="Solução" titulo="A conta completa">
      <button
        type="button"
        class="botao"
        :aria-expanded="solucaoAberta"
        aria-controls="solucao-conteudo"
        @click="solucaoAberta = !solucaoAberta"
      >
        {{ solucaoAberta ? 'Esconder solução' : 'Mostrar solução' }}
      </button>
      <div v-if="solucaoAberta" id="solucao-conteudo" class="solucao">
        <ol class="solucao__conta">
          <li><span>Colunas</span> 3 × 14rem = 42rem</li>
          <li><span>Gaps</span> 2 espaços × 1rem = 2rem</li>
          <li><span>Total</span> 42rem + 2rem = 44rem</li>
          <li><span>Em px</span> 44 × 16px = <strong>704px</strong></li>
        </ol>
        <p>
          A regra geral, para <em>n</em> colunas, é: <code>n × mínimo + (n − 1) × gap</code>.
          Com o contêiner entre 464px e 703px você vê 2 colunas; a partir de 704px, 3 colunas.
          Confira no Laboratório 02: o painel "Próxima coluna" mostra exatamente esse valor.
        </p>
      </div>
    </BlocoSecao>
  </PaginaSecao>
</template>

<style scoped>
.desafio {
  display: grid;
  gap: var(--espaco-4);
  padding: var(--espaco-5) var(--espaco-4);
  border-radius: var(--raio-lg);
  background: var(--cor-roxo-900);
  color: var(--cor-roxo-100);
}

.desafio__selo {
  justify-self: start;
  padding: var(--espaco-1) var(--espaco-3);
  border-radius: 2rem;
  background: var(--cor-ambar);
  color: var(--cor-roxo-950);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.desafio__pergunta {
  max-width: var(--largura-leitura);
  font-size: var(--titulo-md);
  font-weight: 500;
  line-height: 1.3;
  color: #fff;
}

.desafio__pergunta code {
  background: rgb(255 255 255 / 0.12);
  color: #fff;
  font-size: 0.75em;
}

.desafio__pergunta strong {
  color: var(--cor-ambar);
}

.desafio__nota {
  font-size: var(--texto-sm);
  color: var(--cor-roxo-200);
}

.desafio__form {
  display: grid;
  gap: var(--espaco-3);
  max-width: 28rem;
}

.desafio__form .campo {
  color: #fff;
}

.desafio__form input {
  color: var(--cor-tinta);
}

.desafio__botao {
  background: var(--cor-ambar);
  border-color: var(--cor-ambar);
  color: var(--cor-roxo-950);
}

.desafio__botao:hover:not(:disabled) {
  background: #f5c76c;
  color: var(--cor-roxo-950);
}

.desafio__retorno {
  max-width: var(--largura-leitura);
  padding: var(--espaco-3) var(--espaco-4);
  border-radius: var(--raio-md);
  font-weight: 500;
}

.desafio__retorno--certo {
  background: var(--cor-sucesso-suave);
  color: var(--cor-sucesso);
}

.desafio__retorno--erro {
  background: var(--cor-erro-suave);
  color: var(--cor-erro);
}

.desafio__retorno--aviso {
  background: var(--cor-ambar-suave);
  color: var(--cor-roxo-950);
}

.dicas {
  display: grid;
  gap: var(--espaco-3);
  max-width: var(--largura-leitura);
  margin: 0;
  padding-left: var(--espaco-5);
}

.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
}

.solucao {
  display: grid;
  gap: var(--espaco-4);
  max-width: var(--largura-leitura);
}

.solucao__conta {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
}

.solucao__conta li {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
  padding: var(--espaco-2) var(--espaco-3);
  border-radius: var(--raio-sm);
  background: var(--cor-roxo-50);
  border: var(--borda);
}

.solucao__conta li:last-child {
  background: var(--cor-ambar-suave);
  border-color: var(--cor-ambar);
}

.solucao__conta span {
  min-width: 4.5rem;
  font-size: var(--texto-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--cor-roxo-600);
}

@media (min-width: 36rem) {
  .desafio__form {
    grid-template-columns: 1fr auto;
    align-items: end;
  }
}

@media (min-width: 48rem) {
  .desafio {
    padding: var(--espaco-7) var(--espaco-6);
  }

  .desafio__pergunta {
    font-size: var(--titulo-lg);
  }
}
</style>
