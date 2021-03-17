import request from '@/utils/request'

export function register(data){
  return request({
    url: '/login/user/register',
    method: 'post',
    data: data
  })
}

export function login (data){
  return request({
    url: '/login/user/login',
    method: 'post',
    data: data
  })
}

export function getUserInfo (data) {
  return request({
    url: '/login/getUserInfo',
    method:'post',
    data: data
  })
}