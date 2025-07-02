<template>
    <div class="footer">
        <span class="count">本网站已有{{ visitCount }} 人访问</span>
        <span class="tips">{{ year }}江边小余</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onUnmounted } from 'vue';

const visitCount = ref(0);
const year = ref(new Date().getFullYear());

onMounted(() => {
    const key = 'footerVisitCount';
    const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    visitCount.value = count;
    localStorage.setItem(key, count.toString());
});

onUnmounted(() => {
    visitCount.value++;
    localStorage.setItem('footerVisitCount', visitCount.value.toString());
});
</script>

<style scoped>  
.footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: #f0f0f0;
    flex-direction: column;
}

.count{
    font-size: 15px;
    color: #000000;
    margin-bottom: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.tips{
    font-size: 12px;
    color: #000000;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>