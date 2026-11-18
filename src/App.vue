<script setup>
import { computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import AppTopbar from '@/components/layout/AppTopbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MobileDock from '@/components/layout/MobileDock.vue'
import MenuIndice from '@/components/layout/MenuIndice.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import GradeSobreposta from '@/components/layout/GradeSobreposta.vue'
import { gsap, ScrollTrigger, movimentoReduzido } from '@/composables/useMotion'
import { useProgressoLeitura } from '@/composables/useScroll'

const route = useRoute()
const progresso = useProgressoLeitura()
const comSidebar = computed(() => !route.meta.capa)

function aoSair(el, concluir) {
  if (movimentoReduzido()) return concluir()
  gsap.to(el, { autoAlpha: 0, y: -12, duration: 0.18, ease: 'power2.in', onComplete: concluir })
}

function aoEntrar(el, concluir) {
  if (!history.state?.scroll) window.scrollTo(0, 0)
  nextTick(() => {
    if (route.hash) document.querySelector(route.hash)?.scrollIntoView()
    ScrollTrigger.refresh()
  })
  if (movimentoReduzido()) return concluir()
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power3.out', clearProps: 'transform,opacity,visibility', onComplete: concluir },
  )
}
</script>

<template>
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>
  <div class="progresso" aria-hidden="true">
    <span :style="{ transform: `scaleX(${progresso})` }"></span>
  </div>
  <AppTopbar :com-sidebar="comSidebar" />
  <div class="shell" :class="{ 'shell--guia': comSidebar }">
    <AppSidebar v-if="comSidebar" :progresso="progresso" />
    <div class="shell__principal">
      <main id="conteudo" class="shell__main" tabindex="-1">
        <RouterView v-slot="{ Component, route: rota }">
          <Transition :css="false" mode="out-in" @leave="aoSair" @enter="aoEntrar">
            <component :is="Component" :key="rota.path" />
          </Transition>
        </RouterView>
        <GradeSobreposta />
      </main>
      <AppFooter />
    </div>
  </div>
  <MobileDock v-if="comSidebar" :progresso="progresso" />
  <MenuIndice />
</template>

<style scoped>
.pular {
  position: absolute;
  left: var(--space-4);
  top: -10rem;
  z-index: 100;
  padding: var(--space-2) var(--space-4);
  background: var(--color-signal);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.pular:focus {
  top: var(--space-2);
}

.progresso {
  position: fixed;
  inset: 0 0 auto;
  z-index: calc(var(--z-nav) + 1);
  height: 0.1875rem;
  pointer-events: none;
}

.progresso span {
  display: block;
  height: 100%;
  background: var(--color-accent);
  transform-origin: 0 50%;
}

.shell__principal {
  min-width: 0;
}

.shell__main {
  position: relative;
  display: block;
  outline: none;
}

.shell--guia .shell__principal {
  padding-bottom: calc(var(--dock-height) + env(safe-area-inset-bottom, 0rem));
}

@media (min-width: 64rem) {
  .shell--guia {
    display: grid;
    grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  }

  .shell--guia .shell__principal {
    padding-bottom: 0;
  }
}
</style>
