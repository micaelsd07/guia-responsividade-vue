# Elástico · Guia Interativo de Responsividade

Publicação interativa sobre responsividade web, feita em **Vue 3 + Vite + Vue Router**, com animações em **GSAP**.
Cada seção tem explicação curta, exemplos de código comentados, a resposta à pergunta-guia e as fontes consultadas.
São **7 laboratórios** para aprender mexendo.

## Seções

| Rota | Título | Laboratórios e demonstrações |
| --- | --- | --- |
| `/` | Uma interface. Qualquer tela. | Vitrine de dispositivos: a mesma página em monitor, tablet e celular (container queries) |
| `/importancia` | Uma web. Milhões de telas. | Fixo × fluido × responsivo; régua de breakpoints ao vivo; com e sem meta viewport |
| `/unidades` | Medir a web sem limitar a web. | Nove unidades medidas ao vivo · **Lab 01** Conversor de unidades · **Lab 02** Simulador de leitura |
| `/flexbox-grid` | Organizar elementos. Sem lutar contra a tela. | **Lab 03** Bancada Flexbox · **Lab 04** Construtor de Grid (trilhas desenhadas, auto-fit × auto-fill) |
| `/imagens` | Imagens que acompanham o layout. | **Lab 05** Comparador de imagens · **Lab 06** Simulador de CLS (mede o deslocamento) |
| `/boas-praticas` | Responsividade também começa na arquitetura. | Código ruim × recomendado · tokens lidos do `:root` · Core Web Vitals · **Lab 07** O bug da lista |
| `/desafio` | Agora é sua vez. | Quiz com 10 perguntas, pontuação, progresso, revisão e refazer |
| `/laboratorios` | Laboratórios | Índice dos 7 laboratórios |

## Regras técnicas aplicadas

- **Mobile-first**: o CSS fora de media query é o do celular; media queries e container queries usam apenas `min-width`.
- **rem** em fontes e espaçamentos; cores, espaçamentos, tipografia, bordas, sombras e transições como variáveis CSS no `:root` (`src/assets/styles/main.css`). `clamp()` nos títulos.
- **Sem rolagem horizontal**: testado com Playwright em 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920px.
- **Navegação**: barra lateral com índice, tópico atual e progresso no desktop; dock inferior e menu em `<dialog>` no celular.
- **Grade visível**: botão de grade (ou tecla `G`) mostra as colunas do layout (4 → 8 → 12).
- **Acessibilidade**: zero violações no axe-core (WCAG 2 A/AA); foco visível, labels em todos os controles, `alt` nas imagens, `prefers-reduced-motion` respeitado.
- **Rotas sob demanda** com `() => import(...)`.

## Animações (GSAP 3)

ScrollTrigger (revelações e contadores ao entrar na tela), SplitText (títulos linha a linha com máscara), Flip
(reorganização dos itens nos laboratórios de Flexbox e Grid), timelines (vitrine de dispositivos e evolução dos layouts),
parallax sutil em fotos no desktop e transição discreta entre páginas. Com `prefers-reduced-motion: reduce`, nada se move.

## Estrutura

```
src/
├─ assets/styles/main.css   design tokens e base
├─ components/
│  ├─ layout/               AppTopbar, AppSidebar, MobileDock, MenuIndice, AppFooter, GradeSobreposta
│  ├─ guia/                 AberturaSecao, CapituloGuia, BancadaLab, CodigoEditor, CodigoComparado, PerguntaGuia…
│  ├─ controles/            CampoFaixa, CampoSegmentado
│  ├─ demos/                VitrineDispositivos, MiniSite, LayoutEvolucao, ReguaBreakpoints, TabelaUnidades…
│  └─ labs/                 os 7 laboratórios
├─ composables/             useMotion (GSAP), useViewport, useScroll, useUi
├─ data/                    seções, laboratórios, fontes, fotos, exemplos de código, quiz
├─ router/index.js
├─ utils/realcarCodigo.js   realce de sintaxe sem dependências
└─ views/                   uma view por rota
```

## Imagens

Fotografias do [Pexels](https://www.pexels.com/license/) (uso livre), servidas em WebP com 480, 960 e 1600px de largura
via `srcset`. Créditos no rodapé do site e em cada legenda.

## Rodando localmente

Requer Node.js 22.18+.

```sh
npm install
npm run dev
```

Build de produção:

```sh
npm run build
npm run preview
```

## Publicação

O projeto está na Vercel. O `vercel.json` redireciona todas as rotas para o `index.html`, para que links como
`/unidades` funcionem ao recarregar a página.
