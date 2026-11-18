<script setup>
import { ref } from 'vue'
import VitrineDispositivos from '@/components/demos/VitrineDispositivos.vue'
import FiguraEditorial from '@/components/guia/FiguraEditorial.vue'
import ListaLaboratorios from '@/components/guia/ListaLaboratorios.vue'
import { secoes } from '@/data/secoes'
import { laboratorios } from '@/data/labs'
import { fotos } from '@/data/fotos'
import { usePageMotion, gsap } from '@/composables/useMotion'

const raiz = ref(null)

const numeros = [
  { valor: 980, sufixo: 'px', texto: 'é a largura que o celular inventa quando a página não tem meta viewport.', secao: '/importancia', numero: '01' },
  { valor: 24, sufixo: 'px', texto: 'passa a valer 1rem quando alguém escolhe a fonte "muito grande" no navegador.', secao: '/unidades', numero: '02' },
  { valor: 464, sufixo: 'px', texto: 'é onde repeat(auto-fit, minmax(14rem, 1fr)) com gap de 1rem abre a segunda coluna.', secao: '/flexbox-grid', numero: '03' },
  { valor: 0.1, casas: 1, sufixo: '', texto: 'é o limite de CLS que o Google considera bom. Acima disso, o conteúdo pula.', secao: '/imagens', numero: '04' },
]

usePageMotion(raiz, (el) => {
  gsap.from(el.querySelectorAll('.heroi__entra'), {
    autoAlpha: 0,
    y: 24,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    delay: 0.45,
  })
  gsap.from(el.querySelector('.heroi__demo'), {
    autoAlpha: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    delay: 0.6,
  })
  gsap.from(el.querySelector('.heroi__linha span'), {
    scaleY: 0,
    transformOrigin: '50% 0%',
    duration: 1,
    ease: 'power2.inOut',
    delay: 1.4,
  })
})
</script>

