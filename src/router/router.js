import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login/login'
// @->src 是webpack封装好的
// import Login from '@/components/login/login.vue'
import Home from '../components/login/home/home'
// 调用router
Vue.use(Router)

// 挂载导航守卫
// export default new Router
const router = new Router({
  routes: [
    {
      path: '/',
      // 重定向到login中
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

// 路由导航守卫控制登入的权限
// 暴露路由之前,挂载路由的导航守卫
router.beforeEach((to, from, next) => {
  // toj将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数, 表示放行
  // next() 放行 next('/')

  if (to.path === '/login') return next()
  // 获取token,从sessionStorage   window.sessionStorage.getItem('键名')
  const tokenStr = window.sessionStorage.getItem('token')
  // console.log(tokenStr)
  // tokenStr是空值
  if (!tokenStr) return next('/login') // 没有token,说明是没有登入,跳转到登入页面
  next() // 登入了,有token,放行
})

export default router
