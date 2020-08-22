
const routes = [
  {
    path: '/',
    component: () => import('layouts/ClassroomLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../pages/Accounts/SignUp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Accounts/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
