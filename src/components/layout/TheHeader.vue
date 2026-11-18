<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { secoes } from '@/data/secoes'

const menuAberto = ref(false)
const route = useRoute()

function alternarMenu() {
  menuAberto.value = !menuAberto.value
}

function fecharComEsc(evento) {
  if (evento.key === 'Escape') menuAberto.value = false
}

watch(
  () => route.fullPath,
  () => {
    menuAberto.value = false
  },
)

onMounted(() => window.addEventListener('keydown', fecharComEsc))
onBeforeUnmount(() => window.removeEventListener('keydown', fecharComEsc))
</script>

<template>
  <header class="topo">
    <div class="topo__barra">
      <RouterLink to="/importancia" class="marca" aria-label="Elástico, página inicial">
        <span class="marca__icone" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span class="marca__nome">Elástico</span>
        <span class="marca__sub">guia de responsividade</span>
      </RouterLink>

      <button
        type="button"
        class="hamburguer"
        :class="{ 'hamburguer--aberto': menuAberto }"
        :aria-expanded="menuAberto"
        aria-controls="menu-principal"
        @click="alternarMenu"
      >
        <span class="hamburguer__linhas" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span class="hamburguer__texto">{{ menuAberto ? 'Fechar' : 'Menu' }}</span>
      </button>

      <nav
        id="menu-principal"
        class="menu"
        :class="{ 'menu--aberto': menuAberto }"
        aria-label="Seções do guia"
      >
        <ul class="menu__lista">
          <li v-for="secao in secoes" :key="secao.nome">
            <RouterLink :to="secao.caminho" class="menu__link">
              <span class="menu__numero">{{ secao.numero }}</span>
              <span>{{ secao.curto }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.topo {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(250 249 252 / 0.92);
  backdrop-filter: saturate(1.4) blur(0.5rem);
  border-bottom: var(--borda);
}

.topo__barra {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-4);
  max-width: var(--largura-max);
  min-height: var(--altura-header);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.marca {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-2);
  min-width: 0;
  overflow: hidden;
  color: var(--cor-roxo-900);
  text-decoration: none;
}

.marca__icone {
  display: grid;
  gap: 0.1875rem;
  width: 1.75rem;
  padding: 0.3125rem;
  border-radius: var(--raio-sm);
  background: var(--cor-roxo-800);
  flex-shrink: 0;
}

.marca__icone span {
  display: block;
  height: 0.25rem;
  border-radius: 1rem;
  background: var(--cor-roxo-200);
}

.marca__icone span:first-child {
  background: var(--cor-ambar);
}

.marca__icone span:nth-child(2) {
  width: 70%;
}

.marca__icone span:nth-child(3) {
  width: 45%;
}

.marca__nome {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--fonte-titulo);
  font-size: var(--titulo-sm);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.marca__sub {
  display: none;
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  color: var(--cor-tinta-suave);
}

.hamburguer {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-2);
  min-height: 2.75rem;
  padding: var(--espaco-2) var(--espaco-3);
  border: var(--espessura) solid var(--cor-linha-forte);
  border-radius: var(--raio-sm);
  background: var(--cor-superficie);
  font-size: var(--texto-sm);
  font-weight: 600;
  color: var(--cor-roxo-800);
  flex-shrink: 0;
}

.hamburguer__linhas {
  display: grid;
  gap: 0.25rem;
  width: 1.125rem;
}

.hamburguer__linhas span {
  display: block;
  height: 0.125rem;
  border-radius: 1rem;
  background: currentColor;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hamburguer--aberto .hamburguer__linhas span:nth-child(1) {
  transform: translateY(0.375rem) rotate(45deg);
}

.hamburguer--aberto .hamburguer__linhas span:nth-child(2) {
  opacity: 0;
}

.hamburguer--aberto .hamburguer__linhas span:nth-child(3) {
  transform: translateY(-0.375rem) rotate(-45deg);
}

.menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: var(--espaco-3) var(--gutter) var(--espaco-5);
  background: var(--cor-papel);
  border-bottom: var(--borda);
  box-shadow: var(--sombra);
}

.menu--aberto {
  display: block;
}

.menu__lista {
  display: grid;
  gap: var(--espaco-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu__link {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  min-height: 3rem;
  padding: var(--espaco-2) var(--espaco-3);
  border-radius: var(--raio-sm);
  color: var(--cor-tinta);
  font-weight: 500;
  text-decoration: none;
}

.menu__link:hover {
  background: var(--cor-roxo-50);
  color: var(--cor-roxo-800);
}

.menu__numero {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  color: var(--cor-roxo-600);
}

.menu__link.router-link-active {
  background: var(--cor-roxo-100);
  color: var(--cor-roxo-900);
  font-weight: 600;
}

@media (min-width: 36rem) {
  .marca__sub {
    display: inline;
    padding-left: var(--espaco-2);
    border-left: var(--borda);
  }
}

@media (min-width: 64rem) {
  .hamburguer {
    display: none;
  }

  .menu {
    display: block;
    position: static;
    padding: 0;
    background: none;
    border: 0;
    box-shadow: none;
  }

  .menu__lista {
    display: flex;
    gap: var(--espaco-1);
  }

  .menu__link {
    min-height: 2.5rem;
    gap: var(--espaco-2);
    padding: var(--espaco-1) var(--espaco-3);
    font-size: var(--texto-sm);
  }

  .marca__sub {
    display: none;
  }
}

@media (min-width: 80rem) {
  .marca__sub {
    display: inline;
  }
}
</style>
