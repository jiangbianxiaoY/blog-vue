


import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<any[]>([])
    function setCategories(data: any[]) {
      categories.value = data
    }
    return { categories, setCategories }
  }
);

export const useAllCategoryStore = defineStore('allCategory', () => {
    const allCategories = ref<any[]>([])
    function setAllCategories(data: any[]) {
      allCategories.value = data
    }
    return { allCategories, setAllCategories }
  }
);
