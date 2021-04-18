import request from '@/utils/request'

export function addOrder(data) {
  return request({
    url: '/user/order/add',
    method: 'post',
    data: data
  })
}
export function getOrderList(data) {
  return request({
    url: '/user/order/get',
    method: 'post',
    data: data
  })
}
export function updateOrder(data) {
  return request({
    url: '/user/order/update',
    method: 'post',
    data: data
  })
}
export function getOrderById(data) {
  return request({
    url: '/user/order/getbyId',
    method: 'post',
    data: data
  })
}