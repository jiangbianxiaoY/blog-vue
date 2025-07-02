<template>
    <div class="admin-left-side">
        <div class="sidebar-header">
            <div class="logo">
                <i class="fas fa-feather-alt"></i>
                <span>博客管理</span>
            </div>
        </div>
        
        <div class="sidebar-menu">
            
            <router-link to="/admin/articles" class="menu-item">
                <i class="fas fa-file-alt"></i>
                <span>文章管理</span>
            </router-link>
            
            <div class="menu-item-category-toggle" @click="dropdownOpen = !dropdownOpen">
                <i class="fas fa-folder"></i>
                <span>分类管理</span>
                <i class="fas fa-chevron-down" :class="{ 'rotate': dropdownOpen }"></i>
            </div>
            
            <div class="category-manager" v-if="dropdownOpen">
                <div class="category-content">
                    <!-- 添加分类按钮 -->
                    <div class="submenu-item" @click="showAddCategoryModal(null)">
                        <i class="fas fa-plus-circle"></i>
                        <span>添加分类</span>
                    </div>
                    
                    <!-- 分类列表 -->
                    <div v-for="category in categories" :key="category.id" class="category-item">
                        <div class="submenu-item" @click="toggleSubmenu(category.id)">
                            <i class="fas fa-folder"></i>
                            <span>{{ category.name }}</span>
                            <div class="item-actions">
                                <i class="fas fa-chevron-down action-icon" v-if="category.children?.length" :class="{ 'rotate': openSubmenus.includes(category.id) }"></i>
                                <div class="action-buttons" @click.stop>
                                    <i class="fas fa-plus" title="添加子分类" @click="showAddCategoryModal(category.id)"></i>
                                    <i class="fas fa-edit" title="编辑分类" @click="showEditCategoryModal(category)"></i>
                                    <i class="fas fa-trash-alt" title="删除分类" @click="deleteCategory(category.id)"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 子分类列表 -->
                        <div v-if="category.children && openSubmenus.includes(category.id)" class="subcategory-container">
                            <!-- 添加子分类按钮 -->
                            <div class="submenu-item subcategory-item" @click.stop="showAddCategoryModal(category.id)">
                                <i class="fas fa-plus-circle"></i>
                                <span>添加子分类</span>
                            </div>
                            
                            <!-- 子分类列表 -->
                            <div v-for="child in category.children" :key="child.id" class="submenu-item subcategory-item">
                                <i class="fas fa-folder-open"></i>
                                <span>{{ child.name }}</span>
                                <div class="item-actions">
                                    <div class="action-buttons" @click.stop>
                                        <i class="fas fa-edit" title="编辑子分类" @click="showEditCategoryModal(child)"></i>
                                        <i class="fas fa-trash-alt" title="删除子分类" @click="deleteCategory(child.id)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>



                <!-- 添加/编辑分类模态框 -->
                <div v-if="showModal" class="modal">
                  <div class="modal-content">
                    <h3>{{ modalTitle }}</h3>
                    <input v-model="newCategoryName" placeholder="输入分类名称">
                    <div class="modal-actions">
                      <button @click="saveCategory">保存</button>
                      <button @click="closeModal">取消</button>
                    </div>
                  </div>
                </div>
            </div>

            <router-link to="/admin/drafts" class="menu-item">
                <i class="fas fa-draft"></i>
                <span>草稿箱</span>
            </router-link>
            
            <div class="menu-divider"></div>
            
            <router-link to="/" class="menu-item">
                <i class="fas fa-home"></i>
                <span>返回首页</span>
            </router-link>
            
            <div class="menu-item">
                <i class="fas fa-sign-out-alt"></i>
                <span>退出登录</span>
            </div>
        </div>
    <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAllCategoryStore } from '../store/Category.js';

//将全部分类存储其中
const allCategoryStore = useAllCategoryStore();


const categories = ref<Array<any>>([]);
const openSubmenus = ref<number[]>([]);
const dropdownOpen = ref(false);
const showModal = ref(false);
const newCategoryName = ref('');
const currentParentId = ref<number|null>(null);
const editingCategory = ref<any>(null);
const modalTitle = ref('添加分类');

const buildCategoryTree = (flatList: any[]) => {
  const map: Record<string, any> = {};
  flatList.forEach(item => {
    map[item._id] = {
      id: item._id,
      name: item.category,
      parentid: item.parentid,
      children: []
    };
  });
  const tree: any[] = [];
  Object.values(map).forEach(item => {
    if (!item.parentid) {
      tree.push(item);
    } else if (map[item.parentid]) {
      map[item.parentid].children.push(item);
    }
  });
  return tree;
};

const fetchAllCategories = async () => {
  const response = await axios.get('http://localhost:3000/api/categories/all');
  categories.value = buildCategoryTree(response.data.data);
  allCategoryStore.setAllCategories(response.data.data);
  console.log(categories.value);
};

onMounted(() => {
    fetchAllCategories();
})

const toggleSubmenu = (categoryId: number) => {
  const index = openSubmenus.value.indexOf(categoryId);
  if (index === -1) {
    openSubmenus.value.push(categoryId);
  } else {
    openSubmenus.value.splice(index, 1);
  }
};

const showAddCategoryModal = (parentId: number|null) => {
  currentParentId.value = parentId;
  editingCategory.value = null;
  newCategoryName.value = '';
  modalTitle.value = parentId ? '添加子分类' : '添加分类';
  showModal.value = true;
};

