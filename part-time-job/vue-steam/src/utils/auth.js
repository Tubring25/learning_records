
const UserToken = 'non_public_admin_usertoken'

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
export function removeInfo(name, data) {
  return sessionStorage.removeItem(name)
}
