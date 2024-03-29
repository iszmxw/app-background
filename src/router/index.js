import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
    path: '*',
    redirect: '/login'
  },
  {
    name: 'login',
    component: () => import('../view/login'),
    meta: {
      title: '登录后台'
    }
  },
  {
    name: 'user',
    component: () => import('../view/user'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'cart',
    component: () => import('../view/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: () => import('../view/goods'),
    meta: {
      title: '商品详情'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }

  // 判断用户是否登录，未登录不能浏览的页面进行拦截跳转到登录
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }

});


export {
  router
}