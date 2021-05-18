import request from '@/utils/request'

export function serverRegist(data) {
  return request({
    url: '/server/regist',
    method: 'post',
    data: data
  })
}

export function getExpressList(data) {
  return request({
    url: '/server/getExpressList',
    method: 'post',
    data: data
  })
}
export function getTakeOutList(data) {
  return request({
    url: '/server/getTakeOutList',
    method: 'post',
    data: data
  })
}