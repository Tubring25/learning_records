
const UserToken = 'tttt'

export function getToken() {
  return sessionStorage.getItem(UserToken)
}

export function setToken(token) {
  return sessionStorage.setItem(UserToken, token)
}

export function removeToken() {
  return sessionStorage.removeItem(UserToken)
}

export function setInfo(name, data) {
  return sessionStorage.setItem(name, data)
}
export function getInfo(name) {
  return sessionStorage.getItem(name)
}
export function removeInfo(name) {
  return sessionStorage.removeItem(name)
}
