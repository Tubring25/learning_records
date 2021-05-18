import request from '@/utils/request'

export function getCustomerList(data) {
  return request({
    url: '/admin/getCustomerList',
    method: 'post',
    data: data
  })
}

export function getServerList(data) {
  return request({
    url: '/admin/getServerList',
    method: 'post',
    data: data
  })
}
export function editCustomer(data) {
  return request({
    url: '/admin/editCustomer',
    method: 'post',
    data: data
  })
}
export function editServer(data) {
  return request({
    url: '/admin/editServer',
    method: 'post',
    data: data
  })
}
export function delCustomer(data) {
  return request({
    url: '/admin/delCustomer',
    method: 'post',
    data: data
  })
}
export function delServer(data) {
  return request({
    url: '/admin/delServer',
    method: 'post',
    data: data
  })
}
export function getFeedbackList(data) {
  return request({
    url: '/admin/getFeedbackList',
    method: 'post',
    data: data
  })
}
export function editFeedbackList(data) {
  return request({
    url: '/admin/editFeedbackList',
    method: 'post',
    data: data
  })
}