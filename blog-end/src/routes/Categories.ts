import { Router } from 'express';
import { Request, Response } from 'express';

// 这个路由不需要中间件鉴权认证

// 实例化一个路由器
const router = Router();


// 导入对应的回调函数
import {
    getAllCategoriesHandler,
    createCategoryHandler,
    getCategoryByIdHandler,
    getChildCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
    getAllCategoriesWithChildHandler
} from '../controllers/handleCategories.js';

// 路由上挂载接口
router.get("/", getAllCategoriesHandler as (req: Request, res: Response) => void);
router.post("/", createCategoryHandler as (req: Request, res: Response) => void);
router.get("/children/:parentId", getChildCategoriesHandler as (req: Request, res: Response) => void);
router.get(":id", getCategoryByIdHandler as (req: Request, res: Response) => void);
router.put(":id", updateCategoryHandler as (req: Request, res: Response) => void);
router.delete(":id", deleteCategoryHandler as (req: Request, res: Response) => void);
router.get("/all", getAllCategoriesWithChildHandler as (req: Request, res: Response) => void);




export default router;