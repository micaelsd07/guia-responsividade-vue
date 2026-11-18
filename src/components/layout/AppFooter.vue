<script setup>
import { secoes } from '@/data/secoes'
import { fotos } from '@/data/fotos'
</script>

<template>
  <footer class="rodape">
    <div class="wrap rodape__grade">
      <p class="rodape__marca" aria-hidden="true">Elástico</p>
      <div class="rodape__coluna">
        <p class="label">Seções</p>
        <ol>
          <li v-for="secao in secoes" :key="secao.nome">
            <RouterLink :to="secao.caminho">{{ secao.numero }} · {{ secao.titulo }}</RouterLink>
          </li>
        </ol>
      </div>
      <div class="rodape__coluna">
        <p class="label">Colofão</p>
        <p>
          Feito com Vue 3, Vite, Vue Router e GSAP. Tipografia: Instrument Sans, Inter e IBM Plex Mono.
          Todo o layout é mobile-first, com fontes e espaçamentos em <code>rem</code>.
        </p>
      </div>
      <div class="rodape__coluna">
        <p class="label">Fotografias</p>
        <ul>
          <li v-for="foto in Object.values(fotos)" :key="foto.nome">
            <a :href="foto.url" target="_blank" rel="noopener noreferrer">{{ foto.autor === 'Pexels' ? 'Acervo Pexels' : `${foto.autor} / Pexels` }}</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  margin-top: var(--space-section);
  padding: var(--space-7) 0 var(--space-8);
  background: var(--color-dark);
  color: var(--color-on-dark-2);
  font-size: var(--text-sm);
}

.rodape__grade {
  display: grid;
  gap: var(--space-6);
}

.rodape__marca {
  font-family: var(--font-heading);
  font-size: clamp(3.5rem, 2rem + 9vw, 10rem);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: var(--color-on-dark);
}

.rodape__coluna {
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

.rodape__coluna .label {
  color: var(--color-signal);
}

.rodape ol,
.rodape ul {
  display: grid;
  gap: var(--space-1);
  padding: 0;
  list-style: none;
}

.rodape a {
  color: var(--color-on-dark);
  text-decoration-color: var(--color-dark-line);
}

.rodape a:hover {
  color: var(--color-signal);
}

.rodape code {
  background: var(--color-dark-3);
  color: var(--color-on-dark);
}

@media (min-width: 48rem) {
  .rodape__grade {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .rodape__marca {
    grid-column: 1 / -1;
  }
}
</style>
