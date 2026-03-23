import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // Public landing page
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },

    // Auth routes (no layout)
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { guest: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { guest: true },
    },

    // Authenticated app routes
    {
      path: '/app',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        // Orders
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/orders/OrderListView.vue'),
        },
        {
          path: 'orders/new',
          name: 'orders-new',
          component: () => import('@/views/orders/NewOrderView.vue'),
        },
        {
          path: 'orders/:id',
          name: 'orders-detail',
          component: () => import('@/views/orders/OrderDetailView.vue'),
        },
        // Payments
        {
          path: 'payments',
          name: 'payments',
          component: () => import('@/views/payments/PaymentListView.vue'),
        },
        {
          path: 'payments/pay',
          name: 'payments-pay',
          component: () => import('@/views/payments/MakePaymentView.vue'),
        },
        // Reports
        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/views/ReportsView.vue'),
        },
        // Profile & Settings
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/profile/ProfileView.vue'),
        },
        {
          path: 'profile/locations',
          name: 'profile-locations',
          component: () => import('@/views/profile/LocationsView.vue'),
        },
        {
          path: 'profile/notifications',
          name: 'profile-notifications',
          component: () => import('@/views/profile/NotificationsView.vue'),
        },
        // Support
        {
          path: 'support',
          name: 'support',
          component: () => import('@/views/SupportView.vue'),
        },
      ],
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Navigation guards
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return '/app'
  }
})

export default router
