export default [
  {
    name: 'home',
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: {}
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/pages/Search'),
    meta: {}
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: () => import('@/pages/Detail'),
    meta: {}
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('@/pages/Category'),
    meta: {}
  },
  {
    name: 'classify',
    path: '/classify',
    component: () => import('@/pages/Classify'),
    meta: {}
  },
  {
    name: 'shopCart',
    path: '/shopCart',
    component: () => import('@/pages/ShopCart'),
    meta: {},
  },
  {
    name: 'mySelf',
    path: '/mySelf',
    component: () => import('@/pages/MySelf'),
    meta: {}
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/pages/Order'),
    meta: {}
  },
  {
    name: 'setting',
    path: '/setting',
    component: () => import('@/pages/Setting'),
    meta: {}
  },
  {
    name: 'address',
    path: '/address',
    component: () => import('@/pages/Address'),
    meta: {}
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/pages/About'),
    meta: {}
  },
  {
    name: 'createOrder',
    path: '/createOrder',
    component: () => import('@/pages/CreateOrder'),
    meta: {},
  },
  {
    name: 'orderDetail',
    path: '/orderDetail',
    component: () => import('@/pages/OrderDetail'),
    meta: {},
  },
  {
    name: 'editAddress',
    path: '/editAddress',
    component: () => import('@/pages/EditAddress'),
    meta: {},
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: {},
  },


  
  // 重定向
  {
    path: '*',
    redirect: '/home',
  }

]