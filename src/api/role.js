import request from '@/utils/request'

export function roleList() {
  return request({
    url: process.env.VUE_APP_RE_API + '/role/list',
    method: 'get'
  })
}

export function rolePage(roleName, page, limit) {
  return request({
    url: process.env.VUE_APP_RE_API + '/role/page',
    method: 'get',
    params: { roleName, page, limit }
  })
}

export function save() {
  return Promise.resolve({ msg: '', code: 200 })
}

export function update() {
  return Promise.resolve({ msg: '', code: 200 })
}
