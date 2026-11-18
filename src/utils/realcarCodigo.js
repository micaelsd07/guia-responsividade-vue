const palavrasChave =
  /^(?:const|let|var|import|export|from|default|return|function|if|else|true|false|null|undefined|new|await|async|of|in|for)\b/

const regras = [
  ['string', /^(["'`])(?:\\.|(?!\1)[^\\])*\1/],
  ['tag', /^<\/?[A-Za-z][\w.-]*|^\/?>/],
  ['attr', /^[:@#]?[a-zA-Z][\w-]*(?==)/],
  ['keyword', /^@[a-z-]+/],
  ['prop', /^--[\w-]+|^[a-z][a-z-]*(?=\s*:(?!:))/],
  ['number', /^-?\d+(?:\.\d+)?(?:px|rem|em|%|fr|vw|vh|dvh|svh|ch|ms|s|deg|w)?(?![\w-])/],
  ['fn', /^[a-zA-Z_][\w-]*(?=\()/],
  ['punct', /^[{}()[\];,]/],
]

function tokenizarCodigo(texto, linguagem) {
  const partes = []
  let resto = texto
  let simples = ''

  const empurrarSimples = () => {
    if (simples) partes.push({ tipo: 'plain', texto: simples })
    simples = ''
  }

  while (resto.length) {
    let casou = false
    const anterior = simples.at(-1) ?? partes.at(-1)?.texto.at(-1) ?? ' '
    const inicioDePalavra = !/[\w$-]/.test(anterior)

    if (inicioDePalavra) {
      const chave = resto.match(palavrasChave)
      if (chave && linguagem !== 'css' && linguagem !== 'texto') {
        empurrarSimples()
        partes.push({ tipo: 'keyword', texto: chave[0] })
        resto = resto.slice(chave[0].length)
        continue
      }
    }

    for (const [tipo, regra] of regras) {
      if (linguagem === 'texto') break
      if ((tipo === 'attr' || tipo === 'tag') && !['html', 'vue'].includes(linguagem)) continue
      if (tipo === 'prop' && !['css', 'vue', 'js'].includes(linguagem)) continue
      if (['attr', 'prop', 'number', 'fn'].includes(tipo) && !inicioDePalavra) continue
      const achado = resto.match(regra)
      if (achado && achado[0].length) {
        empurrarSimples()
        partes.push({ tipo, texto: achado[0] })
        resto = resto.slice(achado[0].length)
        casou = true
        break
      }
    }

    if (!casou) {
      simples += resto[0]
      resto = resto.slice(1)
    }
  }

  empurrarSimples()
  return partes
}

const marcadorComentario = /(^|\s)(\/\/|\/\*|<!--)/

function fecha(texto, abertura) {
  return texto.includes(abertura === '<!--' ? '-->' : '*/')
}

export function realcarCodigo(codigo, linguagem = 'css') {
  let blocoAberto = null

  return codigo
    .replace(/^\n+|\s+$/g, '')
    .split('\n')
    .map((linha) => {
      if (blocoAberto) {
        if (fecha(linha, blocoAberto)) blocoAberto = null
        return [{ tipo: 'comment', texto: linha }]
      }

      const achado = linguagem === 'texto' ? null : linha.match(marcadorComentario)
      if (!achado) return tokenizarCodigo(linha, linguagem)

      const inicio = achado.index + achado[1].length
      const abertura = achado[2]
      const comentario = linha.slice(inicio)
      if (abertura !== '//' && !fecha(comentario, abertura)) blocoAberto = abertura

      return [...tokenizarCodigo(linha.slice(0, inicio), linguagem), { tipo: 'comment', texto: comentario }]
    })
}
