



<template>
  <div class="category-container">
    <h3>分类导航</h3>
    <div class="tree-view">
      <!-- 一级分类 -->
      <div v-for="category in categoryTree" :key="category._id" class="category-item">
        <div class="category-parent" @click="toggleCategory(category._id)">
          <span class="icon">{{ expandedCategories.includes(category._id) ? '▼' : '►' }}</span>
          <span>{{ category.category }}</span>
        </div>
        
        <!-- 二级分类 -->
        <div v-if="expandedCategories.includes(category._id)" class="subcategory-list">
          <div v-for="subCategory in category.children" :key="subCategory._id" class="subcategory-item">
            <div class="subcategory-parent" @click="loadAndToggleArticles(subCategory._id)">
              <span class="icon">{{ expandedSubCategories.includes(subCategory._id) ? '▼' : '►' }}</span>
              <span>{{ subCategory.category }}</span>
            </div>
            
            <!-- 文章列表 -->
            <div v-if="expandedSubCategories.includes(subCategory._id)" class="article-list">
              <div v-if="subCategory.articles && subCategory.articles.length > 0">
                <div v-for="article in subCategory.articles" :key="article._id" class="article-item">
                  <span>{{ article.title }}</span>
                </div>
              </div>
              <div v-else-if="loadingArticles.includes(subCategory._id)" class="loading-articles">
                加载中...
              </div>
              <div v-else class="no-articles">
                暂无文章
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAllCategoryStore } from '../store/Category.js';

// 定义分类接口
interface Category {
  _id: string;
  category: string;
  parentid: string;
  creatTime: string;
}

// 定义文章的接口
interface Article {
  _id: string;
  title: string;
  categoryid: string;
  childCategories: string;
}

// 定义二级分类接口（包含文章）
interface SubCategory extends Category {
  articles?: Article[];
}

// 定义一级分类接口（包含二级分类）
interface ParentCategory extends Category {
  children: SubCategory[];
}

// 定义变量
const allCategoryList = ref<Category[]>([]);
const expandedCategories = ref<string[]>([]); // 存储展开的一级分类ID
const expandedSubCategories = ref<string[]>([]); // 存储展开的二级分类ID
const loadingArticles = ref<string[]>([]); // 存储正在加载文章的二级分类ID
const articleCache = ref<Map<string, Article[]>>(new Map()); // 缓存已加载的文章

// 接收全局变量
const categoryStore = useAllCategoryStore();
allCategoryList.value = categoryStore.allCategories;

// 计算属性：构建二级分类树，并为二级分类准备文章数组
const categoryTree = computed<ParentCategory[]>(() => {
  // 一级分类（parentid为空）
  const parentCategories = allCategoryList.value
    .filter(item => item.parentid === '')
    .map(item => ({
      ...item,
      children: [] as SubCategory[]
    }));
  
  // 二级分类（parentid对应一级分类的_id）
  const childCategories = allCategoryList.value
    .filter(item => item.parentid !== '' && 
      parentCategories.some(parent => parent._id === item.parentid))
    .map(item => ({
      ...item,
      articles: articleCache.value.get(item._id) || []
    }));
  
  // 将二级分类添加到对应的一级分类中
  parentCategories.forEach(parent => {
    parent.children = childCategories
      .filter(child => child.parentid === parent._id);
  });
  
  return parentCategories;
});

// 切换一级分类的展开/折叠状态
const toggleCategory = (categoryId: string) => {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index === -1) {
    expandedCategories.value.push(categoryId);
  } else {
    expandedCategories.value.splice(index, 1);
  }
};

// 加载并切换二级分类的文章列表
const loadAndToggleArticles = async (subCategoryId: string) => {
  const index = expandedSubCategories.value.indexOf(subCategoryId);
  
  // 如果已经展开，则折叠
  if (index !== -1) {
    expandedSubCategories.value.splice(index, 1);
    return;
  }
  
  // 如果未展开，则展开并加载文章（如果尚未加载）
  expandedSubCategories.value.push(subCategoryId);
  
  // 如果已经有缓存的文章数据，则不需要重新加载
  if (articleCache.value.has(subCategoryId)) {
    return;
  }
  
  // 加载文章数据
  try {
    loadingArticles.value.push(subCategoryId);
    const articles = await loadArticles(subCategoryId);
    articleCache.value.set(subCategoryId, articles);
    
    // 更新二级分类的文章数组
    const subCategory = categoryTree.value
      .flatMap(parent => parent.children)
      .find(child => child._id === subCategoryId);
    
    if (subCategory) {
      subCategory.articles = articles;
    }
  } catch (error) {
    console.error(`加载分类 ${subCategoryId} 的文章失败:`, error);
  } finally {
    // 移除加载状态
    const loadingIndex = loadingArticles.value.indexOf(subCategoryId);
    if (loadingIndex !== -1) {
      loadingArticles.value.splice(loadingIndex, 1);
    }
  }
};

// 加载文章数据
const loadArticles = async (categoryId: string): Promise<Article[]> => {
  try {
    const response = await axios.get(`/api/article/list?childCategories=${categoryId}`);
    return response.data || [];
  } catch (error) {
    console.error('加载文章失败:', error);
    return [];
  }
};

// 组件挂载时初始化
onMounted(() => {
  console.log('分类树形结构已加载:', categoryTree.value);
});
</script>

<style scoped>
.category-container {
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.tree-view {
  margin-top: 10px;
}

.category-item {
  margin-bottom: 5px;
}

.category-parent {
  cursor: pointer;
  padding: 5px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.subcategory-list {
  margin-left: 20px;
}

.subcategory-item {
  margin-top: 3px;
}

.subcategory-parent {
  cursor: pointer;
  padding: 3px;
  display: flex;
  align-items: center;
}

.article-list {
  margin-left: 20px;
}

.article-item {
  padding: 3px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}

.article-item:hover {
  color: #1890ff;
}

.loading-articles {
  margin-left: 20px;
  padding: 5px;
  color: #999;
  font-style: italic;
}

.no-articles {
  margin-left: 20px;
  padding: 5px;
  color: #999;
  font-style: italic;
}

.icon {
  display: inline-block;
  width: 16px;
  text-align: center;
  margin-right: 5px;
}
</style>