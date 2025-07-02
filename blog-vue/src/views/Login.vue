<template>
    <div class="login-container">
      <div class="login-card">
        <h1 class="title">欢迎登录</h1>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <label for="username">用户名</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">密码</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="请输入密码"
              required
            />
          </div>
          <button type="submit" class="login-btn">登 录</button>
          <button type="button" class="back-btn" @click="goBack">返 回</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  const router = useRouter()
  
  const username = ref('')
  const password = ref('')
  
  const goBack = () => {
    router.push('/')
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username: username.value,
        password: password.value
      })
      const res = response.data
      if (res.success) {
        localStorage.setItem('token', res.token)
        router.push('/admin')
      } else {
        alert(res.message)
      }
    } catch (err) {
      alert('登录请求失败，请稍后再试')
    }
  }

  </script>
  
  <style scoped>
  :root, .login-container, .login-container * {
    font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }
  
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 2.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    animation: fadeIn 0.5s ease;
  }
  
  .title {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 1.8rem;
    font-weight: 600;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .input-group label {
    font-size: 0.9rem;
    color: #555;
    font-weight: 500;
  }
  
  .input-group input {
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  .input-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
  
  .login-btn {
    padding: 0.8rem;
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  .back-btn{
    padding: 0.8rem;
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 8px;
  }
  .back-btn:hover{
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }



  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>