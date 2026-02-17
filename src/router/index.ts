import { createRouter, createWebHistory } from 'vue-router'
import { setSeo } from '@/lib/seo'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    noLayout?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../pages/HomePage.vue'),
      meta: {
        title: 'Kezdolap',
        description: 'Boulder Zóna - Debrecen legmodernebb boulder terme.',
      },
    },
    {
      path: '/admin',
      component: () => import('../pages/AdminPage.vue'),
      meta: {
        title: 'Admin',
        noLayout: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.afterEach((to) => {
  setSeo({
    title: to.meta.title,
    description: to.meta.description,
    path: to.fullPath,
  })
})

export default router