const showEditCategoryModal = (category: any) => {
  editingCategory.value = category;
  newCategoryName.value = category.name;
  modalTitle.value = '编辑分类';
  showModal.value = true;
};

const saveCategory = async () => {
  if (!newCategoryName.value.trim()) return;
  if (editingCategory.value) {
    // 编辑分类
    try {
      const response = await axios.put(`http://localhost:3000/api/categories/${editingCategory.value.id || editingCategory.value._id}`, {
        category: newCategoryName.value
      });
      if (response.data && response.data.success) {
        alert('编辑分类成功');
        fetchAllCategories();
        closeModal();
      } else {
        alert('编辑失败');
      }
    } catch (e) {
      alert('编辑失败');
    }
    return;
  }
  // 添加新分类（父分类或子分类）
  const newCategory = {
    category: newCategoryName.value,
    parentid: currentParentId.value || null
  };
  try {
    const response = await axios.post('http://localhost:3000/api/categories', newCategory);
    if (response.data && response.data.success) {
      alert('添加分类成功');
      fetchAllCategories();
      closeModal();
    } else {
      alert('添加失败');
    }
  } catch (e) {
    alert('添加失败');
  }
};

const deleteCategory = async (id: string) => {
  if (confirm('确定要删除这个分类吗？')) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/categories/${id}`);
      if (response.data && response.data.success) {
        alert('删除成功');
        fetchAllCategories();
      } else {
        alert('删除失败');
      }
    } catch (e) {
      alert('删除失败');
    }
  }
};

const findCategory = (categoryList: any[], id: number): any => {
  for (const category of categoryList) {
    if (category.id === id) return category;
    if (category.children) {
      const found = findCategory(category.children, id);
      if (found) return found;
    }
  }
  return null;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
:root, .admin-left-side, .admin-left-side * {
    font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.admin-left-side {
    width: 220px;
    height: 100%;
    background: linear-gradient(135deg, #2c3e50, #1a252f);
    color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.sidebar-header {
    padding: 20px 0;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 18px;
    font-weight: 600;
}

.logo i {
    font-size: 22px;
    color: #3498db;
    padding-right: 20px;
}

.sidebar-menu {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    cursor: pointer;
}

.menu-item i {
    width: 24px;
    margin-right: 12px;
    font-size: 16px;
    text-align: center;
}

.menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
}

.menu-item.router-link-active {
    background-color: rgba(52, 152, 219, 0.2);
    color: #3498db;
    border-left: 3px solid #3498db;
}

.menu-divider {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 10px 0;
}




/* 分类管理美化 */
.menu-item-category-toggle{
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    cursor: pointer;
}

.menu-item-category-toggle i{
    width: 24px;
    margin-right: 12px;
    font-size: 16px;
    text-align: center;
}




.dropdown {
  position: relative;
  display: block;
}
.dropdown-toggle {
  width: 100%;
  padding: 8px 16px;
  background-color: #22303a;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dropdown-toggle:focus {
  outline: none;
}
.dropdown-menu {
  position: static;
  min-width: 200px;
  background: #1a252f;
  border: 1px solid #22303a;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
  padding: 5px 0;
  margin-top: 8px;
}
.dropdown-item, .category-main, .subcategory-item {
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 3px;
  transition: background 0.2s;
}
.dropdown-item:hover, .category-main:hover, .subcategory-item:hover {
  background-color: #22303a;
}
.category-item {
  position: relative;
}
.category-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
.category-actions button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 2px;
  font-size: 15px;
}
.subcategory-menu {
  padding-left: 20px;
  border-left: 2px solid #2c3e50;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
  min-width: 300px;
}
.modal-content h3 {
  color: #222;
}
.modal-content input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.modal-actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.modal-actions button {
  padding: 6px 16px;
  border: none;
  border-radius: 3px;
  background: #3498db;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
}
.modal-actions button:last-child {
  background: #aaa;
}
.add-subcategory-btn.menu-item {
  color: #8ec6ff;
  font-size: 15px;
  font-weight: 500;
  gap: 8px;
  margin-bottom: 2px;
}
.add-subcategory-btn.menu-item:hover {
  color: #fff;
  background: rgba(52, 152, 219, 0.2);
}
.subcategory-item.menu-item {
  margin-left: 16px;
  background: none;
  border-left: 3px solid transparent;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}
.subcategory-item.menu-item:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}
.category-main.menu-item {
  background: none;
  border-radius: 4px;
  border-left: 3px solid transparent;
  transition: background 0.2s, color 0.2s;
}
.category-main.menu-item:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}
.category-actions button {
  color: #8ec6ff;
  font-size: 15px;
  padding: 2px 4px;
  border-radius: 3px;
  transition: background 0.2s, color 0.2s;
}
.category-actions button:hover {
  color: #fff;
  background: #3498db;
}
@media (max-width: 768px) {
    .admin-left-side {
        width: 60px;
    }
    .logo span, .menu-item span {
        display: none;
    }
    .menu-item i {
        margin-right: 0;
        font-size: 18px;
    }
    .sidebar-header {
        padding: 20px 0;
        display: flex;
        justify-content: center;
    }
}

.submenu-item{
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    cursor: pointer;
    margin-left: 5px;
}

.submenu-item i{
    width: 24px;
    margin-left: 6px;
    font-size: 16px;
    text-align: center;
}




</style>