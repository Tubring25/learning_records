import request from '@/utils/request'

export function getGameById(data) {
  return request({
    url: '/user/game/getGameById',
    method: 'post',
    data: data
  })
}

export function getGameList(data) {
  return request({
    url: '/user/game/getList',
    method: 'post',
    data: data
  })
}

export function getComment(data) {
  return request({
    url: '/user/game/getComment',
    method: 'post',
    data:data
  })
}

export function addComment(data) {
  return request({
    url: '/user/game/addComment',
    method:'post',
    data: data
  })
}

export function delComment(data) {
  return request({
    url: '/user/game/delCommit',
    method: 'post',
    data: data
  })
}