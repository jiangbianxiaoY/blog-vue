<script setup lang="ts">
const blogPosts = [
  {
    title: '开始使用Vue3',
    date: '2024-01-20',
    summary: '探索Vue3的新特性和Composition API的优势...'
  },
  {
    title: 'TypeScript最佳实践',
    date: '2024-01-18',
    summary: '学习TypeScript在Vue项目中的应用技巧...'
  },
  {
    title: 'Vite构建工具介绍',
    date: '2024-01-15',
    summary: '了解为什么Vite是现代前端开发的理想选择...'
  }
]
</script>

<template>
  <div class="home">
    <header class="hero">
      <h1>技术博客</h1>
      <p class="subtitle">分享Web开发的心得与体会</p>
    </header>

    <main class="content">
      <section class="blog-posts">
        <article v-for="post in blogPosts" :key="post.title" class="post-card">
          <h2>{{ post.title }}</h2>
          <div class="post-meta">{{ post.date }}</div>
          <p class="post-summary">{{ post.summary }}</p>
          <button class="read-more">阅读更多</button>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.hero {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 600;
}

.subtitle {
  font-size: 1.2rem;
  margin-top: 1rem;
  opacity: 0.9;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-posts {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.post-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.post-card:hover {
  transform: translateY(-4px);
}

.post-card h2 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.post-summary {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.read-more {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.read-more:hover {
  background-color: #3aa876;
}
</style>