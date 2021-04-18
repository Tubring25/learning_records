import request from '@/utils/request'

export function addShoppingCart(data) {
  return request({
    url: '/user/cart/add',
    method: 'post',
    data: data
  })
}
export function getShoppingCart(data) {
  return request({
    url: '/user/cart/get',
    method: 'post',
    data: data
  })
}
export function updateShoppingCart(data) {
  return request({
    url: '/user/cart/update',
    method: 'post',
    data: data
  })
}
export function clearShoppingCart(data) {
  return request({
    url: '/user/cart/clear',
    method: 'post',
    data: data
  })
}