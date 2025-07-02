<template>
  <div class="home">
    

    <main class="content">
      <section class="blog-posts">
        <article v-for="post in articles" :key="post._id" class="post-card">
          <h2>{{ post.title }}</h2>
          <div class="post-meta">
            <img src="../../public/files.svg" alt="文件" class="file-icon">
            Posted on {{ new Date(post.createTime).toISOString().split('T')[0] }}｜
            <img src="../../public/fly.svg" alt="文件" class="fly-icon">
            In {{ categories.categories.find(category => category._id === post.categoryid)?.category || '未知分类' }} 
            
          </div>
          <div class="post-summary" v-html="renderMarkdown(post.content)"></div>
          <button class="read-more" @click="router.push(`/blogDetail/${post._id}`)">Read more</button>
        </article>
        <div v-if="articles.length === 0" class="no-articles">暂无文章</div>
      </section>
      <div class="button-container">
        <button class="new-article" @click="fetchNewerArticles">Newer</button>
        <button class="older-article" @click="fetchOlderArticles">Older</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import axios from 'axios';
import { useCategoryStore } from '../store/Category.js'
import MarkdownIt from 'markdown-it'
import { useRouter } from 'vue-router';
const router = useRouter();
const md = new MarkdownIt()
const categoryStore = useCategoryStore();
const categories = categoryStore;

interface Article {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  categoryid?: string;
  childCategories?: string;
  isDraft?: boolean;
  createTime: number;
  updateTime?: number;
  views?: number;
  comments?: number;
}

let articles = reactive<Article[]>([]);

const fetchArticles = async () => {
  const response = await axios.get('http://localhost:3000/api/articles?limit=5');
  // 按 createTime 降序排序
  const sorted = response.data.data.sort((a: Article, b: Article) => b.createTime - a.createTime);
  articles.splice(0, articles.length, ...sorted);
  console.log(articles);
}

const getMaxCreateTime = () => Math.max(...articles.map(a => a.createTime))
const getMinCreateTime = () => Math.min(...articles.map(a => a.createTime))

//获取比当前博客列表中最新createTime还新的文章
const fetchNewerArticles = async () => {
  if (!articles.length) return
  const maxTime = getMaxCreateTime()
  const response = await axios.get(`http://localhost:3000/api/articles?limit=5&newerThan=${maxTime}`)
  articles.splice(0, articles.length, ...response.data.data)
  console.log(articles)
}

//获取比当前博客列表中最旧createTime还旧的文章
const fetchOlderArticles = async () => {
  if (!articles.length) return
  const minTime = getMinCreateTime()
  const response = await axios.get(`http://localhost:3000/api/articles?limit=5&olderThan=${minTime}`)
  articles.splice(0, articles.length, ...response.data.data)
  console.log(articles)
}

//创建一个钩子函数 访问这个组件的时候自动获取5个文章
onMounted(fetchArticles)

onMounted(() => {
  console.log('pinia 加载的分类');
  console.log(categories);
})

const renderMarkdown = (mdText: string) => md.render(mdText)
</script>
<style scoped>
:root, .home, .home * {
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.home {
  min-height: 100vh;
  background-color: #ffffff;
  padding-top: 54px;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 600;
}

.subtitle {
  font-size: 1.2rem;
  margin-top: 1rem;
  opacity: 0.9;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.post-card {
  background: white;
  padding: 0.5rem;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center; /* 整体子元素居中对齐 */
  text-align: center;  /* 文本内容居中对齐 */
  /*border: 1px solid #de0e0e0;*/
  width: 720px;
}

.post-card h2 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: normal;
  /* 不需要单独设置 text-align: center，因为父级已经设置 */
  width: 100%; /* 让 h2 占满宽度 */
}

.post-meta {
  width: 100%; /* 让 meta 信息占满宽度 */
  /* 其他样式保持不变 */
}

.post-summary {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  width: 100%; /* 占满可用宽度 */
  text-align: left; /* 单独设置左对齐 */
  padding: 0 1rem; /* 可选：添加一些内边距 */
  margin-bottom: 10px;
}

.read-more {
  background-color: #222222;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
  /* 按钮会自动继承父级的居中对齐 */
}

.button-container{
  display: flex;
  gap: 800px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 80px;


  .new-article{
    background-color: #222222;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s ease;
    border-radius: 120px;
  }

  .older-article{
    background-color: #222222;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s ease;
    border-radius: 120px;
  }

  .new-article:hover{
    background-color: #ffffff;
    color: #222222;
    border: 2px solid #222222;
  }

  .new-article:hover{
    background-color: #ffffff;
    color: #222222;
    border: 2px solid #222222;
  }

  .older-article:hover{
    background-color: #ffffff;
    color: #222222;
    border: 2px solid #222222;
  }
}



.post-card:hover {
  transform: translateY(-4px);
}



.post-meta {
  color: #666;
  font-size: 0.5rem;
  margin-bottom: 1rem;
}





.read-more:hover {
  background-color: #ffffff;
  color: #222222;
  border: 2px solid #222222;
}

.file-icon{
  width: 12px;
  height: 12px;
  margin-right: 0px;
}

.fly-icon{
  width: 12px;
  height: 12px;
  margin-right: 0px;
}

</style>