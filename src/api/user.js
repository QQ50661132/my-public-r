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

export function userPage(userName, roleId, page, limit) {
  return request({
    url: process.env.VUE_APP_RE_API + '/user/page',
    method: 'get',
    params: { userName, roleId, page, limit }
  })
}

export function save(user) {
  return Promise.resolve({ msg: '成功', code: 200 })
}

export function update(user) {
  return Promise.resolve({ msg: '成功', code: 200 })
}

