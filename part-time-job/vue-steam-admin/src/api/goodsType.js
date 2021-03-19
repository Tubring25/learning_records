import request from '@/utils/request'

export function getGoodsType() {
  return request({
    url: '/admin/getType',
    method: 'get',
    private: true
  })
}

export function editGoodsType(data) {
  return request({
    url: '/admin/editType',
    method: 'post',
    data: data
  })
}

export function addGoodsType(data) {
  return request({
    url: '/admin/addType',
    method: 'post',
    data: data
  })
}

export function deleteGoodsType(data) {
  return request({
    url: '/admin/deleteType',
    method: 'post',
    data:data
  })
}