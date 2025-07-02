<template>
  <div class="layout">
    <Navbar :hide-login="true" :hide-back="true" />
    <div class="main-area">
      <div class="content-wrapper">
        <div class="admin-left-side">
          <AdminLeftSide />
        </div>
        <div class="admin-right-side">
          <router-view />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-area {
  flex: 1;
  display: flex;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px 0;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  display: flex;
  gap: 20px;
}

.admin-left-side {
  width: 200px;
  flex-shrink: 0;
}

.admin-right-side {
  flex: 1;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>