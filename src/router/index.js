import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout'
import Home from '../views/User.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/user",
    children:[
      {
        path:"user",
        name:'User',
        component:()=>import("../views/User.vue")
      },
      {
        path:"book",
        name:'book',
        component:()=>import("../views/book.vue")
      },
      {
        path:"person",
        name:'Person',
        component:()=>import("../views/Person.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
