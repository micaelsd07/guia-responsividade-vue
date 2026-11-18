<script setup>
const nos = [
  { nivel: 0, nome: 'src/', tipo: 'pasta' },
  { nivel: 1, nome: 'assets/styles/main.css', tipo: 'arquivo', nota: 'design tokens no :root e estilos globais' },
  { nivel: 1, nome: 'components/', tipo: 'pasta' },
  { nivel: 2, nome: 'layout/', tipo: 'pasta', nota: 'AppSidebar, MobileDock, MenuIndice: aparecem em todas as páginas' },
  { nivel: 2, nome: 'guia/', tipo: 'pasta', nota: 'peças editoriais reutilizáveis: AberturaSecao, BancadaLab, CodigoEditor' },
  { nivel: 2, nome: 'controles/', tipo: 'pasta', nota: 'CampoFaixa, CampoSegmentado: inputs acessíveis' },
  { nivel: 2, nome: 'demos/', tipo: 'pasta', nota: 'demonstrações visuais: VitrineDispositivos, MiniSite' },
  { nivel: 2, nome: 'labs/', tipo: 'pasta', nota: 'os sete laboratórios, um componente cada' },
  { nivel: 1, nome: 'composables/', tipo: 'pasta', nota: 'lógica reutilizável: useMotion, useViewport, useScroll' },
  { nivel: 1, nome: 'data/', tipo: 'pasta', nota: 'conteúdo separado da apresentação: seções, fontes, exemplos' },
  { nivel: 1, nome: 'router/index.js', tipo: 'arquivo', nota: 'rotas carregadas sob demanda' },
  { nivel: 1, nome: 'views/', tipo: 'pasta', nota: 'uma view por rota: ImportanciaView, UnidadesView…' },
  { nivel: 1, nome: 'App.vue', tipo: 'arquivo', nota: 'casca: navegação, transição entre páginas' },
  { nivel: 1, nome: 'main.js', tipo: 'arquivo' },
]
</script>

<template>
  <figure class="arvore">
    <figcaption class="label arvore__titulo">A estrutura real deste guia</figcaption>
    <ul class="arvore__lista">
      <li v-for="no in nos" :key="no.nome" class="no" :style="{ '--nivel': no.nivel }" data-reveal>
        <span class="no__nome" :class="`no__nome--${no.tipo}`">{{ no.nome }}</span>
        <span v-if="no.nota" class="no__nota">{{ no.nota }}</span>
      </li>
    </ul>
  </figure>
</template>

<style scoped>
.arvore {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.arvore__titulo {
  color: var(--color-ink-3);
}

.arvore__lista {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.no {
  display: grid;
  gap: 0.125rem;
  padding: var(--space-2) 0 var(--space-2) calc(var(--nivel) * 1.25rem);
  border-bottom: var(--border-soft);
}

.no__nome {
  position: relative;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.no__nome--pasta {
  color: var(--color-accent-ink);
}

.no__nome::before {
  content: '';
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: var(--space-2);
  border: var(--hairline) solid currentColor;
}

.no__nome--pasta::before {
  background: currentColor;
}

.no__nota {
  padding-left: 1rem;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

@media (min-width: 48rem) {
  .no {
    grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
    align-items: baseline;
    gap: var(--space-4);
  }

  .no__nota {
    padding-left: 0;
  }
}
</style>
