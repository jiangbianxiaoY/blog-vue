<template>
    <div class="articles">
        <div class="article-header">
            <h1 class="article-header-title">文章管理</h1>

            <div class="article-search-container">
                <!--一个搜索框 一个下拉选择框-->
                <div class="article-search">
                    <h2 class="article-search-title">标题搜索：</h2>
                    <input type="text" class="article-search-input" placeholder="请输入标题" v-model="searchTitle">
                    <button class="article-search-button" @click="searchBlog">搜索</button>
                </div>

                <!--一个按钮 点击后清空搜索框和下拉选择框-->
                <div class="article-search-button">
                    <button class="article-search-button-clear" @click="clearSearch">清空</button>
                </div>


                <!--一个下拉选择框 默认是 最近发布 可选的是最近修改 最近浏览 最近评论-->
                <div class="article-search-select">
                    <select class="article-search-select-option" v-model="selectOption" @change="fetchnowBlogList">
                        <option value="空白"></option>
                        <option value="最近发布">最近发布</option>
                        <option value="最近修改">最近修改</option>
                        <option value="最多浏览">最多浏览</option>
                        <option value="最多喜欢">最多喜欢</option>
                    </select>
                </div>
                

                
            </div>

            <!-- 添加加载状态和错误信息显示 -->
            <div v-if="isLoading" class="loading-status">
                正在加载文章...
            </div>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>


        </div>
        <div class="article-content">
            <!--一个卡片 显示博客文章 标题 作者 分类 发布时间 操作按钮包括修改 删除 查看-->
            <div class="article-card" v-for="article in blogList" :key="article._id">
                <div class="article-card-first-line">
                    <h2 class="article-card-title">{{ article.title }}</h2>
                    <p class="article-card-author">{{ article.authorName }}</p>
                </div>

                <div class="article-card-second-line">
                    <span class="article-card-createTime">创建时间：{{ new Date(article.createTime).toISOString().split('T')[0] }}  |</span>
                    <span class="article-card-category">{{ getCategoryName(article.categoryid) }}--></span>
                    <span class="article-card-childCategories">{{ getCategoryName(article.childCategories) }}</span>
                </div>

                <div class="article-card-third-line">
                    <p class="article-card-content" v-html="getArticleContent(article.content)"></p>
                </div>

                
                <div class="article-card-buttons">
                    <img src="../../public/changeblog.svg" alt="修改" class="article-card-button">
                    <img src="../../public/deleteblog.svg" alt="删除" class="article-card-button">
                    <img src="../../public/readblog.svg" alt="查看" class="article-card-button">
                </div>
            </div>
        </div>
    </div>
</template>






<script setup lang="ts">


import { ref } from 'vue';
//import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios';

import { useAllCategoryStore } from '../store/Category.js';

// 定义下拉选择框的选项
const selectOption = ref('最近发布');
// 添加加载状态
const isLoading = ref(false);
// 添加错误信息状态
const errorMessage = ref('');



//申明一个博客原始数组存储博客文章
const blogList = ref<Array<any>>([]);

//将全部分类存储其中
const allCategoryStore = useAllCategoryStore();

//根据博客文章的分类id 获取分类名称
const getCategoryName = (categoryid: string) => {
    const category = allCategoryStore.allCategories.find(category => category._id === categoryid);
    return category ? category.category : '未知分类';
}


//从博客的内容部分截取前三行字符并解析为html格式
const getArticleContent = (content: string) => {
    const lines = content.split('\n');
    const htmlContent = lines.slice(0, 3).map(line => `<p>${line}</p>`).join('');
    return htmlContent;
}



//申明一个函数访问对应博客的接口
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




//在申明对应接口的函数并存储在申明的数组当中
const fetchBlogList = async ()=>{
    isLoading.value = true;
    errorMessage.value = '';
    try{
        //使用axios模块访问 异步函数使用async关键字改为看起来像同步函数
        const response = await axios.get('http://localhost:3000/api/articles?limit=10');
        if(response.status === 200){
            blogList.value = response.data.data;
        }
    }catch(error){
        console.error('获取博客文章失败:',error);
        errorMessage.value = '获取博客文章失败，请稍后再试';
    } finally {
        isLoading.value = false;
    }
}

//查询最近修改的博客文章
const fetchChangeBlog = async()=>{
    isLoading.value = true;
    errorMessage.value = '';
    try{
        //向后端查询最近修改的博客文章10篇
        const response = await axios.get('http://localhost:3000/api/articles/updateTime?limit=10');
        if(response.status === 200){
            blogList.value = response.data.data;
        }
    }catch(error){
        console.error('获取最近修改的博客文章失败:',error);
        errorMessage.value = '获取最近修改的博客文章失败，请稍后再试';
    } finally {
        isLoading.value = false;
    }
}

//查询最多浏览的博客文章
const fetchMostViewBlog = async()=>{
    isLoading.value = true;
    errorMessage.value = '';
    try{
        //向后端查询最多浏览的博客文章10篇
        const response = await axios.get('http://localhost:3000/api/articles/views?limit=10');
        if(response.status === 200){
            blogList.value = response.data.data;
        }
    }catch(error){
        console.error('获取最多浏览的博客文章失败:',error);
        errorMessage.value = '获取最多浏览的博客文章失败，请稍后再试';
    } finally {
        isLoading.value = false;
    }
}

