import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data: data
  })
}

export function getInfo(data) {
  return request({
    url: '/login/getUserInfo',
    method: 'post',
    data: data
  })
}

export function uploadImg(data){
  return request({
    url: '/login/upload',
    method: 'post',
    data: data,
    header: 'formdata'
  })
}
