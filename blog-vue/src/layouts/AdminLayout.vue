<template>
  <div class="admin-layout">
    <header class="admin-header">
      <Navbar :hide-login="true" :hide-back="true" />
    </header>
    <main class="admin-main">
      <aside class="admin-sidebar">
        <AdminLeftSide />
      </aside>
      <section class="admin-content">
        <router-view />
      </section>
    </main>
    <footer class="admin-footer">
      <Footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/footer.vue'
import AdminLeftSide from '../components/AdminLeftSide.vue'
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.admin-header {
  flex-shrink: 0;
  z-index: 100;
}

.admin-footer {
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.admin-main {
    padding-top: 50px;
  flex: auto;
  min-height: 0;
  display: flex;
  flex-direction: row;
  height: 100%;
  background: #f5f5f5;
}

.admin-sidebar {
  width: 220px;
  background: linear-gradient(135deg, #2c3e50, #1a252f);
  color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  margin: 10px 10px 10px 10px;
}

.admin-content {
  flex: 1;
  min-height: 100%;
  height: 100%;
  background: #fff;
  border-radius: 0 10px 10px 0;
  padding: 24px;
  min-width: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>    