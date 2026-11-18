<script setup>
import { computed, ref } from 'vue'
import { realcarCodigo } from '@/utils/realcarCodigo'

const props = defineProps({
  codigo: { type: String, required: true },
  arquivo: { type: String, default: '' },
  linguagem: { type: String, default: 'css' },
  variante: { type: String, default: 'padrao' },
  destaque: { type: Array, default: () => [] },
})

const copiado = ref(false)
const linhas = computed(() => realcarCodigo(props.codigo, props.linguagem))
const rotuloVariante = { ruim: 'Evite', bom: 'Prefira' }

async function copiar() {
  try {
    await navigator.clipboard.writeText(props.codigo.trim())
    copiado.value = true
    setTimeout(() => (copiado.value = false), 1600)
  } catch {
    copiado.value = false
  }
}
</script>

<template>
  <figure class="editor" :class="`editor--${variante}`">
    <figcaption class="editor__barra">
      <span class="editor__pontos" aria-hidden="true"><span></span><span></span><span></span></span>
      <span class="editor__arquivo">{{ arquivo || 'exemplo' }}</span>
      <span v-if="rotuloVariante[variante]" class="editor__selo">{{ rotuloVariante[variante] }}</span>
      <span class="editor__lingua">{{ linguagem }}</span>
      <button type="button" class="editor__copiar" @click="copiar">
        {{ copiado ? 'Copiado' : 'Copiar' }}<span class="sr-only"> código de {{ arquivo || 'exemplo' }}</span>
      </button>
    </figcaption>
    <pre class="editor__pre"><code><span v-for="(linha, i) in linhas" :key="i" class="editor__linha" :class="{ 'is-destaque': destaque.includes(i + 1) }"><span class="editor__num" aria-hidden="true">{{ i + 1 }}</span><span class="editor__texto"><span v-for="(parte, j) in linha" :key="j" :class="`t-${parte.tipo}`">{{ parte.texto }}</span></span></span></code></pre>
  </figure>
</template>

<style scoped>
.editor {
  min-width: 0;
  border: var(--hairline) solid var(--color-ink);
  border-radius: var(--radius-sm);
  background: var(--color-dark);
  color: #e9e6f2;
  overflow: hidden;
}

.editor__barra {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-bottom: var(--hairline) solid var(--color-dark-line);
  background: var(--color-dark-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.editor__pontos {
  display: inline-flex;
  gap: 0.3125rem;
}

.editor__pontos span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--color-dark-3);
}

.editor__arquivo {
  flex: 1 1 8rem;
  min-width: 0;
  color: var(--color-on-dark);
  overflow-wrap: anywhere;
}

.editor__selo {
  padding: 0 var(--space-2);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
}

.editor--ruim .editor__selo {
  background: #ff8a70;
  color: var(--color-ink);
}

.editor--bom .editor__selo {
  background: var(--color-signal);
  color: var(--color-ink);
}

.editor--ruim {
  border-top: 0.25rem solid #ff8a70;
}

.editor--bom {
  border-top: 0.25rem solid var(--color-signal);
}

.editor__lingua {
  text-transform: uppercase;
  color: var(--color-on-dark-2);
}

.editor__copiar {
  min-height: 2rem;
  padding: 0 var(--space-3);
  border: var(--hairline) solid var(--color-dark-line);
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-on-dark);
  font-size: var(--text-xs);
}

.editor__copiar:hover {
  border-color: var(--color-signal);
  color: var(--color-signal);
}

.editor__pre {
  padding: var(--space-3) 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.7;
  tab-size: 2;
}

.editor__linha {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  padding-right: var(--space-4);
}

.editor__linha.is-destaque {
  background: rgb(210 243 76 / 0.1);
  box-shadow: inset 0.1875rem 0 0 var(--color-signal);
}

.editor__num {
  padding-right: var(--space-3);
  text-align: right;
  color: #9a93ad;
  user-select: none;
}

.editor__texto {
  min-height: 1.7em;
}

.t-comment {
  color: #9b94b0;
  font-style: italic;
}

.t-string {
  color: #d2f34c;
}

.t-keyword {
  color: #c4b1ff;
}

.t-prop {
  color: #8fd3ff;
}

.t-number {
  color: #ffb088;
}

.t-tag {
  color: #ff9ec4;
}

.t-attr {
  color: #c4b1ff;
}

.t-fn {
  color: #7ee6c4;
}

.t-punct {
  color: #8d86a0;
}

@media (min-width: 48rem) {
  .editor__linha {
    grid-template-columns: 3rem minmax(0, 1fr);
  }
}
</style>
