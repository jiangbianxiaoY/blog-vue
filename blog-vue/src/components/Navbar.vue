<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo/标题 -->
      <div class="navbar-brand">
        <router-link to="/" class="navbar-logo">
          江边小余的博客
        </router-link>
        <div class="navbar-categories">
          <template v-if="!loading && categories.length">
            <router-link
              v-for="cat in categories"
              :key="cat._id"
              :to="`/categoryDetail/${cat._id}`"
              class="navbar-category-item"
              active-class="is-active"
            >
              {{ cat.category }}
            </router-link>
          </template>
        </div>
      </div>

      

      <!-- 导航链接 -->
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <div class="navbar-start">
          <div class="navbar-item" @click="goAbout">
            关于我
          </div>
          <div class="navbar-item" @click="goLogin" v-if="!hideLogin">
            登录
          </div>
          <div class="navbar-item" @click="goBack" v-if="hideBack">
            返回
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const categories = ref<Array<any>>([])
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()

import { useCategoryStore } from '../store/Category.js'
const categoryStore = useCategoryStore()

defineProps({
  hideLogin: {
    type: Boolean,
    default: false
  },hideBack:{
    type:Boolean,
    default:false
  }
})

const goAbout = () => {
  router.push('/about')
}

const goLogin = () => {
  router.push('/login')
}

const goBack = () => {
  router.back()
}



// 获取文章分类的函数
const fetchCategories = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('http://localhost:3000/api/categories')
    categories.value = response.data.data;
    categoryStore.setCategories(response.data.data)
    //console.log('获取到的分类数据:', categories.value)
    console.log('store 加载的分类');
    //console.log(categoryStore.categories);
  } catch (err) {
    console.error('获取分类失败:', err)
    error.value = '获取分类数据失败，请稍后再试'
  } finally {
    loading.value = false
  }
}





// 在组件挂载时获取分类数据
onMounted(() => {
  fetchCategories()
})

</script>

<style scoped>
:root, .navbar, .navbar * {
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.navbar {
  background-color: rgba(34, 34, 34);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* 高度降低 */
  /* 可选：height: 56px; */
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem; /* 原为1rem，减小padding使导航栏更矮 */
  position: relative;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-logo {
  font-size: 1.45rem;
  font-weight: 600;
  color: rgba(157, 157, 157);
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-logo:hover {
  color: rgba(255, 255, 255 );
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-start {
  display: flex;
  gap: 1.5rem;
}

.navbar-item {
  color: rgba(157, 157, 157);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
  position: relative;
}

.navbar-item:hover {
  color: rgba(255, 255, 255);
}

.navbar-item.is-active {
  color: #7d9d9d;
}

.navbar-item.is-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #42b883;
}

.navbar-categories {
  display: flex;
  gap: 1.2rem;
  margin-left: 4rem;
}

.navbar-category-item {
  color: rgba(157, 157, 157);
  font-size: 1rem; /* 字体更大 */
  text-decoration: none;
  padding: 0.2rem 0.7rem;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}

.navbar-category-item:hover {
  background: none;
  color: rgba(255, 255, 255);
}

.navbar-category-item.is-active {
  background: #111;
  color: #fff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .navbar-menu.is-active {
    display: block;
  }

  .navbar-start {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-item {
    display: block;
    padding: 0.5rem 0;
  }

  .navbar-categories {
    margin-left: 1rem;
    gap: 0.5rem;
  }

  .navbar-category-item {
    font-size: 1.1rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>