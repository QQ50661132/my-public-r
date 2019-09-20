import request from '@/utils/request'

export function list() {
  return request({
    url: process.env.VUE_APP_RULES_ENGINE_API + '/orgRole/list',
    method: 'get'
  })
}
