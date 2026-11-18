<script setup>
import PaginaSecao from '@/components/guia/PaginaSecao.vue'
import BlocoSecao from '@/components/guia/BlocoSecao.vue'
import CodigoExemplo from '@/components/guia/CodigoExemplo.vue'
import PerguntaGuia from '@/components/guia/PerguntaGuia.vue'
import FontesConsultadas from '@/components/guia/FontesConsultadas.vue'
import { exemploViewportHtml, exemploMobileFirstCss } from '@/data/exemplos'

const fontes = [
  {
    titulo: 'Configuring the Viewport (Safari Web Content Guide)',
    autor: 'Apple Developer',
    url: 'https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html',
  },
  {
    titulo: '<meta name="viewport">',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport',
  },
  {
    titulo: 'Responsive web design basics',
    autor: 'web.dev (Google)',
    url: 'https://web.dev/articles/responsive-web-design-basics',
  },
  {
    titulo: 'Using media queries',
    autor: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries',
  },
  {
    titulo: 'Mobile-first indexing best practices',
    autor: 'Google Search Central',
    url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing',
  },
  {
    titulo: 'Desktop vs Mobile vs Tablet Market Share Worldwide',
    autor: 'StatCounter Global Stats',
    url: 'https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet',
  },
]
</script>

<template>
  <PaginaSecao
    nome="importancia"
    resumo="A mesma página é aberta numa tela de 320px e num monitor de 2560px. Aqui você entende por que isso deixou de ser opcional e qual linha de HTML decide se as suas media queries vão funcionar no celular."
  >
    <BlocoSecao id="explicacao" rotulo="Explicação" titulo="A web é aberta em telas de todos os tamanhos">
      <div class="texto">
        <p>
          Um site <strong>responsivo</strong> é aquele cujo layout se adapta ao espaço disponível:
          as colunas se reorganizam, as imagens encolhem e o menu vira um botão. É o mesmo HTML,
          com um CSS que reage à largura da tela.
        </p>
        <p>Por que isso importa:</p>
        <ul>
          <li>
            <strong>A maioria dos acessos vem do celular.</strong> Segundo o StatCounter, mais da
            metade do tráfego da web mundial é mobile. Se a página não funciona no celular, ela não
            funciona para a maior parte das pessoas.
          </li>
          <li>
            <strong>O Google lê a versão mobile.</strong> Com a indexação mobile-first, é a versão
            de celular da página que conta para aparecer na busca.
          </li>
          <li>
            <strong>Acessibilidade.</strong> Quem usa zoom ou fonte maior também depende de um
            layout que se reorganiza em vez de quebrar.
          </li>
          <li>
            <strong>Manutenção.</strong> Um único código responsivo sai mais barato do que manter
            um "site m." separado.
          </li>
        </ul>
        <p>Três peças trabalham juntas:</p>
      </div>

      <ol class="pecas">
        <li class="peca">
          <span class="peca__numero">1</span>
          <h3>Meta viewport</h3>
          <p>Diz ao navegador do celular qual largura usar para desenhar a página.</p>
        </li>
        <li class="peca">
          <span class="peca__numero">2</span>
          <h3>Media queries</h3>
          <p>Aplicam regras de CSS só a partir de certas larguras de tela.</p>
        </li>
        <li class="peca">
          <span class="peca__numero">3</span>
          <h3>Mobile-first</h3>
          <p>
            Escreve-se primeiro o CSS do celular e, depois, acrescenta-se o das telas maiores com
            <code>min-width</code>.
          </p>
        </li>
      </ol>

      <figure class="comparacao">
        <div class="comparacao__celulares">
          <div class="celular">
            <p class="celular__legenda celular__legenda--erro">Sem meta viewport</p>
            <div class="celular__moldura">
              <div class="celular__tela">
                <div class="desktop" aria-hidden="true">
                  <div class="desktop__topo">
                    <span class="desktop__logo">Loja Roxa</span>
                    <span class="desktop__links">Início · Produtos · Contato · Carrinho</span>
                  </div>
                  <div class="desktop__heroi">
                    <p>Ofertas da semana</p>
                    <span></span>
                  </div>
                  <div class="desktop__colunas">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="desktop__linhas">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="celular">
            <p class="celular__legenda celular__legenda--ok">Com meta viewport</p>
            <div class="celular__moldura">
              <div class="celular__tela">
                <div class="mobile" aria-hidden="true">
                  <div class="mobile__topo">
                    <span class="mobile__logo">Loja Roxa</span>
                    <span class="mobile__menu"><span></span><span></span><span></span></span>
                  </div>
                  <div class="mobile__heroi">
                    <p>Ofertas da semana</p>
                    <span></span>
                  </div>
                  <span class="mobile__card"></span>
                  <span class="mobile__card"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <figcaption class="comparacao__legenda">
          À esquerda, o navegador desenha a página com cerca de 980px e encolhe tudo para caber
          na tela. À direita, a página usa a largura real do aparelho e o layout mobile aparece.
        </figcaption>
      </figure>
    </BlocoSecao>

    <BlocoSecao id="codigo" rotulo="Exemplo de código" titulo="A linha que liga o mobile-first">
      <div class="texto">
        <p>
          A meta tag fica no <code>&lt;head&gt;</code> do <code>index.html</code>. Projetos
          criados com <code>npm create vue@latest</code> já vêm com ela. Depois, o CSS começa
          pelo celular e vai ganhando regras com <code>min-width</code>.
        </p>
      </div>
      <CodigoExemplo arquivo="index.html" linguagem="html" :codigo="exemploViewportHtml" />
      <CodigoExemplo arquivo="estilos.css" linguagem="css" :codigo="exemploMobileFirstCss" />
    </BlocoSecao>

    <PerguntaGuia
      numero="1"
      pergunta="Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?"
    >
      <p>
        Sem a meta viewport, o navegador do celular não sabe que a página foi pensada para telas
        pequenas. Por segurança, ele <strong>assume que o site é para desktop</strong>: cria uma
        tela virtual com cerca de <strong>980px de largura</strong>, desenha a página nesse
        tamanho e depois <strong>diminui o zoom</strong> até tudo caber nos ~390px reais da tela.
        O resultado é a versão de computador, só que minúscula.
      </p>
      <p>
        E as media queries? Elas perguntam a largura do viewport, e o navegador responde
        "980px". Então uma regra como <code>@media (min-width: 48rem)</code> (768px) é ativada
        mesmo no celular, e o CSS pensado para telas pequenas nunca entra em ação.
      </p>
      <p>
        A tag
        <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>
        muda isso: <code>width=device-width</code> <strong>força o navegador a respeitar a
        largura real da tela do celular</strong> (por exemplo, 390px) como largura do viewport, e
        <code>initial-scale=1.0</code> abre a página sem zoom. Agora as media queries recebem a
        largura verdadeira e o layout mobile aparece como planejado.
      </p>
    </PerguntaGuia>

    <FontesConsultadas :fontes="fontes" />
  </PaginaSecao>
