import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginView.vue')
    },

    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/homeview',
      children: [
        {
          path: '/homeview', // 首页
          component: () => import('@/views/user/HomeView.vue')
        },
        {
          path: '/dashboard',
          component: () => import('@/views/user/UserDashboard.vue')
        },
        {
          path: '/apply',
          component: () => import('@/views/user/ApplyForm.vue')
        },
        {
          path: '/status',
          component: () => import('@/views/user/StatusView.vue')
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
