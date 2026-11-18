<script setup>
import { reactive } from 'vue'

const animaisIniciais = [
  { id: 1, nome: 'Capivara', cor: '#8d6cf0' },
  { id: 2, nome: 'Tamanduá', cor: '#f0b545' },
  { id: 3, nome: 'Arara-azul', cor: '#5b34c9' },
  { id: 4, nome: 'Lobo-guará', cor: '#0b7a55' },
]

const estado = reactive({
  A: { animais: [...animaisIniciais], versao: 0 },
  B: { animais: [...animaisIniciais], versao: 0 },
})

function removerPrimeiro(lista) {
  estado[lista].animais = estado[lista].animais.slice(1)
}

function restaurar(lista) {
  estado[lista].animais = [...animaisIniciais]
  estado[lista].versao++
}
</script>

<template>
  <div class="bug">
    <ol class="bug__passos">
      <li>Digite algo no campo do <strong>Tamanduá</strong> (2º animal) nas <strong>duas</strong> listas.</li>
      <li>Clique em <strong>Remover 1º animal</strong> nas duas listas.</li>
      <li>Compare: em qual lista o texto continuou ao lado do Tamanduá?</li>
    </ol>

    <div class="bug__listas">
      <section class="lista lista--erro" aria-labelledby="lista-a-titulo">
        <header class="lista__topo">
          <p class="lista__selo">Lista A</p>
          <h3 id="lista-a-titulo" class="lista__titulo">
            <code>v-for</code> <strong>sem</strong> <code>:key</code>
          </h3>
        </header>
        <div class="lista__acoes">
          <button
            type="button"
            class="botao"
            :disabled="estado.A.animais.length === 0"
            @click="removerPrimeiro('A')"
          >
            Remover 1º Animal
          </button>
          <button type="button" class="botao botao--contorno" @click="restaurar('A')">
            Restaurar
          </button>
        </div>
        <ul :key="estado.A.versao" class="lista__itens">
          <li v-for="animal in estado.A.animais" class="item">
            <span class="item__nome">
              <span class="item__cor" :style="{ background: animal.cor }" aria-hidden="true"></span>
              {{ animal.nome }}
            </span>
            <input
              type="text"
              class="item__campo"
              :placeholder="`Apelido para ${animal.nome}`"
              :aria-label="`Apelido para ${animal.nome} (lista A)`"
            />
          </li>
        </ul>
        <p v-if="estado.A.animais.length === 0" class="lista__vazia">Lista vazia. Clique em Restaurar.</p>
      </section>

      <section class="lista lista--ok" aria-labelledby="lista-b-titulo">
        <header class="lista__topo">
          <p class="lista__selo">Lista B</p>
          <h3 id="lista-b-titulo" class="lista__titulo">
            <code>v-for</code> <strong>com</strong> <code>:key="animal.id"</code>
          </h3>
        </header>
        <div class="lista__acoes">
          <button
            type="button"
            class="botao"
            :disabled="estado.B.animais.length === 0"
            @click="removerPrimeiro('B')"
          >
            Remover 1º Animal
          </button>
          <button type="button" class="botao botao--contorno" @click="restaurar('B')">
            Restaurar
          </button>
        </div>
        <ul :key="estado.B.versao" class="lista__itens">
          <li v-for="animal in estado.B.animais" :key="animal.id" class="item">
            <span class="item__nome">
              <span class="item__cor" :style="{ background: animal.cor }" aria-hidden="true"></span>
              {{ animal.nome }}
            </span>
            <input
              type="text"
              class="item__campo"
              :placeholder="`Apelido para ${animal.nome}`"
              :aria-label="`Apelido para ${animal.nome} (lista B)`"
            />
          </li>
        </ul>
        <p v-if="estado.B.animais.length === 0" class="lista__vazia">Lista vazia. Clique em Restaurar.</p>
      </section>
    </div>

    <p class="bug__nota">
      Os campos de texto aqui <strong>não</strong> usam <code>v-model</code> de propósito: o texto
      digitado vive só no DOM, como acontece com qualquer estado que o Vue não controla (foco,
      seleção, animações, componentes de terceiros).
    </p>
  </div>
</template>

<style scoped>
.bug {
  display: grid;
  gap: var(--espaco-5);
  min-width: 0;
}

.bug__passos {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: var(--espaco-4) var(--espaco-4) var(--espaco-4) var(--espaco-6);
  border-radius: var(--raio-md);
  background: var(--cor-ambar-suave);
  font-size: var(--texto-sm);
}

.bug__listas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: var(--espaco-5);
}

.lista {
  display: grid;
  align-content: start;
  gap: var(--espaco-4);
  min-width: 0;
  padding: var(--espaco-4);
  border-radius: var(--raio-md);
  border: var(--borda);
  border-top: 0.25rem solid var(--cor-erro);
  background: var(--cor-papel);
}

.lista--ok {
  border-top-color: var(--cor-sucesso);
}

.lista__topo {
  display: grid;
  gap: var(--espaco-1);
}

.lista__selo {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-erro);
}

.lista--ok .lista__selo {
  color: var(--cor-sucesso);
}

.lista__titulo {
  font-family: var(--fonte-texto);
  font-size: var(--texto-lg);
  font-weight: 500;
}

.lista__acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}

.lista__itens {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  display: grid;
  gap: var(--espaco-2);
  padding: var(--espaco-3);
  border-radius: var(--raio-sm);
  border: var(--borda);
  background: var(--cor-superficie);
}

.item__nome {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-2);
  font-weight: 600;
}

.item__cor {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.item__campo {
  width: 100%;
  min-width: 0;
  min-height: 2.5rem;
  padding: var(--espaco-2) var(--espaco-3);
  border: var(--espessura) solid var(--cor-linha-forte);
  border-radius: var(--raio-sm);
  font-size: var(--texto-base);
}

.lista__vazia {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.bug__nota {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
  max-width: var(--largura-leitura);
}

@media (min-width: 36rem) {
  .item {
    grid-template-columns: minmax(7rem, auto) 1fr;
    align-items: center;
  }
}
</style>