<template>
  <div ref="raiz" class="home">
    <section class="heroi wrap" aria-labelledby="heroi-titulo">
      <div class="heroi__texto">
        <p class="label heroi__sobre heroi__entra">Elástico · publicação interativa · edição 2026</p>
        <h1 id="heroi-titulo" class="heroi__titulo" data-split="imediato">
          Uma interface.<br />
          <span class="heroi__titulo-2">Qualquer tela.</span>
        </h1>
        <p class="lead heroi__entra">
          Aprenda a construir interfaces que se adaptam naturalmente a qualquer dispositivo, utilizando CSS moderno,
          layouts flexíveis e boas práticas.
        </p>
        <div class="heroi__ctas heroi__entra">
          <RouterLink to="/importancia" class="btn btn--hard">Começar o guia <span aria-hidden="true">→</span></RouterLink>
          <RouterLink to="/laboratorios" class="btn btn--ghost">Explorar os {{ laboratorios.length }} laboratórios</RouterLink>
        </div>
        <a href="#sumario" class="heroi__rolar heroi__entra">
          <span class="heroi__linha" aria-hidden="true"><span></span></span>
          <span class="label">Role para o sumário</span>
        </a>
      </div>

      <div class="heroi__demo">
        <p class="label heroi__fig"><span>Fig. 00</span> A mesma página, do monitor ao celular. Escolha um aparelho ou arraste a largura.</p>
        <VitrineDispositivos />
      </div>
    </section>

    <section id="sumario" class="sumario wrap" aria-labelledby="sumario-titulo">
      <header class="sumario__cabeca grid">
        <p class="label sumario__rotulo">Sumário</p>
        <h2 id="sumario-titulo" class="sumario__titulo" data-split>
          Seis seções, sete laboratórios e uma pergunta-guia respondida em cada capítulo.
        </h2>
      </header>
      <ol class="sumario__lista">
        <li v-for="secao in secoes" :key="secao.nome" data-reveal>
          <RouterLink :to="secao.caminho" class="sumario__item">
            <span class="sumario__numero">{{ secao.numero }}</span>
            <span class="sumario__manchete">
              {{ secao.manchete[0] }} <span>{{ secao.manchete[1] }}</span>
            </span>
            <span class="sumario__topicos">
              <span class="label">{{ secao.titulo }}</span>
              {{ secao.topicos.filter((t) => !t.id.startsWith('pergunta')).map((t) => t.rotulo).join(' · ') }}
            </span>
            <span class="sumario__seta" aria-hidden="true">→</span>
          </RouterLink>
        </li>
      </ol>
    </section>

    <section class="numeros" aria-labelledby="numeros-titulo">
      <div class="wrap">
        <h2 id="numeros-titulo" class="numeros__titulo label">Quatro números que você vai entender até o fim do guia</h2>
        <ol class="numeros__lista">
          <li v-for="item in numeros" :key="item.numero" class="numeros__item" data-reveal>
            <p class="numeros__valor">
              <span :data-count="item.valor" :data-decimals="item.casas ?? 0">{{ String(item.valor).replace('.', ',') }}</span><span class="numeros__sufixo">{{ item.sufixo }}</span>
            </p>
            <p class="numeros__texto">{{ item.texto }}</p>
            <RouterLink :to="item.secao" class="numeros__link">Seção {{ item.numero }} →</RouterLink>
          </li>
        </ol>
      </div>
    </section>

    <section class="ensaio wrap grid" aria-labelledby="ensaio-titulo">
      <div class="ensaio__foto">
        <FiguraEditorial
          :foto="fotos.telasSincronizadas"
          numero="00.1"
          legenda="Monitor, notebooks, tablet e celular exibindo a mesma imagem. O conteúdo é um só; o espaço disponível é que muda."
          sizes="(min-width: 80rem) 60vw, 100vw"
          parallax
        />
      </div>
      <div class="ensaio__texto">
        <p class="label">Ensaio</p>
        <h2 id="ensaio-titulo" class="ensaio__titulo" data-split>Responsivo não é encolher. É reorganizar.</h2>
        <div class="prose" data-reveal>
          <p>
            Um layout responsivo não diminui o site de computador até caber no celular. Ele decide, para cada largura,
            onde cada peça fica: o menu vira botão, as colunas se empilham, as imagens trocam de arquivo.
          </p>
          <p>
            Este guia é ele mesmo um exemplo: abra-o no celular, ative a <strong>grade</strong> no topo (ou aperte
            <kbd>G</kbd>) e veja as colunas mudarem de 4 para 8 e para 12.
          </p>
        </div>
        <RouterLink to="/importancia" class="btn btn--hard" data-reveal>Ler a seção 01 →</RouterLink>
      </div>
    </section>

    <section class="vitrine-labs wrap" aria-labelledby="labs-titulo">
      <header class="vitrine-labs__cabeca">
        <p class="label">Laboratórios</p>
        <h2 id="labs-titulo" class="vitrine-labs__titulo" data-split>Aprender mexendo.</h2>
        <p class="lead" data-reveal>Cada laboratório tem controles, um palco ao vivo, o código gerado e uma narração do que está acontecendo.</p>
      </header>
      <ListaLaboratorios compacta />
    </section>
  </div>
</template>

<style scoped>
.heroi {
  display: grid;
  gap: var(--space-7);
  padding-top: var(--space-6);
}

.heroi__texto {
  display: grid;
  align-content: start;
  gap: var(--space-5);
}

.heroi__sobre {
  color: var(--color-ink-3);
}

.heroi__titulo {
  font-size: clamp(3.5rem, 1.8rem + 6.4vw, 7.25rem);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.9;
  letter-spacing: -0.04em;
  word-spacing: 0.12em;
}

.heroi__titulo-2 {
  color: var(--color-accent);
}

.heroi__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.heroi__rolar {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  justify-self: start;
  min-height: 2.75rem;
  color: var(--color-ink-3);
  text-decoration: none;
}

.heroi__linha {
  position: relative;
  width: 0.0625rem;
  height: 2.75rem;
  background: var(--color-rule);
}

.heroi__linha span {
  position: absolute;
  inset: 0;
  background: var(--color-ink);
}

.heroi__demo {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.heroi__fig {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  text-transform: none;
  letter-spacing: 0;
  color: var(--color-ink-2);
}

.heroi__fig span {
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
}

.sumario {
  padding-top: var(--space-section);
}

.sumario__cabeca {
  row-gap: var(--space-3);
  padding-bottom: var(--space-6);
}

.sumario__rotulo {
  grid-column: 1 / -1;
  color: var(--color-accent);
}

.sumario__titulo {
  grid-column: 1 / -1;
  font-size: var(--heading-lg);
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}

.sumario__lista {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--border-strong);
}

