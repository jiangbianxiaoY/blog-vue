<template>
    <div class="about-container">
      <div class="about-card">
        <div class="avatar-container">
          <div class="avatar-circle">
            <img 
              src="https://via.placeholder.com/150" 
              alt="个人头像"
              class="avatar"
            >
          </div>
        </div>
        
        <h1 class="title">关于我</h1>
        
        <div class="content-section">
          <p class="intro-text">
            我是江边小余，一名充满热情的全栈开发者，专注于创造优雅高效的Web解决方案。
          </p>
          
          <div class="skills-section">
            <h2 class="section-title">技术栈</h2>
            <div class="skills-grid">
              <div 
                v-for="skill in skills" 
                :key="skill.name"
                class="skill-item"
              >
                <div class="skill-icon">
                  <i :class="skill.icon"></i>
                </div>
                <span>{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="social-links">
          <a 
            v-for="link in socialLinks" 
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="social-icon"
          >
            <i :class="link.icon"></i>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const skills = ref([
    { name: 'Vue.js', icon: 'fab fa-vuejs' },
    { name: 'TypeScript', icon: 'fas fa-code' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'CSS3', icon: 'fab fa-css3-alt' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'Git', icon: 'fab fa-git-alt' }
  ])
  
  const socialLinks = ref([
    { name: 'GitHub', icon: 'fab fa-github', url: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
    { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:example@example.com' }
  ])
  </script>
  
  <style scoped>
  /* 基础布局 */
  .about-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
    padding-top: 54px;
  }
  
  /* 卡片设计 */
  .about-card {
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 2.5rem;
    position: relative;
    transform: translateY(20px);
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  /* 头像样式 */
  .avatar-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .avatar-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea, #764ba2);
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
  }
  
  /* 文字样式 */
  .title {
    text-align: center;
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #667eea, #764ba2);
    
    -webkit-text-fill-color: transparent;
  }
  
  .intro-text {
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: center;
    position: relative;
  }
  
  .section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #667eea, #764ba2);
    margin: 0.5rem auto 0;
  }
  
  /* 技术栈网格 */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .skill-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;
  }
  
  .skill-item:hover {
    transform: translateY(-5px);
  }
  
  .skill-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
    color: #667eea;
  }
  
  /* 社交链接 */
  .social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f5f7fa;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #667eea;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }
  
  /* 动画 */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .about-card {
      padding: 1.5rem;
    }
    
    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
  </style>