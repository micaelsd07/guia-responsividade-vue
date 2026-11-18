<script setup>
const produtos = [
  { nome: 'Cesta da estação', preco: 'R$ 89', cor: '#5b2be0' },
  { nome: 'Folhas e ervas', preco: 'R$ 24', cor: '#11704a' },
  { nome: 'Frutas vermelhas', preco: 'R$ 32', cor: '#b8321c' },
  { nome: 'Raízes da serra', preco: 'R$ 18', cor: '#8a5a00' },
  { nome: 'Ovos caipiras', preco: 'R$ 21', cor: '#c9a227' },
  { nome: 'Café especial', preco: 'R$ 46', cor: '#3f3b48' },
]
</script>

<template>
  <div class="mini" aria-hidden="true">
    <header class="mini__topo">
      <span class="mini__logo"><span class="mini__logo-marca"></span>Feira Roxa</span>
      <nav class="mini__links">
        <span>Produtos</span><span>Receitas</span><span>Entrega</span><span class="mini__conta">Minha conta</span>
      </nav>
      <span class="mini__burger"><span></span><span></span><span></span></span>
    </header>

    <section class="mini__heroi">
      <div class="mini__chamada">
        <p class="mini__tag">Entrega hoje até 20h</p>
        <p class="mini__titulo">Orgânicos da estação, direto de quem planta.</p>
        <p class="mini__texto">Monte sua cesta com produtores de até 80 km da sua casa.</p>
        <span class="mini__cta">Montar cesta</span>
      </div>
      <img
        class="mini__foto"
        src="/img/fotos/notebook-celular-480.webp"
        width="480"
        height="320"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </section>

    <div class="mini__corpo">
      <div class="mini__cards">
        <article v-for="produto in produtos" :key="produto.nome" class="mini__card">
          <span class="mini__amostra" :style="{ background: produto.cor }"></span>
          <span class="mini__nome">{{ produto.nome }}</span>
          <span class="mini__preco">{{ produto.preco }}</span>
        </article>
      </div>
      <aside class="mini__aside">
        <p class="mini__aside-titulo">Frete grátis</p>
        <p>Em pedidos acima de R$ 80. Retirada gratuita na feira de sábado.</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.mini {
  display: grid;
  gap: 1rem;
  min-height: 100%;
  padding: 0 0 1.5rem;
  background: #fbfaf7;
  color: #121016;
  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.45;
}

.mini__topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1rem;
  border-bottom: 0.0625rem solid #121016;
}

.mini__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  font-stretch: 80%;
  white-space: nowrap;
}

.mini__logo-marca {
  width: 0.875rem;
  height: 0.875rem;
  background: #5b2be0;
}

.mini__links {
  display: none;
}

.mini__burger {
  display: grid;
  gap: 0.1875rem;
  width: 1.25rem;
}

.mini__burger span {
  height: 0.125rem;
  background: #121016;
}

.mini__heroi {
  display: grid;
  gap: 1rem;
  padding: 0 1rem;
}

.mini__chamada {
  display: grid;
  gap: 0.5rem;
  justify-items: start;
}

.mini__tag {
  padding: 0.125rem 0.5rem;
  background: #d2f34c;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
}

.mini__titulo {
  font-family: var(--font-heading);
  font-size: 1.625rem;
  font-weight: 700;
  font-stretch: 78%;
  line-height: 1;
  letter-spacing: -0.02em;
}

.mini__texto {
  color: #3f3b48;
}

.mini__cta {
  padding: 0.5rem 0.875rem;
  background: #121016;
  color: #f2f0eb;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.mini__foto {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.mini__corpo {
  display: grid;
  gap: 1rem;
  padding: 0 1rem;
}

.mini__cards {
  display: grid;
  gap: 0.5rem;
}

.mini__card {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 0.0625rem solid rgb(18 16 22 / 0.16);
  background: #fff;
}

.mini__amostra {
  aspect-ratio: 1;
}

.mini__nome {
  font-weight: 600;
}

.mini__preco {
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.mini__aside {
  display: grid;
  gap: 0.25rem;
  padding: 0.875rem;
  background: #15121c;
  color: #bdb7ca;
}

.mini__aside-titulo {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  color: #d2f34c;
}

@container tela (min-width: 36rem) {
  .mini__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mini__card {
    grid-template-columns: 1fr auto;
    align-content: start;
  }

  .mini__amostra {
    grid-column: 1 / -1;
    aspect-ratio: 16 / 9;
  }
}

@container tela (min-width: 48rem) {
  .mini__links {
    display: flex;
    gap: 1.25rem;
    font-size: 0.8125rem;
  }

  .mini__conta {
    padding-left: 1.25rem;
    border-left: 0.0625rem solid rgb(18 16 22 / 0.2);
  }

  .mini__burger {
    display: none;
  }

  .mini__topo,
  .mini__heroi,
  .mini__corpo {
    padding-inline: 2rem;
  }

  .mini__heroi {
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
    gap: 2rem;
  }

  .mini__titulo {
    font-size: 2.25rem;
  }

  .mini__cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container tela (min-width: 64rem) {
  .mini__titulo {
    font-size: 3rem;
  }

  .mini__corpo {
    grid-template-columns: minmax(0, 1fr) 14rem;
    align-items: start;
  }

  .mini__topo,
  .mini__heroi,
  .mini__corpo {
    padding-inline: 3rem;
  }
}
</style>
