export const secoes = [
  {
    nome: 'importancia',
    caminho: '/importancia',
    numero: '01',
    titulo: 'Por que responsividade importa',
    curto: 'Importância',
    manchete: ['Uma web.', 'Milhões de telas.'],
    resumo:
      'O que é um site responsivo, como chegamos até aqui, do layout fixo ao mobile-first, e qual linha de HTML decide se as suas media queries funcionam no celular.',
    leitura: 9,
    topicos: [
      { id: 'o-que-e', rotulo: 'O que é responsividade' },
      { id: 'por-que', rotulo: 'Por que importa' },
      { id: 'evolucao', rotulo: 'Fixo, fluido, responsivo' },
      { id: 'mobile-first', rotulo: 'Mobile-first e media queries' },
      { id: 'viewport', rotulo: 'A meta viewport' },
      { id: 'pergunta-1', rotulo: 'Pergunta-guia 01' },
    ],
  },
  {
    nome: 'unidades',
    caminho: '/unidades',
    numero: '02',
    titulo: 'Unidades CSS',
    curto: 'Unidades',
    manchete: ['Medir a web', 'sem limitar a web.'],
    resumo:
      'px, rem, em, %, fr, vw, vh, dvh e ch. Cada unidade responde a uma pergunta diferente: relativa a quê? Escolher bem é o que separa um layout que se adapta de um que ignora quem precisa de letras maiores.',
    leitura: 10,
    topicos: [
      { id: 'absolutas-relativas', rotulo: 'Absolutas e relativas' },
      { id: 'especimes', rotulo: 'Nove unidades ao vivo' },
      { id: 'lab-01', rotulo: 'Lab 01 · Conversor' },
      { id: 'lab-02', rotulo: 'Lab 02 · Leitura' },
      { id: 'regras', rotulo: 'Regras de bolso' },
      { id: 'pergunta-2', rotulo: 'Pergunta-guia 02' },
    ],
  },
  {
    nome: 'flexbox-grid',
    caminho: '/flexbox-grid',
    numero: '03',
    titulo: 'Flexbox e Grid',
    curto: 'Flexbox & Grid',
    manchete: ['Organizar elementos.', 'Sem lutar contra a tela.'],
    resumo:
      'Flexbox pensa em uma direção; Grid pensa em linhas e colunas ao mesmo tempo. Com repeat(auto-fit, minmax()), o Grid monta layouts responsivos sem nenhuma media query.',
    leitura: 11,
    topicos: [
      { id: 'dimensoes', rotulo: 'Uma dimensão ou duas' },
      { id: 'propriedades', rotulo: 'As propriedades-chave' },
      { id: 'lab-03', rotulo: 'Lab 03 · Flexbox' },
      { id: 'lab-04', rotulo: 'Lab 04 · Grid' },
      { id: 'quando-usar', rotulo: 'Quando usar cada um' },
      { id: 'pergunta-3', rotulo: 'Pergunta-guia 03' },
    ],
  },
  {
    nome: 'imagens',
    caminho: '/imagens',
    numero: '04',
    titulo: 'Imagens responsivas',
    curto: 'Imagens',
    manchete: ['Imagens que acompanham', 'o layout.'],
    resumo:
      'Imagens costumam ser os arquivos mais pesados da página e as maiores culpadas por conteúdo que pula. Seis ferramentas de HTML e CSS resolvem quase todos os casos.',
    leitura: 10,
    topicos: [
      { id: 'peso', rotulo: 'O peso das imagens' },
      { id: 'ferramentas', rotulo: 'Seis ferramentas' },
      { id: 'lab-05', rotulo: 'Lab 05 · Comparador' },
      { id: 'lab-06', rotulo: 'Lab 06 · CLS' },
      { id: 'pergunta-4', rotulo: 'Pergunta-guia 04' },
    ],
  },
  {
    nome: 'boas-praticas',
    caminho: '/boas-praticas',
    numero: '05',
    titulo: 'Boas práticas em projetos Vue',
    curto: 'Boas práticas',
    manchete: ['Responsividade também', 'começa na arquitetura.'],
    resumo:
      'Estrutura de pastas, componentes, props e eventos, :key, design tokens, Core Web Vitals e rotas sob demanda. Um projeto organizado carrega mais rápido e quebra menos.',
    leitura: 12,
    topicos: [
      { id: 'pastas', rotulo: 'Estrutura de pastas' },
      { id: 'componentes', rotulo: 'Componentes e nomes' },
      { id: 'props', rotulo: 'Props tipadas e eventos' },
      { id: 'key', rotulo: ':key no v-for' },
      { id: 'tokens', rotulo: 'Design tokens' },
      { id: 'vitals', rotulo: 'Core Web Vitals' },
      { id: 'rotas', rotulo: 'Rotas sob demanda' },
      { id: 'pergunta-5', rotulo: 'Pergunta-guia 05' },
    ],
  },
  {
    nome: 'desafio',
    caminho: '/desafio',
    numero: '06',
    titulo: 'Desafio final',
    curto: 'Desafio',
    manchete: ['Agora é', 'sua vez.'],
    resumo:
      'Dez perguntas que só se respondem com o que você viu, mexeu e calculou neste guia, incluindo o desafio da dupla: a fonte da Dona Lúcia.',
    leitura: 8,
    topicos: [
      { id: 'quiz', rotulo: 'Perguntas' },
      { id: 'resultado', rotulo: 'Resultado' },
    ],
  },
]

export function buscarSecao(nome) {
  return secoes.find((secao) => secao.nome === nome)
}
