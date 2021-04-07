import request from '@/utils/request'

export function recommenAdd(data) {
  return request({
    url: '/admin/recommend/add',
    method: 'post',
    data: data
  })
}
export function recommenDel(data) {
  return request({
    url: '/admin/recommend/delete',
    method: 'post',
    data: data
  })
}
export function specSaleAdd(data) {
  return request({
    url: '/admin/specsale/add',
    method: 'post',
    data: data
  })
}
export function specSaleDel(data) {
  return request({
    url: '/admin/specsale/delete',
    method: 'post',
    data: data
  })
}
export function getRecommendList(data) {
  return request({
    url: '/admin/recommend/get',
    method: 'post',
    data: data
  })
}
export function getSpecSaleList(data) {
  return request({
    url: '/admin/specsale/get',
    method: 'post',
    data: data
  })
}