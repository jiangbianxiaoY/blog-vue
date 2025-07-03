


<template>
    <div class="category-detail-layout">
        <div class="category-detail-layout-header">
            <Navbar :hide-back="true" :hide-login="true" />
        </div>



        <div class="category-detail-layout-content">

            <div class="category-detail-layout-content-left">
                <CategoryLeftSide />
            </div>

            <div class="category-detail-layout-content-right">
                <router-view />
            </div>
            
        </div>

        <div class="category-detail-layout-footer">
            <Footer />
        </div>



    </div>







</template>



<script setup lang="ts">

//导航栏
//左侧分离
//阅读博客页面
//主要部分

import Navbar from '../components/Navbar.vue';
import Footer from '../components/footer.vue';  
import CategoryLeftSide from '../components/CategoryLeftSide.vue';









</script>



<style scoped>

.category-detail-layout{
    display: flex;
    flex-direction: column;
    height: 100vh;
}







</style>
