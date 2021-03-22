import request from '@/utils/request'

export function addGame(data) {
  return request({
    url: '/admin/game/add',
    method: 'post',
    data: data
  })
}
export function getGames(data) {
  return request({
    url: '/admin/game/getList',
    method: 'post',
    data: data
  })
}
export function getGameById(data) {
  return request({
    url: '/admin/game/getGameById',
    method: 'post',
    data: data
  })
}
export function deleteItem(data) {
  return request({
    url: '/admin/game/deleteGameById',
    method: 'post',
    data: data
  })
}
export function editGame(data) {
  return request({
    url: '/admin/game/editGame',
    method: 'post',
    data: data
  })
}