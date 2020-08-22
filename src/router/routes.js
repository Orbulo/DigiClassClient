
const routes = [
  {
    path: '/',
    component: () => import('pages/index.js')
  },
  {
    path: '/',
    component: () => import('layouts/ClassroomLayout.vue'),
    children: [
      {
        path: 'room/create',
        component: () => import('../pages/ClassroomMeet.vue'),
      },
      {
        path: 'discussion',
        component: () => import('../pages/ClassroomDiscussion.vue'),
      },
      {
        path: 'questions',
        component: () => import('../pages/ClassroomQuestionList.vue'),
      },
      {
        path: 'question/:questionId',
        component: () => import('../pages/ClassroomQuestion.vue')
      }
    ]
  },
  {
    path: '/room/:roomId',
    component: () => import('../pages/ClassroomVideoRoom.vue')
  },
  {
    path: '/classrooms',
    component: () => import('../pages/ClassroomList.vue')
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
