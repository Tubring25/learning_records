import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    path: '/regist',
    component: () => import('@/views/login/regist'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '校园代收代取服务系统',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '校园代收代取服务系统', icon: 'dashboard' }
    }]
  },
]
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const customerRoutes = [
  {
    path: '/customerInfo',
    component: Layout,
    redirect: '/customer/info',
    meta: { title: '个人信息管理', icon: 'dashboard' },
    children: [{
      path: 'info',
      name: 'info',
      component: () => import('@/views/customer/info'),
      meta: { title: '个人信息管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/customerOrder',
    component: Layout,
    redirect: '/customerOrder/order',
    meta: { title: '订单管理', icon: 'dashboard' },
    children: [
      {
      path: 'order',
      name: 'order',
      component: () => import('@/views/customer/order'),
      meta: { title: '订单发起', icon: 'dashboard' },
      },
      {
        path: 'addExpress',
        name: 'addExpress',
        component: () => import('@/views/customer/addExpress'),
        meta: { title: '快递订单', icon: 'dashboard' },
        hidden: true
      },
      {
        path: 'addTakeOut',
        name: 'addTakeOut',
        component: () => import('@/views/customer/addTakeOut'),
        meta: { title: '外卖订单', icon: 'dashboard' },
        hidden: true
      }
    ]
  },
  {
    path: '/customerReceive',
    component: Layout,
    redirect: '/customer/addReceive',
    meta: { title: '反馈管理', icon: 'dashboard' },
    children: [{
      path: 'addReceive',
      name: 'addReceive',
      component: () => import('@/views/customer/addReceive'),
      meta: { title: '发起反馈', icon: 'dashboard' }
    },
    {
      path: 'receiveStatus',
      name: 'receiveStatus',
      component: () => import('@/views/customer/receiveStatus'),
      meta: { title: '反馈进程', icon: 'dashboard' }
    },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const serverRoutes = [
  {
    path: '/serverInfo',
    component: Layout,
    redirect: '/serverInfo/info',
    meta: { title: '个人信息管理', icon: 'dashboard' },
    children: [{
      path: 'info',
      name: 'info',
      component: () => import('@/views/server/info'),
      meta: { title: '个人信息管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/serverOrder',
    component: Layout,
    redirect: '/serverOrder/total',
    meta: { title: '业务管理', icon: 'dashboard' },
    children: [
      {
        path: 'total',
        name: 'addExpress',
        component: () => import('@/views/server/total'),
        meta: { title: '业务统计', icon: 'dashboard' },
      },
      {
      path: 'order',
      name: 'order',
      component: () => import('@/views/server/order'),
      meta: { title: '订单接收', icon: 'dashboard' },
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const adminRoutes = [
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/index',
    meta: { title: '顾客管理', icon: 'dashboard' },
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/admin/customer'),
      meta: { title: '顾客管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/server',
    component: Layout,
    redirect: '/server/index',
    meta: { title: '代取人管理', icon: 'dashboard' },
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/admin/server'),
      meta: { title: '代取人管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/index',
    meta: { title: '反馈管理', icon: 'dashboard' },
    children: [
      {
        path: 'index',
        name: 'addExpress',
        component: () => import('@/views/admin/receive'),
        meta: { title: '反馈管理', icon: 'dashboard' },
      }
    ]
  },
  {
    path: '/total',
    component: Layout,
    redirect: '/total/index',
    meta: { title: '统计信息', icon: 'dashboard' },
    children: [
      {
        path: 'index',
        name: 'addExpress',
        component: () => import('@/views/admin/total'),
        meta: { title: '统计信息', icon: 'dashboard' },
      }
    ]
  },
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
