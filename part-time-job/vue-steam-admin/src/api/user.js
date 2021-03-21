import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/login/admin/getUserInfo',
    method: 'post',
    data: {token: token}
  })
}