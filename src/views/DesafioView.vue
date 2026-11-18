<script setup>
import { ref, computed } from 'vue'
import PaginaSecao from '@/components/guia/PaginaSecao.vue'
import BlocoSecao from '@/components/guia/BlocoSecao.vue'

const RESPOSTA = 696

const palpite = ref('')
const tentativas = ref(0)
const verificado = ref(false)
const solucaoAberta = ref(false)

const dicas = [
  'No Laboratório 01 (seção 02), arraste o slider até o fim: quantos px vale a fonte "Muito grande"?',
  'Releia a Pergunta-guia 2: quando a fonte do navegador muda, o que acontece com o valor de 1rem?',
  'A Pergunta-guia 3 já tem a conta de 2 colunas em rem. Só falta converter para px com o novo valor de 1rem.',
]

const errosComuns = {
  464: '464px é a resposta para 1rem = 16px (a fonte "Média"). Com a fonte "Muito grande", quanto vale 1rem?',
  580: 'Você usou 20px, que é a fonte "Grande". Confira no Laboratório 01 quanto vale a "Muito grande".',
  672: 'Quase! 2 × 14rem = 28rem, mas faltou somar o gap entre as duas colunas.',
  720: 'Perto! Entre 2 colunas existe só 1 gap, não 2.',
  336: 'Isso é a largura de uma única coluna. A pergunta é sobre quando aparecem 2.',
  1056: 'Essa seria a largura para 3 colunas. A pergunta é sobre 2.',
}

const dicasVisiveis = ref(0)

const valor = computed(() => Number(String(palpite.value).replace(',', '.').replace(/px/i, '').trim()))

const retorno = computed(() => {
  if (!verificado.value) return null
  if (!Number.isFinite(valor.value) || String(palpite.value).trim() === '') {
    return { tipo: 'aviso', texto: 'Digite um número em px, por exemplo 500.' }
  }
  if (valor.value === RESPOSTA) {
    return {
      tipo: 'certo',
      texto: 'Isso! Com a fonte "Muito grande", as 2 colunas só aparecem a partir de 696px de contêiner.',
    }
  }
  return {
    tipo: 'erro',
    texto: errosComuns[valor.value] ?? 'Ainda não. Peça uma dica abaixo ou volte aos laboratórios.',
  }
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
    resumo="Uma pergunta que só se responde usando o próprio guia. Ela junta dois laboratórios e duas perguntas-guia: você vai precisar do Simulador de Leitura, do Construtor de Dashboard e entender de verdade o que é 1rem."
  >
    <section class="desafio" aria-labelledby="desafio-pergunta">
      <p class="desafio__selo">O desafio</p>
      <h2 id="desafio-pergunta" class="desafio__pergunta">
        A Dona Lúcia tem baixa visão e deixa o navegador sempre com a fonte
        <strong>"Muito grande"</strong>, a última opção do nosso Laboratório 01. Ela abre o
        Laboratório 02 sem mexer nos valores padrão. A partir de qual largura do contêiner, em px,
        ela vê os cartões em <strong>2 colunas</strong>?
      </h2>
      <p class="desafio__nota">
        Atenção: aqui 1rem não vale 16px. Descubra o valor certo usando o guia.
      </p>

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
        <RouterLink class="botao botao--contorno" to="/unidades#lab-1-titulo">Ir para o Laboratório 01</RouterLink>
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
          <li><span>Lab 01</span> "Muito grande" = 24px, então 1rem = 24px</li>
          <li><span>Lab 02</span> padrão: minmax(14rem, 1fr) e gap 1rem</li>
          <li><span>Colunas</span> 2 × 14rem = 28rem</li>
          <li><span>Gap</span> 1 espaço entre 2 colunas = 1rem</li>
          <li><span>Total</span> 28rem + 1rem = 29rem</li>
          <li><span>Em px</span> 29 × 24px = <strong>696px</strong></li>
        </ol>
        <p>
          A conta em rem é a mesma da Pergunta-guia 3 (29rem). O que muda é o valor de 1rem: como
          explica a Pergunta-guia 2, ele acompanha a fonte escolhida no navegador. Para a Dona
          Lúcia, 29rem valem 696px, não 464px.
        </p>
        <p>
          <strong>Por que isso é bom:</strong> como os cartões cresceram junto com o texto, o grid
          espera ter mais espaço antes de dividir a tela em duas colunas. Assim o texto grande nunca
          fica espremido. Com <code>minmax(224px, 1fr)</code> em px, as colunas se dividiriam nos
          mesmos 464px e as letras grandes ficariam apertadas dentro de cartões estreitos.
        </p>
        <p>
          <strong>Quer conferir?</strong> Mude a fonte do seu navegador para "Muito grande" (no
          Chrome: Configurações › Aparência › Tamanho da fonte) e abra o Laboratório 02. Com 14 e 1
          nos campos, a linha da conta vai mostrar "com 1rem = 24px" e a próxima coluna em 696px.
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
  font-size: var(--titulo-sm);
  hyphens: manual;
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
