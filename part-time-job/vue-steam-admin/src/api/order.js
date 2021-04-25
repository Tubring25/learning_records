import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url:'/admin/order/get',
    method: 'post',
    data: data
  })
}

export function getOrderById(data) {
  return request({
    url: '/admin/order/getbyId',
    method: 'post',
    data: data
  })
}

export function delOrder(data) {
  return request({
    url: '/admin/order/del',
    method: 'post',
    data: data
  })
}

