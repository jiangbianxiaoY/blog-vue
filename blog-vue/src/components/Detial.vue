<template>
  <div class="detail-container" v-if="article">
    <button class="theme-toggle" @click="theme = theme === 'light' ? 'dark' : 'light'">
      切换{{ theme === 'light' ? '深色' : '浅色' }}主题
    </button>
    <div class="detail-header">
      <h1 class="detail-title">{{ article.title }}</h1>
    </div>
    <div class="detail-info">
      <span>
        <img src="../../public/gift.svg" alt="文件" class="file-icon" />Posted on
        {{ new Date(article.createTime).toISOString().split('T')[0] }}
      </span>
     
        By <span class="author-name">{{ article.authorName }}</span>  |
      
      <span class="info-category">
        <img src="../../public/files.svg" alt="文件" class="fly-icon" />
        In {{ categories.categories.find(category => category._id === article.categoryid)?.category || '未知分类' }}
      </span>
    </div>
    <div class="detail-content">
      <div class="detail-content-item">
        <div ref="vditorPreview"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch, nextTick } from 'vue';
import axios from 'axios';
import { useCategoryStore } from '../store/Category.js'
import Vditor from 'vditor';
import 'vditor/dist/index.css';

// 主题切换
const theme = ref<'light' | 'dark'>('light');
watch(theme, (val) => {
  const lightTheme = 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.css';
  const darkTheme = 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.css';
  const linkId = 'hljs-theme-link';
  let link = document.getElementById(linkId) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = val === 'dark' ? darkTheme : lightTheme;
}, { immediate: true });

const categoryStore = useCategoryStore();
const categories = categoryStore;
const route = useRoute();
const id = route.params.id;
const article = ref<any>(null);
const vditorPreview = ref<HTMLDivElement | null>(null);

onMounted(() => {
  axios.get(`http://localhost:3000/api/articles/${id}`).then(res => {
    article.value = res.data.data;
    setTimeout(() => {
      if (vditorPreview.value && article.value?.content) {
        console.log('Vditor.preview called in setTimeout', vditorPreview.value, article.value.content);
        Vditor.preview(vditorPreview.value, article.value.content, {
          mode: 'light',
          hljs: { style: 'github' },
          theme: { current: 'light' },
          markdown: { toc: true, mark: true, footnotes: true, autoSpace: true },
        });
      } else {
        console.log('vditorPreview or content missing', vditorPreview.value, article.value?.content);
      }
    }, 100);
  });
});

watch(
  () => article.value?.content,
  (newContent) => {
    console.log('Vditor watch newContent:', newContent);
    if (vditorPreview.value && newContent) {
      nextTick(() => {
        console.log('Vditor.preview called, vditorPreview:', vditorPreview.value);
        Vditor.preview(vditorPreview.value!, newContent, {
          mode: 'light',
          hljs: { style: 'github' },
          theme: { current: 'light' },
          markdown: { toc: true, mark: true, footnotes: true, autoSpace: true },
        });
      });
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.detail-container {
  margin-top: 20px ;
  margin-left: 20px;
  background: #fff;
  border-radius: 8px;
  padding: 32px 24px;

  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.theme-toggle {
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 10;
  background: #fff;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.theme-toggle:hover {
  opacity: 1;
}
.detail-header {
  margin-bottom: 16px;
}
.detail-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.detail-info {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #888;
  font-size: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.detail-info span {
  display: flex;
  align-items: center;
  gap: 4px;
}
.file-icon, .fly-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin: 0;
  display: inline-block;
}

.detail-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #222;
}
.detail-content-item {
  margin-top: 16px;
}
.detail-content-item > div {
  min-height: 100px;
}
.custom-code-block {
  border-radius: 6px;
  border: 1px solid #e1e4e8;
  background: #f6f8fa;
  margin: 1em 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  font-size: 1em;
}
.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
  border-bottom: 1px solid #e1e4e8;
  padding: 0.3em 1em;
  font-size: 0.95em;
}
.code-lang {
  color: #555;
  font-weight: bold;
  font-size: 0.95em;
}
.copy-btn {
  background: #fff;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.copy-btn:hover {
  opacity: 1;
}
.hljs, pre.hljs {
  background: #f6f8fa !important;
  padding: 1em;
  margin: 0;
  font-size: 1em;
  overflow-x: auto;
}
.code-line {
  display: block;
  position: relative;
  padding-left: 2.5em;
  font-family: inherit;
}
.code-line::before {
  content: attr(data-line);
  position: absolute;
  left: 0;
  width: 2em;
  color: #aaa;
  text-align: right;
  padding-right: 0.5em;
  user-select: none;
  font-size: 0.95em;
}


.author-name {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}
.author-name:hover {
  text-decoration: underline;
}

.info-category {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}
.info-category:hover {
  text-decoration: underline;
}

</style>