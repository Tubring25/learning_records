const jwt = require('jsonwebtoken');
const fs = require('fs');

const serect = 'steamAdmin'
export function createToken() {
  return jwt.sign({ data: data }, serect, { expiresIn: '2d' });
}
export function verifyToken(token) {
  try {
    return jwt.verify(token, serect)
  }
  catch {
    return 'token已失效'
  }
}