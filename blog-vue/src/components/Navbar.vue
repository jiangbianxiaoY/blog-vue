<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo/标题 -->
      <div class="navbar-brand">
        <router-link to="/" class="navbar-logo">
          江边小余的博客
        </router-link>
      </div>

      <!-- 移动端菜单按钮 -->
      <button class="navbar-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen">
        <span class="sr-only">Toggle navigation</span>
        <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <!-- 导航链接 -->
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item" active-class="is-active">
            首页
          </router-link>
          <router-link to="/articles" class="navbar-item" active-class="is-active">
            文章
          </router-link>
          <router-link to="/about" class="navbar-item" active-class="is-active">
            关于
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const isMenuOpen = ref(false)
const categories = ref<Array<any>>([])
const loading = ref(false)
const error = ref<string | null>(null)

// 获取文章分类的函数
const fetchCategories = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('/Category')
    categories.value = response.data
    console.log('获取到的分类数据:', categories.value)
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.navbar {
  background-color: rgba(34, 34, 34);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-logo {
  font-size: 1.5rem;
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
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
  position: relative;
}

.navbar-item:hover {
  color: #42b883;
}

.navbar-item.is-active {
  color: #42b883;
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

/* 汉堡菜单按钮 */
.navbar-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.hamburger {
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #2c3e50;
  transition: all 0.3s ease;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-toggle {
    display: block;
  }

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
}
</style>