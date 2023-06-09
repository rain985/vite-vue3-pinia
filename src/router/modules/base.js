import { HOME_URL, LOGIN_URL } from '@/config/config'

export const staticRouter = [
  {
    path: '/',
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: HOME_URL,
    children: []
  }
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/errorMessage/403.vue'),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/errorMessage/404.vue'),
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/errorMessage/500.vue'),
    meta: {
      title: '500页面'
    }
  },
  // 解决刷新页面，路由警告
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/errorMessage/404.vue')
  }
]
