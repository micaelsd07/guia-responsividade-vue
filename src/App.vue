<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import IndicadorViewport from '@/components/layout/IndicadorViewport.vue'
</script>

<template>
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>
  <TheHeader />
  <main id="conteudo" class="conteudo" tabindex="-1">
    <RouterView />
  </main>
  <TheFooter />
  <IndicadorViewport />
</template>

<style scoped>
.pular {
  position: absolute;
  left: var(--espaco-4);
  top: -10rem;
  z-index: 100;
  padding: var(--espaco-2) var(--espaco-4);
  border-radius: var(--raio-sm);
  background: var(--cor-ambar);
  color: var(--cor-roxo-950);
  font-weight: 600;
}

.pular:focus {
  top: var(--espaco-2);
}

.conteudo {
  display: block;
  outline: none;
}
</style>
