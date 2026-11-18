import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export const breakpoints = [
  { nome: 'base', rem: 0, rotulo: 'celular' },
  { nome: 'sm', rem: 36, rotulo: 'celular deitado' },
  { nome: 'md', rem: 48, rotulo: 'tablet' },
  { nome: 'lg', rem: 64, rotulo: 'notebook' },
  { nome: 'xl', rem: 80, rotulo: 'desktop' },
]

export function useViewport() {
  const largura = ref(0)
  const altura = ref(0)
  const ativo = ref(breakpoints[0])

  function medir() {
    largura.value = window.innerWidth
    altura.value = window.innerHeight
    ativo.value =
      [...breakpoints].reverse().find((bp) => bp.rem === 0 || window.matchMedia(`(min-width: ${bp.rem}rem)`).matches) ??
      breakpoints[0]
  }

  onMounted(() => {
    medir()
    window.addEventListener('resize', medir, { passive: true })
  })
  onBeforeUnmount(() => window.removeEventListener('resize', medir))

  const rotulo = computed(() => `${largura.value}px · ${ativo.value.nome}`)

  return { largura, altura, ativo, rotulo }
}
