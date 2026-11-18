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
    { path: '/', redirect: '/importancia' },
    ...secoes.map((secao) => ({
      path: secao.caminho,
      name: secao.nome,
      component: views[secao.nome],
      meta: { titulo: secao.titulo },
    })),
    { path: '/:pathMatch(.*)*', redirect: '/importancia' },
  ],
  scrollBehavior(to, from, posicaoSalva) {
    if (posicaoSalva) return posicaoSalva
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.titulo
    ? `${to.meta.titulo} · Elástico`
    : 'Elástico · Guia de Responsividade'
})

export default router
