import { Request, Response } from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    getChildCategories,
    updateCategory,
    deleteCategory
} from '../models/mongo/categories.js';

// 获取所有分类
export const getAllCategoriesHandler = async (_req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        const topCategories = categories.filter(c => !c.parentid);
        res.json({
            success: true,
            message: 'Top categories retrieved successfully',
            data: topCategories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving categories',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// 创建新分类
export const createCategoryHandler = async (req: Request, res: Response) => {
    try {
        const { category, parentid } = req.body;
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        const newCategory = await createCategory(category, parentid || null);
        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: newCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return; // 显式返回
    }
};

// 获取特定分类
export const getCategoryByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        return res.json({
            success: true,
            message: 'Category retrieved successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving category',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return; // 显式返回
    }
};

// 获取子分类
export const getChildCategoriesHandler = async (req: Request, res: Response) => {
    try {
        const { parentId } = req.params;
        const categories = await getChildCategories(parentId === 'null' ? null : parentId);
        res.json({
            success: true,
            message: 'Child categories retrieved successfully',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving child categories',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return; // 显式返回
    }
};

// 更新分类
export const updateCategoryHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { category, parentid } = req.body;
        
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        const success = await updateCategory(id, { category, parentid });
        
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        return res.json({  // 添加return关键字
            success: true,
            message: 'Category updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return; // 显式返回
    }
};

// 删除分类
export const deleteCategoryHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await deleteCategory(id);
        
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        return res.json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return; // 显式返回
    }
};












