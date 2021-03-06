import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/game/list.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/index.vue')
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: () => import('../views/profile/edit.vue')
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import('../views/shoppingCart/index.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/index.vue'),
  },
  {
    path: '/order/fin',
    component: ()=>import('../views/order/orderFinished.vue')
  },
  {
    path: '/order/detail',
    component: ()=>import('../views/order/orderDetail.vue')
  },
  
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/game/detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
