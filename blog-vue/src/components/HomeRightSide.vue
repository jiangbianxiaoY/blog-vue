<template>
    <div class="home-right-side">
        <div class="home-right-side-item">
            <div class="home-right-side-item-title">
                <h2>最新文章</h2>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
// 无需引入 Navbar、Footer、router-view
</script>

<style scoped>
.home-right-side {
    width: 300px;
    background: #f0f0f0;
    position: fixed;
    top: 54px; /* 导航栏高度 */
    right: 0;
    bottom: 0;
    z-index: 10;
    overflow-y: auto;
}
</style>