import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export function useProgressoLeitura() {
  const progresso = ref(0)
  let quadro = 0

  function calcular() {
    quadro = 0
    const total = document.documentElement.scrollHeight - window.innerHeight
    progresso.value = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0
  }

  function agendar() {
    if (!quadro) quadro = requestAnimationFrame(calcular)
  }

  onMounted(() => {
    calcular()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', agendar)
    window.removeEventListener('resize', agendar)
    cancelAnimationFrame(quadro)
  })

  const route = useRoute()
  watch(
    () => route.path,
    () => nextTick(() => setTimeout(calcular, 400)),
  )

  return progresso
}

export function useTopicoAtivo(obterIds) {
  const ativo = ref('')
  let quadro = 0

  function calcular() {
    quadro = 0
    const limite = window.innerHeight * 0.32
    let atual = ''
    for (const id of obterIds()) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= limite) atual = id
    }
    ativo.value = atual
  }

  function agendar() {
    if (!quadro) quadro = requestAnimationFrame(calcular)
  }

  onMounted(() => {
    window.addEventListener('scroll', agendar, { passive: true })
    calcular()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', agendar)
    cancelAnimationFrame(quadro)
  })

  return { ativo, recalcular: () => setTimeout(calcular, 450) }
}
