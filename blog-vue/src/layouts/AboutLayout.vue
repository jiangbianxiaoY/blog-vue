<template>
    <div class="layout">
      <Navbar :hide-login="true" :hide-back="true" />
      <div class="main-area">
        <router-view />
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/footer.vue'
  </script>
  
  <style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
  }
  </style>