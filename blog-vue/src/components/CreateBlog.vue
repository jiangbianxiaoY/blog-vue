<template>
  <div class="create-blog-container">

    <div class="create-blog-header">
      <h1 class="create-blog-header-title">创建博客</h1>
    </div>

    <!-- 创建博客表单 -->
    <div class="create-blog-content">
    <!-- 创建博客表单 -->
    <form class="create-blog-form" @submit.prevent="submitBlog">
      <div class="form-group">
        <label>标题：</label>
        <input v-model="title" type="text" class="form-input" placeholder="请输入标题" required />
      </div>
      <div class="form-group">
        <label>分类：</label>
        <select v-model="selectedCategory" class="form-select" required @change="onCategoryChange">
          <option value="" disabled>请选择分类</option>
          <option v-for="cat in parentCategories" :key="cat._id" :value="cat._id">
            {{ cat.category }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>子分类：</label>
        <select v-model="selectedSubCategory" class="form-select" :disabled="!filteredSubCategories.length">
          <option value="" disabled>请选择子分类</option>
          <option v-for="sub in filteredSubCategories" :key="sub._id" :value="sub._id">
            {{ sub.category }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>作者：</label>
        <input type="text" class="form-input" placeholder="请输入作者" v-model="author" />
      </div>
      <div class="form-group">
        <label>内容：</label>
        <div id="vditor" class="vditor-custom"></div>
      </div>

      <div class="form-actions">
        <button type="button" class="form-btn" @click="saveAsDraft">保存为草稿</button>
        <button type="submit" class="form-btn">保存</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useAllCategoryStore } from '../store/Category.js';
import axios from 'axios';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const title = ref('');
const selectedCategory = ref('');
const selectedSubCategory = ref('');
const content = ref('');
const author = ref('江边小余');
const isDraft = ref(false);

const allCategoryStore = useAllCategoryStore();
const allCategories = computed(() => allCategoryStore.allCategories);
const parentCategories = ref<any[]>([]);
const allChildCategories = ref<any[]>([]);
const filteredSubCategories = ref<any[]>([]);

watch(
  allCategories,
  (val) => {
    parentCategories.value = val.filter(cat => !cat.parentid || cat.parentid === '' || cat.parentid === null);
    allChildCategories.value = val.filter(cat => cat.parentid && cat.parentid !== '' && cat.parentid !== null);
    console.log('全部分类 allCategories:', val);
    console.log('父分类 parentCategories:', parentCategories.value);
    console.log('子分类 allChildCategories:', allChildCategories.value);
  },
  { immediate: true }
);

const onCategoryChange = () => {
  console.log('当前选中的父分类id:', selectedCategory.value);
  selectedSubCategory.value = '';
  filteredSubCategories.value = allChildCategories.value.filter(
    cat => String(cat.parentid) === String(selectedCategory.value)
  );
};

let vditor: Vditor | null = null;

onMounted(() => {
  vditor = new Vditor('vditor', {
    height: 400,
    placeholder: '内容',
    value: content.value,
    mode: 'sv',
    toolbar: [
      'emoji', 'headings', 'bold', 'italic', 'strike', 'link', 'list', 'ordered-list', 'check', 'outdent', 'indent',
      'quote', 'line', 'code', 'inline-code', 'insert-after', 'insert-before', 'upload', 'table', 'record', 'undo', 'redo',
      'fullscreen', 'edit-mode', 'both', 'preview', 'info', 'help', 'br', 'export', 'outline', 'devtools', 'sub', 'sup', 'toc', 'code-theme', 'content-theme', 'theme', 'search', 'find', 'copy', 'paste', 'select-all', 'hr', 'image', 'video', 'audio', 'wordcount', 'read-mode', 'md', 'html', 'pdf', 'print', 'download', 'upload', 'settings'
    ],
    toolbarConfig: {
      pin: true, // 工具栏固定
      hide: false
    },
    cache: { enable: false },
    input(value: string) {
      content.value = value;
    },
    upload: {
      accept: 'image/*',
      multiple: false,
      handler(files) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64 = e.target?.result;
          if (vditor) {
            vditor.insertValue(`![](${base64})`);
          }
          return null;
        };
        reader.readAsDataURL(file);
        return null;
      }
    }
  });
});

onBeforeUnmount(() => {
  if (vditor) {
    vditor.destroy();
    vditor = null;
  }
});

const submitBlog = async () => {
  if (vditor) {
    content.value = vditor.getValue();
  }
  if (!title.value || !selectedCategory.value || !content.value) {
    alert('请填写完整信息');
    return;
  }
  try {
    const payload = {
      title: title.value,
      content: content.value,
      authorName: author.value,
      categoryid: selectedCategory.value,
      childCategories: selectedSubCategory.value,
      isDraft: isDraft.value
    };
    const response = await axios.post('http://localhost:3000/api/articles', payload);
    if (response.data && response.data.success) {
      alert('博客创建成功！');
    } else {
      alert('博客创建失败');
    }
  } catch (e) {
    alert('博客创建失败');
  }
};

const saveAsDraft = async () => {
  if (vditor) {
    content.value = vditor.getValue();
  }
  if (!title.value || !selectedCategory.value || !content.value) {
    alert('请填写完整信息');
    return;
  }
  try {
    const payload = {
      title: title.value,
      content: content.value,
      authorName: author.value,
      categoryid: selectedCategory.value,
      childCategories: selectedSubCategory.value,
      isDraft: true
    };
    const response = await axios.post('http://localhost:3000/api/articles', payload);
    if (response.data && response.data.success) {
      alert('草稿保存成功！');
    } else {
      alert('草稿保存失败');
    }
  } catch (e) {
    alert('草稿保存失败');
  }
};
</script>

<style scoped>
.create-blog-container {
  background: #fff;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
}


.create-blog-header-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: blue;
  text-align: center;
}
.create-blog-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-input, .form-select, .form-textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: black;
}
.form-select:disabled {
  background: #f5f5f5;
  color: #aaa;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
.form-btn {
  padding: 8px 32px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.form-btn:hover {
  background: #217dbb;
}
.vditor-custom {
  border-radius: 4px;
  overflow: hidden;
}
</style>