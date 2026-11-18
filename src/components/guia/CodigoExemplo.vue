<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  codigo: { type: String, required: true },
  arquivo: { type: String, default: '' },
  linguagem: { type: String, default: 'css' },
})

const copiado = ref(false)
const marcadorComentario = /(^|\s)(\/\/|\/\*|<!--)/

function fecharBloco(texto, abertura) {
  const fim = abertura === '<!--' ? '-->' : '*/'
  return texto.includes(fim)
}

const linhas = computed(() => {
  let blocoAberto = null

  return props.codigo
    .replace(/^\n+|\s+$/g, '')
    .split('\n')
    .map((linha) => {
      if (blocoAberto) {
        if (fecharBloco(linha, blocoAberto)) blocoAberto = null
        return [{ texto: linha, comentario: true }]
      }

      const encontrado = linha.match(marcadorComentario)
      if (!encontrado) return [{ texto: linha, comentario: false }]

      const inicio = encontrado.index + encontrado[1].length
      const abertura = encontrado[2]
      const resto = linha.slice(inicio)

      if (abertura !== '//' && !fecharBloco(resto, abertura)) blocoAberto = abertura

      return [
        { texto: linha.slice(0, inicio), comentario: false },
        { texto: resto, comentario: true },
      ].filter((parte) => parte.texto.length > 0)
    })
})

async function copiar() {
  try {
    await navigator.clipboard.writeText(props.codigo.trim())
    copiado.value = true
    setTimeout(() => (copiado.value = false), 1800)
  } catch {
    copiado.value = false
  }
}
</script>

<template>
  <figure class="codigo">
    <figcaption class="codigo__barra">
      <span class="codigo__arquivo">{{ arquivo || 'exemplo' }}</span>
      <span class="codigo__acoes">
        <span class="codigo__lingua">{{ linguagem }}</span>
        <button type="button" class="codigo__copiar" @click="copiar">
          {{ copiado ? 'Copiado!' : 'Copiar' }}
        </button>
      </span>
    </figcaption>
    <pre class="codigo__pre"><code><span v-for="(linha, i) in linhas" :key="i" class="codigo__linha"><span v-for="(parte, j) in linha" :key="j" :class="{ 'codigo__comentario': parte.comentario }">{{ parte.texto }}</span></span></code></pre>
  </figure>
</template>

<style scoped>
.codigo {
  margin: 0;
  min-width: 0;
  border-radius: var(--raio-md);
  background: var(--cor-roxo-950);
  color: #ece8f6;
  overflow: hidden;
}

.codigo__barra {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
  padding: var(--espaco-2) var(--espaco-4);
  border-bottom: var(--espessura) solid rgb(255 255 255 / 0.08);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
}

.codigo__arquivo {
  color: var(--cor-ambar);
  overflow-wrap: anywhere;
}

.codigo__acoes {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-3);
}

.codigo__lingua {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--cor-roxo-400);
}

.codigo__copiar {
  min-height: 2rem;
  padding: var(--espaco-1) var(--espaco-3);
  border: var(--espessura) solid rgb(255 255 255 / 0.18);
  border-radius: var(--raio-sm);
  background: transparent;
  color: #fff;
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
}

.codigo__copiar:hover {
  background: rgb(255 255 255 / 0.08);
}

.codigo__pre {
  padding: var(--espaco-4);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
  line-height: 1.7;
  tab-size: 2;
}

.codigo__linha {
  display: block;
  min-height: 1.7em;
}

.codigo__comentario {
  color: #a99ad0;
  font-style: italic;
}

@media (min-width: 48rem) {
  .codigo__pre {
    padding: var(--espaco-5);
  }
}
</style>
