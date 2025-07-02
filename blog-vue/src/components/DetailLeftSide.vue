<template>
  <div class="detail-left-side">
    <h2 class="item-title">相关推荐</h2>
    <div class="item-content">
      <div v-for="article in hotArticles" :key="article._id" class="hot-article-item">
        <div class="hot-article-item-title">
          <span>{{ article.title }}</span>
        </div>
        <div class="hot-article-views-conments">
          <div>
            <img src="../../public/view.svg" alt="文件" class="hot-article-icon">
            <span class="hot-article-views">点击({{ article.views }})</span>
          </div>
          <div>
            <img src="../../public/like.svg" alt="文件" class="hot-article-icon">
            <span class="hot-article-conments">喜欢({{ article.comments }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Article {
  _id: string;
  title: string;
  views: number;
  comments: number;
}

const hotArticles = ref<Article[]>([]);

const fetchHotArticles = async () => {
  const response = await axios.get('http://localhost:3000/api/articles/hot');
  try {
    hotArticles.value = response.data.data;
  } catch (error) {
    console.error('获取热门文章失败:', error);
  }
};

onMounted(() => {
  fetchHotArticles();
});
</script>

<style scoped>
.detail-left-side {
  width: 100%;
  background: #fff;
  height: 100%;
  border-right: 2px solid #e0e0e0;
}

.item-title {
  font-size: 20px;
  font-weight: normal;
  margin-left: 10px;
  padding-left: 10px;
  padding-top: 5px;
  box-sizing: border-box;
}

.item-content {
  font-size: 15px;
  margin-left: 10px;
  padding-left: 10px;
  padding-top: 1px;
  box-sizing: border-box;
  color: #347ab7;
  display: flex;
  flex-direction: column;
}

.hot-article-item {
  display: flex;
  margin-bottom: 12px;
  flex-direction: column;
}

.hot-article-item-title {
  font-size: 15px;
  padding-bottom: 10px;
}

.hot-article-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  display: inline-block;
  margin-right: 3px;
}

.hot-article-views-conments {
  font-size: 14px;
  color: #999;
  display: flex;
  gap: 15px;
  align-items: center;
}

.hot-article-views, .hot-article-conments {
  font-size: inherit;
  vertical-align: middle;
}
</style>    