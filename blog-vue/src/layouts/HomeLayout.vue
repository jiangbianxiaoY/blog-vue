<template>
  <div class="layout">
    <Navbar />
    <div class="main-area">
      <div class="main-content">
        <router-view />
      </div>
      <div class="right-side-wrapper">
        <HomeRightSide />
      </div>
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
  background: #fff;
  min-height: 0;
  height: 100%;
}

.main-content {
  flex: 1;
  min-width: 0;
  height: 100%;
  background: #fff;
}

.right-side-wrapper {
  width: 300px;
  background: #fff;
  border-left: 1.5px solid #e0e0e0;
  height: 100%;
}

/* 确保 Footer 始终在底部 */
.footer {
  grid-row: 3; /* 明确指定在第三行 */
}
</style>