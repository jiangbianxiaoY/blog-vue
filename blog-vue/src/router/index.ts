import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeLayout from '../layouts/HomeLayout.vue'
import AboutLayout from '../layouts/AboutLayout.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import Admin from '../views/Admin.vue'
import Articles from '../components/Articles.vue'




const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },{
    path: '/about',
    component: AboutLayout,
    children: [
      {
        path: '',
        name: 'about',
        component: About
      }
    ]
  },{
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirect: '/admin/articles'
      },
      {
        path: 'articles',
        name: 'admin-articles',
        component: Articles
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router