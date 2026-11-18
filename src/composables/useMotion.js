import { onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip)

export { gsap, ScrollTrigger, Flip }

export function movimentoReduzido() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function formatarNumero(valor, casas) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  })
}

function animarTitulos(raiz) {
  raiz.querySelectorAll('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.09,
          delay: el.dataset.split === 'imediato' ? 0.15 : 0,
          scrollTrigger:
            el.dataset.split === 'imediato' ? undefined : { trigger: el, start: 'top 88%', once: true },
        })
      },
    })
  })
}

function revelarBlocos(raiz) {
  const blocos = gsap.utils.toArray(raiz.querySelectorAll('[data-reveal]:not([data-reveal="clip"])'))
  if (!blocos.length) return
  gsap.set(blocos, { opacity: 0, y: 28 })
  ScrollTrigger.batch(blocos, {
    start: 'top 92%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
      }),
  })
}

function revelarImagens(raiz) {
  raiz.querySelectorAll('[data-reveal="clip"]').forEach((el) => {
    const imagem = el.querySelector('img')
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 86%', once: true } })
    tl.fromTo(
      el,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' },
    )
    if (imagem) tl.from(imagem, { scale: 1.12, duration: 1.4, ease: 'power3.out' }, 0)
  })
}

function contarNumeros(raiz) {
  raiz.querySelectorAll('[data-count]').forEach((el) => {
    const alvo = parseFloat(el.dataset.count)
    const casas = parseInt(el.dataset.decimals ?? '0', 10)
    const estado = { valor: 0 }
    gsap.to(estado, {
      valor: alvo,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = formatarNumero(estado.valor, casas)
      },
    })
  })
}

function montarDiagramas(raiz) {
  raiz.querySelectorAll('[data-assemble]').forEach((el) => {
    const pecas = el.querySelectorAll('[data-piece]')
    if (!pecas.length) return
    gsap.from(pecas, {
      opacity: 0,
      y: 18,
      scale: 0.96,
      transformOrigin: '0% 50%',
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
}

function parallax(raiz) {
  raiz.querySelectorAll('[data-parallax] img').forEach((imagem) => {
    gsap.fromTo(
      imagem,
      { yPercent: -5, scale: 1.1 },
      {
        yPercent: 5,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: imagem.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })
}

function revelarAoFocar(evento) {
  const bloco = evento.target.closest?.('[data-reveal], [data-assemble]')
  if (!bloco) return
  gsap.to([bloco, ...bloco.querySelectorAll('[data-piece]')], {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: 0.25,
    overwrite: true,
  })
}

export function usePageMotion(raizRef, extra) {
  let mm

  onMounted(() => {
    const raiz = raizRef.value
    if (!raiz) return
    mm = gsap.matchMedia()
    mm.add(
      {
        movimento: '(prefers-reduced-motion: no-preference)',
        largo: '(min-width: 64rem)',
      },
      (contexto) => {
        const { movimento, largo } = contexto.conditions
        if (!movimento) return
        animarTitulos(raiz)
        revelarBlocos(raiz)
        revelarImagens(raiz)
        contarNumeros(raiz)
        montarDiagramas(raiz)
        if (largo) parallax(raiz)
        extra?.(raiz, contexto)
        raiz.addEventListener('focusin', revelarAoFocar)
        return () => raiz.removeEventListener('focusin', revelarAoFocar)
      },
    )
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  onBeforeUnmount(() => mm?.revert())
}

export function useFlipEmMudancas(containerRef, fontes, seletor = '[data-flip]') {
  watch(
    fontes,
    () => {
      const container = containerRef.value
      if (!container || movimentoReduzido()) return
      const estado = Flip.getState(container.querySelectorAll(seletor))
      nextTick(() => {
        Flip.from(estado, {
          duration: 0.55,
          ease: 'power3.inOut',
          nested: true,
          prune: true,
        })
      })
    },
    { flush: 'pre' },
  )
}
