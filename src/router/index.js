import { createRouter, createWebHistory } from 'vue-router'
import { secoes } from '@/data/secoes'

const views = {
  importancia: () => import('@/views/ImportanciaView.vue'),
  unidades: () => import('@/views/UnidadesView.vue'),
  'flexbox-grid': () => import('@/views/FlexboxGridView.vue'),
  imagens: () => import('@/views/ImagensView.vue'),
  'boas-praticas': () => import('@/views/BoasPraticasView.vue'),
  desafio: () => import('@/views/DesafioView.vue'),
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/views/HomeView.vue'),
      meta: { titulo: 'Uma interface. Qualquer tela.', capa: true },
    },
    {
      path: '/laboratorios',
      name: 'laboratorios',
      component: () => import('@/views/LaboratoriosView.vue'),
      meta: { titulo: 'Laboratórios' },
    },
    ...secoes.map((secao) => ({
      path: secao.caminho,
      name: secao.nome,
      component: views[secao.nome],
      meta: { titulo: secao.titulo, secao: secao.nome },
    })),
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, posicaoSalva) {
    if (to.path === from.path && to.hash) {
      const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return { el: to.hash, behavior: suave ? 'smooth' : 'auto' }
    }
    if (posicaoSalva) return new Promise((resolve) => setTimeout(() => resolve(posicaoSalva), 260))
    return false
  },
})

router.afterEach((to) => {
  document.title = to.meta.titulo ? `${to.meta.titulo} · Elástico` : 'Elástico · Guia de Responsividade'
})

export default router
