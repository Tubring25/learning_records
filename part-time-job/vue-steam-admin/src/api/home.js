import request from '@/utils/request'

export function getPaneData (data) {
  return request({
    url: '/admin/home/getPane',
    method: 'post',
    data: data
  })
}

export function getLineData (data) {
  return request({
    url: '/admin/home/line',
    method: 'post', 
    data: data
  })
}