</template>

<style scoped>
.pecas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(13rem, 100%), 1fr));
  gap: var(--espaco-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.peca {
  display: grid;
  align-content: start;
  gap: var(--espaco-2);
  padding: var(--espaco-4);
  border: var(--borda);
  border-radius: var(--raio-md);
  background: var(--cor-superficie);
}

.peca__numero {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--cor-roxo-800);
  color: var(--cor-ambar);
  font-family: var(--fonte-codigo);
  font-size: var(--texto-sm);
}

.peca h3 {
  font-size: var(--titulo-sm);
}

.peca p {
  font-size: var(--texto-sm);
  color: var(--cor-tinta-suave);
}

.comparacao {
  display: grid;
  gap: var(--espaco-4);
  margin: 0;
  padding: var(--espaco-5) var(--espaco-4);
  border-radius: var(--raio-lg);
  background: var(--cor-roxo-100);
}

.comparacao__celulares {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--espaco-5);
}

.comparacao__legenda {
  max-width: var(--largura-leitura);
  margin: 0 auto;
  font-size: var(--texto-sm);
  text-align: center;
  color: var(--cor-tinta-suave);
}

.celular {
  display: grid;
  justify-items: center;
  gap: var(--espaco-2);
}

.celular__legenda {
  font-family: var(--fonte-codigo);
  font-size: var(--texto-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.celular__legenda--erro {
  color: var(--cor-erro);
}

.celular__legenda--ok {
  color: var(--cor-sucesso);
}

.celular__moldura {
  padding: 0.5rem;
  border-radius: 1.5rem;
  background: var(--cor-roxo-950);
}

.celular__tela {
  position: relative;
  width: 9rem;
  height: 17rem;
  border-radius: 1rem;
  background: #fff;
  overflow: hidden;
}

.desktop {
  position: absolute;
  top: 0;
  left: 0;
  width: 61.25rem;
  padding: 2rem;
  transform: scale(calc(9 / 61.25));
  transform-origin: top left;
  display: grid;
  gap: 2rem;
}

.desktop__topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
}

.desktop__logo {
  font-family: var(--fonte-titulo);
  font-size: 2rem;
  font-weight: 700;
  color: var(--cor-roxo-800);
}

.desktop__heroi {
  display: grid;
  gap: 1rem;
  padding: 3rem;
  border-radius: 1rem;
  background: var(--cor-roxo-700);
  color: #fff;
  font-family: var(--fonte-titulo);
  font-size: 3rem;
}

.desktop__heroi span {
  width: 12rem;
  height: 3rem;
  border-radius: 0.5rem;
  background: var(--cor-ambar);
}

.desktop__colunas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.desktop__colunas span {
  height: 14rem;
  border-radius: 1rem;
  background: var(--cor-roxo-200);
}

.desktop__linhas {
  display: grid;
  gap: 1rem;
}

.desktop__linhas span {
  height: 1rem;
  border-radius: 1rem;
  background: var(--cor-linha);
}

.mobile {
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
}

.mobile__topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile__logo {
  font-family: var(--fonte-titulo);
  font-size: var(--texto-sm);
  font-weight: 700;
  color: var(--cor-roxo-800);
}

.mobile__menu {
  display: grid;
  gap: 0.125rem;
  width: 0.875rem;
}

.mobile__menu span {
  height: 0.125rem;
  background: var(--cor-roxo-800);
}

.mobile__heroi {
  display: grid;
  gap: 0.375rem;
  padding: 0.75rem 0.5rem;
  border-radius: 0.5rem;
  background: var(--cor-roxo-700);
  color: #fff;
  font-family: var(--fonte-titulo);
  font-size: var(--texto-base);
  line-height: 1.15;
}

.mobile__heroi span {
  width: 3.5rem;
  height: 1rem;
  border-radius: 0.25rem;
  background: var(--cor-ambar);
}

.mobile__card {
  height: 4rem;
  border-radius: 0.5rem;
  background: var(--cor-roxo-200);
}

@media (min-width: 48rem) {
  .comparacao {
    padding: var(--espaco-6);
  }

  .comparacao__celulares {
    gap: var(--espaco-8);
  }
}
</style>
