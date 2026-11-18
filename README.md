# Elástico · Guia Interativo de Responsividade

Guia prático, feito em **Vue 3 + Vite + Vue Router**, que ensina a criar páginas que funcionam em qualquer tela. Cada seção tem uma explicação curta, um exemplo de código comentado, a resposta à pergunta-guia e as fontes consultadas.

## Seções (uma rota por seção)

| Rota | Conteúdo | Laboratório |
| --- | --- | --- |
| `/importancia` | Por que responsividade importa e o papel da meta viewport | |
| `/unidades` | px, rem, em, %, fr, vw, vh, dvh e ch | **Lab 01 · Simulador de leitura**: cartão em px × cartão em rem com um slider que muda a fonte do navegador |
| `/flexbox-grid` | Flexbox, Grid e `repeat(auto-fit, minmax())` | **Lab 02 · Construtor de dashboard**: inputs ligados por `v-model` ao `minmax` e ao `gap` do grid |
| `/imagens` | `max-width`, `width`/`height`, `loading="lazy"`, `aspect-ratio`, `object-fit`, `srcset` | |
| `/boas-praticas` | Estrutura de pastas, nomes, props e eventos, `:key`, design tokens, Core Web Vitals e rotas sob demanda | **Lab 03 · O bug da lista**: `v-for` sem `:key` × com `:key` |
| `/desafio` | Pergunta final que só se responde usando o guia | |

Extra: um indicador fixo no canto da tela mostra a largura da janela e o breakpoint ativo.

## Regras técnicas aplicadas

- **Mobile-first**: o CSS fora das media queries é o do celular; as media queries usam apenas `min-width`.
- **rem** em fontes e espaçamentos; cores e espaçamentos como variáveis CSS no `:root` (`src/assets/styles/main.css`).
- **Sem rolagem horizontal** de 320px a 1440px (verificado com Playwright).
- **Menu hambúrguer** abaixo de 64rem (1024px).
- **Rotas sob demanda** (`() => import(...)`).

## Estrutura

```
src/
├─ assets/styles/main.css   design tokens e estilos globais
├─ components/
│  ├─ layout/               TheHeader, TheFooter, IndicadorViewport
│  ├─ guia/                 PaginaSecao, BlocoSecao, CodigoExemplo, PerguntaGuia, ...
│  └─ labs/                 LabSimuladorLeitura, LabConstrutorDashboard, LabBugDaLista
├─ data/                    seções e exemplos de código exibidos nas páginas
├─ router/index.js
└─ views/                   uma view por rota
```

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

O projeto está pronto para a Vercel: o `vercel.json` redireciona todas as rotas para o `index.html`, para que links como `/unidades` funcionem ao recarregar a página. Na Vercel, importe o repositório; o preset **Vite** é detectado automaticamente (build `npm run build`, saída `dist`).