//查询最多喜欢的博客文章
const fetchMostLikeBlog = async()=>{
    isLoading.value = true;
    errorMessage.value = '';
    try{
        //向后端查询最多喜欢的博客文章10篇
        const response = await axios.get('http://localhost:3000/api/articles/comments?limit=10');
        if(response.status === 200){
            blogList.value = response.data.data;
        }
    }catch(error){
        console.error('获取最多喜欢的博客文章失败:',error);
        errorMessage.value = '获取最多喜欢的博客文章失败，请稍后再试';
    } finally {
        isLoading.value = false;
    }
}

//当用户选择最近修改 最近浏览 最近评论 时 调用对应的函数
const fetchnowBlogList = async()=>{
    //如果搜索框有值 则清空搜索框
    if(searchTitle.value){
        searchTitle.value = '';
    }
    if(selectOption.value === '最近修改'){
        fetchChangeBlog();
    }else if(selectOption.value === '最多浏览'){
        fetchMostViewBlog();
    }else if(selectOption.value === '最多喜欢'){
        fetchMostLikeBlog();
    }else{
        fetchBlogList();
    }
}


// 定义搜索关键字
const searchTitle = ref('');

//当管理员想要搜索博客的时候 调用这个函数
const searchBlog = async function () {
    isLoading.value = true;
    errorMessage.value = '';
    if(!searchTitle.value){
        errorMessage.value = '请输入查询关键字';
        isLoading.value = false;
        return;
    }

    // 在本地存储的博客列表中查询包含搜索关键字的博客
    const localMatchedBlogs = blogList.value.filter(article => article.title.includes(searchTitle.value));
    const count = localMatchedBlogs.length;
    
    // 创建一个临时数组，先存储本地匹配的博客
    const tempBlogList = [...localMatchedBlogs];
    
    // 计算还需要从后端获取的博客数量
    const limit = count === 0 ? 10 : 10 - count;
    
    // 如果本地已有10篇匹配的博客，则不调用接口
    if(count === 10){
        // 直接使用本地匹配的博客更新列表
        blogList.value = tempBlogList;
        isLoading.value = false;
        return;
    }
    
    // 如果本地匹配的博客少于10篇，调用接口获取更多博客
    try{
        const response = await axios.get(`http://localhost:3000/api/articles/search?title=${searchTitle.value}&limit=${limit}`);
        if(response.status === 200){
            // 将后端返回的博客添加到临时数组中，而不是直接覆盖
            tempBlogList.push(...response.data.data);
            // 更新博客列表
            blogList.value = tempBlogList;
            //如果本地查询和接口查询都为空 则显示没有找到包含该关键字的博客
            if(tempBlogList.length === 0){
                errorMessage.value = '没有找到包含该关键字的博客';
            }
        }
    }catch(error){
        console.error('搜索博客失败:',error);
        errorMessage.value = '搜索博客失败，请稍后再试';
        // 即使API调用失败，也显示本地匹配的博客
        blogList.value = tempBlogList;
    }finally{
        isLoading.value = false;
    }
}

const clearSearch = () => {
    searchTitle.value = '';
    selectOption.value = '空白';
    fetchnowBlogList();
}








//钩子函数进入这个页面就自动获取10篇最近发布博客文章
onMounted(() => {
    fetchBlogList();
});






</script>

<style scoped>

.article-header{
    padding-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;


    .article-header-title{
        font-size: 25px;
        font-weight: normal;
    }

    .article-search-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 10px;
    }

}





.article-content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding-top: 40px;
}







.article-search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* 水平布局 */
    flex-direction: row;
    width: 310px;
    gap:2px;


    .article-search-title{
        font-size: 17px;
        font-weight: normal;
    }

    

}

.article-search-select{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    margin: 5px;

    .article-search-select-option{
        font-size: 10px;
        font-weight: normal;
        height: 24px;
    }
}

/* 博客文章卡片样式 */
    .article-card{
    display: flex;
    width: 800px;
    border: 2px solid #222;
    border-radius: 10px;
    padding: 8px; /* 减少内边距 */
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    flex-direction: column;
    gap: 5px; /* 减少卡片内元素之间的间距 */

    .article-card-first-line{
        display: flex;
        justify-content: flex-start; /* 改为左对齐，避免元素间距过大 */
        align-items: center;
        flex-direction: row;
        gap: 20px; /* 将间距设置为20px */
        margin-left: 20px;
        margin-bottom: 5px; /* 改为正边距，增加与下一行的间距 */


        .article-card-title{
            font-size: 20px;
            font-weight: normal;
            margin: 0; /* 移除标题默认边距 */
        }

        .article-card-author{
            font-size: 15px;
            margin: 0; /* 移除作者默认边距 */
        }
    }

    .article-card-second-line{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        gap: 8px; /* 进一步减少元素之间的间距 */
        margin-left: 20px;
        margin-top: 0; /* 移除负边距，避免与上一行重叠 */


        .article-card-createTime{
            font-size: 16px;
            margin: 0; /* 移除默认边距 */
        }

        .article-card-category{
            font-size: 16px;
            margin: 0; /* 移除默认边距 */
        }

        .article-card-childCategories{
            font-size: 14px;
            margin: 0; /* 移除默认边距 */
        }
    }

    .article-card-third-line{
        /**设置为内容靠左 但是有20px的左边外边距 */
        text-align: left;
        margin-left: 20px;
    }

    .article-card-buttons{
        /**水平布局 在卡片靠右 并且有20px的右边外边距 */
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
        gap: 10px;
        margin-right: 20px;

        .article-card-button{
            width: 20px;
            height: 20px;
        }
    }
}




</style>