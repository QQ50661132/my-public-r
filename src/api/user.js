import request from '@/utils/request'

// AQAAAAIAAAABAAAAAgAAAAMAAAABAAAAAgAAAAMAAAABAAAAAgAAAAMAAAA
export function login(data) {
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('password', data.password)
  return request({
    // url: '/user/login',
    url: process.env.VUE_APP_RE_API + '/user/login',
    method: 'post',
    data: params
  })
}

export function getInfo(id) {
  return request({
    url: process.env.VUE_APP_RE_API + '/user/info/' + id,
    method: 'get'
  })
}

export function getCurrent(token) {
  return request({
    url: process.env.VUE_APP_RE_API + '/user/login/current',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: process.env.VUE_APP_RE_API + '/user/login/exit',
    method: 'delete'
  })
}
export function userList(userName, roleId) {
  console.log({ userName, roleId })
  return request({
    url: process.env.VUE_APP_RE_API + '/user/page',
    method: 'get',
    params: { userName, roleId, page: 1, limit: 99999 }
  })
}

