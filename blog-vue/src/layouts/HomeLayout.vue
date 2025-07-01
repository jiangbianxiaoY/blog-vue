<template>
  <div class="layout">
    <Navbar  />
    <div class="main-area">
      <div class="main-content">
        <router-view />
      </div>
      <HomeRightSide />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Footer from '../components/footer.vue';
import HomeRightSide from '../components/HomeRightSide.vue';







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
  flex-direction: row;
  position: relative;
  background: #f5f5f5;
  min-height: 0;
}

.main-content {
  flex: 1;
  padding: 2rem;
  min-width: 0;
  margin-right: 300px;
}

.right-sidebar {
  position: absolute;
  top: 0;
  right: 20px; /* 与内容区padding一致 */
  width: 240px;
  height: 100%; /* 高度与内容区一致 */
  top: 54px;
  background: #f5f5f5;
  padding: 20px;
}

/* 确保 Footer 始终在底部 */
.footer {
  grid-row: 3; /* 明确指定在第三行 */
}
</style>