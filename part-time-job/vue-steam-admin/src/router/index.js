import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard'}
    }]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goodsList',
    name: 'goods',
    meta: { title: '商品管理'},
    children: [
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('@/views/goods/goodsList'),
        meta: { title: '商品列表' }
      },
      {
        path: 'goodsType',
        name: 'GoodsType',
        component: () => import('@/views/goods/goodsType'),
        meta: { title: '商品分类' }
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        component: () => import('@/views/goods/addGoods'),
        meta: { title: '添加商品' },
        hidden: true
      },
      {
        path: 'goodsDetail',
        name: 'GoodsDetail',
        component: () => import('@/views/goods/goodsDetail'),
        meta: { title: '商品详情' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
