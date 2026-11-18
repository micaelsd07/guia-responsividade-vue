<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { secoes } from '@/data/secoes'
import { laboratorios } from '@/data/labs'
import { ui, alternarGrade } from '@/composables/useUi'

const dialogo = ref(null)
const route = useRoute()
const secaoAtual = computed(() => secoes.find((secao) => secao.nome === route.meta.secao))

watch(
  () => ui.menuAberto,
  (aberto) => {
    const el = dialogo.value
    if (!el) return
    if (aberto && !el.open) el.showModal()
    if (!aberto && el.open) el.close()
  },
)

watch(
  () => route.fullPath,
  () => {
    ui.menuAberto = false
  },
)

function aoFechar() {
  ui.menuAberto = false
}

function cliqueFora(evento) {
  if (evento.target === dialogo.value) ui.menuAberto = false
}
</script>

<template>
  <dialog ref="dialogo" class="menu" aria-labelledby="menu-titulo" @close="aoFechar" @click="cliqueFora">
    <div class="menu__painel">
      <header class="menu__topo">
        <p id="menu-titulo" class="label">Índice do guia</p>
        <button type="button" class="btn btn--small btn--ghost" @click="ui.menuAberto = false">Fechar</button>
      </header>

      <nav aria-label="Seções do guia">
        <ol class="menu__secoes">
          <li v-for="secao in secoes" :key="secao.nome">
            <RouterLink :to="secao.caminho" class="menu__secao">
              <span class="menu__numero">{{ secao.numero }}</span>
              <span class="menu__titulo">{{ secao.titulo }}</span>
            </RouterLink>
            <ul v-if="secaoAtual?.nome === secao.nome" class="menu__topicos">
              <li v-for="topico in secao.topicos" :key="topico.id">
                <RouterLink :to="{ path: secao.caminho, hash: `#${topico.id}` }">{{ topico.rotulo }}</RouterLink>
              </li>
            </ul>
          </li>
        </ol>
      </nav>

      <footer class="menu__rodape">
        <RouterLink to="/laboratorios" class="btn btn--hard">Laboratórios ({{ laboratorios.length }})</RouterLink>
        <RouterLink to="/" class="btn btn--ghost">Capa</RouterLink>
        <button type="button" class="btn btn--ghost" :aria-pressed="ui.gradeVisivel" @click="alternarGrade">
          {{ ui.gradeVisivel ? 'Esconder grade' : 'Mostrar grade' }}
        </button>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.menu {
  width: 100%;
  max-width: 100%;
  max-height: min(88dvh, 44rem);
  margin: auto 0 0;
  padding: 0;
  border: 0;
  border-top: var(--border-strong);
  background: var(--color-paper);
  color: var(--color-ink);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.menu[open] {
  animation: menu-sobe var(--duration-slow) var(--ease-out);
}

.menu::backdrop {
  background: rgb(18 16 22 / 0.55);
}

.menu__painel {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-5) var(--gutter) calc(var(--space-6) + env(safe-area-inset-bottom, 0rem));
}

.menu__topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.menu__secoes {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.menu__secoes > li {
  border-bottom: var(--border-soft);
}

.menu__secao {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  align-items: baseline;
  gap: var(--space-2);
  min-height: 3.25rem;
  padding: var(--space-3) 0;
  text-decoration: none;
}

.menu__numero {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
}

.menu__titulo {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 600;
  font-stretch: 80%;
  line-height: 1.15;
}

.menu__secao.router-link-active .menu__titulo {
  color: var(--color-accent);
}

.menu__topicos {
  display: grid;
  gap: var(--space-1);
  margin: 0 0 var(--space-4) 2.5rem;
  padding: 0 0 0 var(--space-3);
  border-left: 0.125rem solid var(--color-accent);
  list-style: none;
  font-size: var(--text-sm);
}

.menu__topicos a {
  display: block;
  padding: var(--space-1) 0;
  color: var(--color-ink-2);
}

.menu__rodape {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

@keyframes menu-sobe {
  from {
    transform: translateY(1.5rem);
    opacity: 0;
  }
}

@media (min-width: 48rem) {
  .menu {
    width: 30rem;
    max-height: 100dvh;
    height: 100dvh;
    margin: 0 0 0 auto;
    border-top: 0;
    border-left: var(--border-strong);
  }

  .menu[open] {
    animation-name: menu-entra;
  }

  @keyframes menu-entra {
    from {
      transform: translateX(2rem);
      opacity: 0;
    }
  }
}
</style>
