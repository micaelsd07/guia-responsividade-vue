export const fotos = {
  telasSincronizadas: {
    nome: 'telas-sincronizadas',
    largura: 1600,
    altura: 1067,
    alt: 'Mesa com monitor, dois notebooks, um tablet e um celular, todos exibindo a mesma imagem de fundo.',
    autor: 'Pexels',
    url: 'https://www.pexels.com/photo/a-modern-desk-with-laptops-a-monitor-and-smartphone-displaying-the-same-lockscreen-19059657/',
  },
  monitoresCrt: {
    nome: 'monitores-crt',
    largura: 1600,
    altura: 1200,
    alt: 'Fileira de computadores antigos com monitores de tubo (CRT) e teclados bege.',
    autor: 'Viktorya Sergeeva',
    url: 'https://www.pexels.com/photo/close-up-photo-of-old-computers-9140600/',
  },
  celularMao: {
    nome: 'celular-mao',
    largura: 1600,
    altura: 1127,
    alt: 'Mão segurando um celular com uma página aberta, na frente de um notebook.',
    autor: 'Szabó Viktor',
    url: 'https://www.pexels.com/photo/a-person-holding-a-smartphone-7662057/',
  },
  lupaOculos: {
    nome: 'lupa-oculos',
    largura: 1600,
    altura: 1066,
    alt: 'Lupa e óculos de leitura sobre as páginas de um livro aberto.',
    autor: 'Pexels',
    url: 'https://www.pexels.com/photo/gray-magnifying-glass-and-eyeglasses-on-top-of-open-book-3109168/',
  },
  notebookCelular: {
    nome: 'notebook-celular',
    largura: 1600,
    altura: 1067,
    alt: 'Notebook e celular com telas brancas sobre uma mesa de madeira iluminada pelo sol.',
    autor: 'Jakub Zerdzicki',
    url: 'https://www.pexels.com/photo/modern-office-workspace-with-laptop-and-smartphone-34170828/',
  },
  codigoMonitor: {
    nome: 'codigo-monitor',
    largura: 1600,
    altura: 1047,
    alt: 'Monitores exibindo código colorido em um editor, com teclado mecânico iluminado em primeiro plano.',
    autor: 'Jakub Zerdzicki',
    url: 'https://www.pexels.com/photo/colorful-computer-programming-workspace-setup-34212916/',
  },
}

export const larguras = [480, 960, 1600]

export function srcsetDe(foto) {
  return larguras.map((w) => `/img/fotos/${foto.nome}-${w}.webp ${w}w`).join(', ')
}

export function srcDe(foto, largura = 960) {
  return `/img/fotos/${foto.nome}-${largura}.webp`
}
