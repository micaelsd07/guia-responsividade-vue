<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { secoes } from '@/data/secoes'
import { laboratorios } from '@/data/labs'
import { useTopicoAtivo } from '@/composables/useScroll'
import { useViewport } from '@/composables/useViewport'
import { ui, alternarGrade } from '@/composables/useUi'

const props = defineProps({
  progresso: { type: Number, default: 0 },
})

const route = useRoute()
const indiceAtual = computed(() => secoes.findIndex((secao) => secao.nome === route.meta.secao))
const secaoAtual = computed(() => secoes[indiceAtual.value])
const { ativo, recalcular } = useTopicoAtivo(() => secaoAtual.value?.topicos.map((topico) => topico.id) ?? [])
const { rotulo } = useViewport()

const percentual = computed(() => Math.round(props.progresso * 100))

watch(() => route.path, recalcular)
</script>

<template>
  <aside class="sidebar" aria-label="Navegação do guia">
    <div class="sidebar__fixa">
      <RouterLink to="/" class="sidebar__marca">
        <span class="sidebar__nome">Elástico</span>
        <span class="sidebar__sub">Guia de responsividade</span>
      </RouterLink>

      <div class="sidebar__progresso">
        <p class="sidebar__contagem">
          <span class="label">Seção</span>
          <span v-if="indiceAtual >= 0">{{ secaoAtual.numero }}<span class="sidebar__total">/0{{ secoes.length }}</span></span>
          <span v-else>—</span>
        </p>
        <ol class="sidebar__segmentos" aria-hidden="true">
          <li
            v-for="(secao, i) in secoes"
            :key="secao.nome"
            :class="{ 'is-feito': i < indiceAtual, 'is-atual': i === indiceAtual }"
          >
            <span v-if="i === indiceAtual" :style="{ transform: `scaleX(${progresso})` }"></span>
          </li>
        </ol>
        <p class="sidebar__leitura">{{ percentual }}% desta página lida</p>
      </div>

      <nav class="sidebar__nav" aria-label="Seções">
        <ol>
          <li v-for="secao in secoes" :key="secao.nome" :class="{ 'is-atual': secao.nome === route.meta.secao }">
            <RouterLink :to="secao.caminho" class="sidebar__secao" :aria-current="secao.nome === route.meta.secao ? 'page' : undefined">
              <span class="sidebar__numero">{{ secao.numero }}</span>
              <span>{{ secao.curto }}</span>
            </RouterLink>
            <ul v-if="secao.nome === route.meta.secao" class="sidebar__topicos">
              <li v-for="topico in secao.topicos" :key="topico.id">
                <a :href="`#${topico.id}`" :class="{ 'is-ativo': ativo === topico.id }" :aria-current="ativo === topico.id ? 'location' : undefined">
                  {{ topico.rotulo }}
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </nav>

      <div class="sidebar__acoes">
        <RouterLink to="/laboratorios" class="btn btn--hard sidebar__labs">
          Laboratórios <span class="sidebar__badge">{{ laboratorios.length }}</span>
        </RouterLink>
        <div class="sidebar__ferramentas">
          <button type="button" class="btn btn--small btn--ghost" :aria-pressed="ui.gradeVisivel" @click="alternarGrade">
            Grade {{ ui.gradeVisivel ? 'on' : 'off' }} <kbd>G</kbd>
          </button>
          <span class="sidebar__chip" title="Largura da janela e breakpoint ativo">{{ rotulo }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: none;
}

@media (min-width: 64rem) {
  .sidebar {
    display: block;
    border-right: var(--border-strong);
    background: var(--color-paper);
  }

  .sidebar__fixa {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    height: 100dvh;
    padding: var(--space-5) var(--space-5) var(--space-4);
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .sidebar__marca {
    display: grid;
    text-decoration: none;
  }

  .sidebar__nome {
    font-family: var(--font-heading);
    font-size: 1.75rem;
    font-weight: 700;
    font-stretch: 75%;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .sidebar__sub {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--color-ink-3);
  }

  .sidebar__progresso {
    display: grid;
    gap: var(--space-2);
    padding-block: var(--space-3);
    border-block: var(--border-strong);
  }

  .sidebar__contagem {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    font-stretch: 75%;
  }

  .sidebar__total {
    color: var(--color-ink-3);
  }

  .sidebar__segmentos {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.1875rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sidebar__segmentos li {
    position: relative;
    height: 0.3125rem;
    background: var(--color-rule);
    overflow: hidden;
  }

  .sidebar__segmentos li.is-feito {
    background: var(--color-ink);
  }

  .sidebar__segmentos li span {
    position: absolute;
    inset: 0;
    background: var(--color-accent);
    transform-origin: 0 50%;
  }

  .sidebar__leitura {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--color-ink-3);
  }

  .sidebar__nav ol {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sidebar__secao {
    display: grid;
    grid-template-columns: 1.75rem 1fr;
    align-items: baseline;
    padding: var(--space-2) 0;
    font-size: var(--text-sm);
    font-weight: 500;
    text-decoration: none;
    color: var(--color-ink-2);
  }

  .sidebar__secao:hover {
    color: var(--color-accent);
  }

  .sidebar__numero {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--color-ink-3);
  }

  .is-atual > .sidebar__secao {
    color: var(--color-ink);
    font-weight: 600;
  }

  .is-atual > .sidebar__secao .sidebar__numero {
    color: var(--color-accent);
  }

  .sidebar__topicos {
    display: grid;
    margin: 0 0 var(--space-2) 1.75rem;
    padding: 0;
    list-style: none;
    border-left: var(--border-soft);
  }

  .sidebar__topicos a {
    position: relative;
    display: block;
    padding: 0.3125rem 0 0.3125rem var(--space-3);
    font-size: var(--text-xs);
    line-height: 1.35;
    color: var(--color-ink-3);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .sidebar__topicos a::before {
    content: '';
    position: absolute;
    left: -0.0625rem;
    top: 0.25rem;
    bottom: 0.25rem;
    width: 0.125rem;
    background: var(--color-accent);
    transform: scaleY(0);
    transition: transform var(--duration-base) var(--ease-out);
  }

  .sidebar__topicos a:hover,
  .sidebar__topicos a.is-ativo {
    color: var(--color-ink);
  }

  .sidebar__topicos a.is-ativo::before {
    transform: scaleY(1);
  }

  .sidebar__acoes {
    display: grid;
    gap: var(--space-3);
    margin-top: auto;
  }

  .sidebar__labs {
    justify-content: space-between;
  }

  .sidebar__badge {
    padding: 0 var(--space-2);
    background: var(--color-signal);
    color: var(--color-ink);
  }

  .sidebar__ferramentas {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .sidebar__ferramentas kbd {
    padding: 0 0.25rem;
    border: var(--border-soft);
    border-radius: var(--radius-xs);
    font-size: var(--text-2xs);
  }

  .sidebar__chip {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--color-ink-3);
    white-space: nowrap;
  }
}
</style>
