


import { Request, Response } from 'express';


export const handleCategories = (req: Request, res: Response) => {
    // 模拟分类数据
    const categories = [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Health' },
        { id: 3, name: 'Lifestyle' }
    ];

    // 返回分类数据
    res.json({
        success: true,
        message: 'Categories retrieved successfully',
        data: categories
    });
}















