import request from '@/utils/request'

export function register(data){
  return request({
    url: '/users',
    method: 'post',
    data: data
  })
}