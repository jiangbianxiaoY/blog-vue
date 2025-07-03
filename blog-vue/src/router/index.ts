import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeLayout from '../layouts/HomeLayout.vue'
import AboutLayout from '../layouts/AboutLayout.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import Articles from '../components/Articles.vue'
import BlogDetailLayout from '../layouts/BlogDetailLayout.vue'
import CategoryDetailLayout from '../layouts/CategoryDetailLayout.vue'




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
      },
      {
        path: 'createBlog',
        name: 'admin-createBlog',
        component: () => import('../components/CreateBlog.vue')
      },
      {
        path: 'changeBlog/:id',
        name: 'admin-changeBlog',
        component: () => import('../components/ChangeBlog.vue')
      }
    ]
  },
  {
    path: '/changeBlog/:id',
    name: 'change-blog',
    component: () => import('../components/ChangeBlog.vue')
  },{
    path: '/blogDetail/:id',
    component: BlogDetailLayout,
    children: [
      {
        path: '',
        name: 'blog-detail',
        component: () => import('../components/Detial.vue')
      }
    ]
  },
  {
    path: '/categoryDetail/:id',
    component: CategoryDetailLayout,
    children: [
      {
        path: '',
        name: 'category-detail',
        component: () => import('../components/Detial.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router