.sumario__lista li {
  border-bottom: var(--border-strong);
}

.sumario__item {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) auto;
  gap: var(--space-2) var(--space-3);
  align-items: baseline;
  padding: var(--space-5) 0;
  text-decoration: none;
  transition:
    background-color var(--duration-base) var(--ease-out),
    padding var(--duration-base) var(--ease-out);
}

.sumario__item:hover {
  background: var(--color-accent);
  color: #fff;
  padding-inline: var(--space-3);
}

.sumario__numero {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.sumario__manchete {
  font-family: var(--font-heading);
  font-size: var(--heading-md);
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1;
  letter-spacing: -0.02em;
}

.sumario__manchete span {
  color: var(--color-ink-3);
}

.sumario__item:hover .sumario__manchete span {
  color: var(--color-accent-soft);
}

.sumario__topicos {
  grid-column: 2;
  display: grid;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-ink-2);
}

.sumario__item:hover .sumario__topicos {
  color: var(--color-accent-soft);
}

.sumario__seta {
  grid-row: 1;
  grid-column: 3;
  font-family: var(--font-mono);
  font-size: var(--text-lg);
}

.numeros {
  margin-top: var(--space-section);
  padding-block: var(--space-8);
  background: var(--color-dark);
  color: var(--color-on-dark);
}

.numeros__titulo {
  padding-bottom: var(--space-5);
  color: var(--color-signal);
}

.numeros__lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: var(--hairline) solid var(--color-on-dark);
}

.numeros__item {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-4) var(--space-5) 0;
  border-bottom: var(--hairline) solid var(--color-dark-line);
}

.numeros__valor {
  font-family: var(--font-heading);
  font-size: clamp(3.25rem, 2.2rem + 4vw, 5.5rem);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.9;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.numeros__sufixo {
  font-size: 0.45em;
  color: var(--color-signal);
}

.numeros__texto {
  max-width: 18rem;
  color: var(--color-on-dark-2);
  font-size: var(--text-sm);
}

.numeros__link {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-signal);
}

.ensaio {
  row-gap: var(--space-6);
  padding-top: var(--space-section);
}

.ensaio__foto,
.ensaio__texto {
  grid-column: 1 / -1;
  min-width: 0;
}

.ensaio__texto {
  display: grid;
  align-content: center;
  justify-items: start;
  gap: var(--space-5);
}

.ensaio__texto > .label {
  color: var(--color-accent);
}

.ensaio__titulo {
  font-size: var(--heading-lg);
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}

.ensaio kbd {
  padding: 0 0.3em;
  border: var(--border-strong);
  border-radius: var(--radius-xs);
  font-size: 0.85em;
}

.vitrine-labs {
  display: grid;
  gap: var(--space-6);
  padding-top: var(--space-section);
}

.vitrine-labs__cabeca {
  display: grid;
  gap: var(--space-4);
}

.vitrine-labs__cabeca > .label {
  color: var(--color-accent);
}

.vitrine-labs__titulo {
  font-size: var(--heading-xl);
  font-weight: 700;
  font-stretch: 75%;
  line-height: 0.92;
  letter-spacing: var(--tracking-tight);
}

@media (min-width: 48rem) {
  .sumario__item {
    grid-template-columns: 4rem minmax(0, 1.2fr) minmax(0, 1fr) auto;
    align-items: center;
  }

  .sumario__topicos {
    grid-column: 3;
  }

  .sumario__seta {
    grid-column: 4;
    grid-row: 1;
  }

  .sumario__titulo {
    grid-column: 1 / span 7;
  }
}

@media (min-width: 64rem) {
  .heroi {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    align-items: start;
    gap: var(--space-7);
    padding-top: var(--space-7);
  }

  .heroi__texto {
    position: sticky;
    top: var(--space-6);
  }
}

@media (min-width: 80rem) {
  .sumario__titulo {
    grid-column: 1 / span 9;
  }

  .ensaio__foto {
    grid-column: 1 / span 7;
  }

  .ensaio__texto {
    grid-column: 9 / -1;
  }
}
</style>
