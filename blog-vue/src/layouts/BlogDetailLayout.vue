<template>
    <div class="blog-detail-layout">
        <div class="blog-detail-layout-header">
            <Navbar :hide-back="true" :hide-login="false" />
        </div>
        <div class="blog-detail-layout-content">
            
            <div class="blog-detail-layout-content-left">
                <DetailLeftSide />
            </div>
            
            <div class="blog-detail-layout-content-right">   
                <router-view />
            </div>

        </div>
        <div class="blog-detail-layout-footer">
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Footer from '../components/footer.vue';  
import DetailLeftSide from '../components/DetailLeftSide.vue';
</script>

<style scoped>
.blog-detail-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}



.blog-detail-layout-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 54px;


  .blog-detail-layout-content-left {
    width: 15%;

  }

  .blog-detail-layout-content-right {
    width: 85%;
  }
}


</style>