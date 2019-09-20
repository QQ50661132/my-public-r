import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import fa from 'element-ui/src/locale/lang/fa'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/sys',
    component: Layout,
    name: 'Sys',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/sys/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/sys/role/index'),
        meta: { title: '角色管理', icon: 'peoples', noCache: true }
      }
    ]
  },
  {
    path: '/flow',
    component: Layout,
    name: 'Flow',
    meta: {
      title: '业务中心',
      icon: 'example'
    },
    children: [
      {
        path: 'institution',
        name: 'Institution',
        component: () => import('@/views/flow/institution/index'),
        meta: { title: '机构管理', icon: '' }
      },
      {
        path: 'field-code',
        name: 'FieldCode',
        component: () => import('@/views/flow/field-code/index'),
        meta: { title: '决策变量管理', icon: '' }
      },
      {
        path: 'score',
        name: 'Score',
        component: () => import('@/views/flow/score/index'),
        meta: { title: '评分组', icon: '' }
      },
      {
        path: 'rules-setting',
        name: 'RulesSetting',
        component: () => import('@/views/flow/rules-setting/index'),
        meta: { title: '规则组设置', icon: '' }
      },
      {
        path: 'decision-flow',
        name: 'DecisionFlow',
        component: () => import('@/views/flow/decision-flow/index'),
        meta: { title: '决策流设置', icon: '' }
      },
      {
        path: 'decision-tree',
        name: 'DecisionTree',
        component: () => import('@/views/flow/decision-tree/index'),
        meta: { title: '决策树', icon: '' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
