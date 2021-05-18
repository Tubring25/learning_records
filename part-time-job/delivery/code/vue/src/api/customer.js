import request from '@/utils/request'

export function customerRegist(data) {
  return request({
    url: '/user/regist',
    method: 'post',
    data: data
  })
}
export function addExpress(data) {
  return request({
    url: '/user/addExpress',
    method: 'post',
    data: data
  })
}
export function addTakeOut(data) {
  return request({
    url: '/user/addTakeOut',
    method: 'post',
    data: data
  })
}
export function addFeedback(data) {
  return request({
    url: '/user/addFeedback',
    method: 'post',
    data: data
  })
}
export function getExpressList(data) {
  return request({
    url: '/user/getExpressList',
    method: 'post',
    data: data
  })
}
export function getTakeOutList(data) {
  return request({
    url: '/user/getTakeOutList',
    method: 'post',
    data: data
  })
}
export function getFeedbackList(data) {
  return request({
    url: '/user/getFeedbackList',
    method: 'post',
    data: data
  })
}