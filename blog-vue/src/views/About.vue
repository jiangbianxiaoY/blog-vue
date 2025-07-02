<template>
    <div v-if="aboutData" class="about-container">
      <div class="about-card">
        <!-- 用户信息区块 -->
        <div class="user-info-section">
          <!-- 基本信息 -->
          <div class="info">
            <!-- 头像 -->
            <div class="avatar-container">
              <div class="avatar-circle">
                <img src="../../public/head.png" alt="个人头像" class="avatar" />
              </div>
            </div>
  
            <!-- 描述 -->
            <p class="subtitle">{{ aboutData.about.description }}</p>
  
            <span>昵称：{{ aboutData.about.name }}</span>
            <span>经历：{{ aboutData.about.experience }}</span>
            <span>年龄：{{ newtime - aboutData.about.age }}</span>
            <span>城市：{{ aboutData.about.location }}</span>
            <span>邮箱：<a :href="`mailto:${aboutData.about.email}`">{{ aboutData.about.email }}</a></span>
            <span>本项目链接：<a :href="aboutData.about.social_media.github" target="_blank">项目链接</a></span>
          </div>
  
          <!-- 内容区块（兴趣爱好 + 研究方向） -->
          <div class="content-section">
            <!-- 兴趣爱好区块 -->
            <div class="interests-section">
              <h2 class="section-title">兴趣爱好</h2>
              <ul class="interests-list">
                <li v-for="item in aboutData.about.interests" :key="item">{{ item }}</li>
              </ul>
            </div>
  
            <!-- 研究方向区块 -->
            <div class="search-section">
              <h2 class="section-title">研究方向</h2>
              <ul class="interests-list">
                <li v-for="item in aboutData.about.search" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import yaml from 'js-yaml'
  
  const newtime = ref(new Date().getFullYear())
  
  const aboutData = ref<any>(null)
  
  onMounted(async () => {
    const res = await fetch('/src/myselfconfig.yml')
    const text = await res.text()
    aboutData.value = yaml.load(text)
  })
  </script>
  
  <style scoped>
  :root, .about-container, .about-container * {
    font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }
  
  /* 容器 */
  .about-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at top left, #f8fafc, #e0e7ff);
    padding: 3rem 1rem;
  }
  
  .about-card {
    width: 100%;
    max-width: 1000px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    padding: 3rem;
    font-family: 'Noto Sans SC', sans-serif;
    animation: cardEnter 0.7s ease-out forwards;
    transform: translateY(30px);
    opacity: 0;
  }
  
  @keyframes cardEnter {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  /* 用户信息区块 */
  .user-info-section {
    display: flex;
    flex-wrap: wrap; /* 小屏幕下可换行 */
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .info {
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.1rem;
    align-items: flex-start;
    padding-left: 100px;
  }
  
  .avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem; /* 👈 关键：缩小与描述的距离 */
}
  
  .avatar-circle {
    width: 160px;
    height: 160px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    padding: 6px;
    border-radius: 50%;
    animation: avatarFloat 4s ease-in-out infinite;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  }
  
  @keyframes avatarFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
  
  .avatar {
    border: 4px solid white;
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  
  .subtitle {
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem; /* 可选：进一步压缩上边距 */
}
  
  .info a {
    color: #42b883;
    text-decoration: none;
  }
  
  .info a:hover {
    text-decoration: underline;
  }
  
  .content-section {
    padding-top: 200px;
    flex: 1 1 500px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  /* 兴趣爱好区块 */
  .interests-section,
  .search-section {
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: #1f2937;
    margin-bottom: 1rem;
    position: relative;
  }
  
  .section-title::after {
    content: '';
    width: 50px;
    height: 4px;
    background: linear-gradient(to right, #6366f1, #8b5cf6);
    margin: 0.5rem auto 0;
    display: block;
    border-radius: 2px;
  }
  
  .interests-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    list-style: none;
    padding: 0;
    justify-content: center;
  }
  
  .interests-list li {
    background: #e6f4f1;
    color: #42b883;
    padding: 0.4rem 1rem;
    border-radius: 16px;
    font-size: 0.98rem;
    font-weight: 500;
  }
  
  /* 响应式 */
  @media (max-width: 768px) {
    .about-card {
      padding: 2rem;
    }
  
    .user-info-section {
      flex-direction: column;
      align-items: stretch;
    }
  
    .info,
    .content-section {
      width: 100%;
      flex: 1 1 100%;
    }
  
    .info {
      gap: 0.8rem;
      font-size: 1rem;
    }
  
    .avatar-circle {
      width: 120px;
      height: 120px;
    }
  
    .subtitle {
      font-size: 1rem;
    }
  }
  </style>