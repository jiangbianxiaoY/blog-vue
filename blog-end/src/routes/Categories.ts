

import { Router } from 'express';
import { Request, Response } from 'express';

// 这个路由不需要中间件鉴权认证

// 实例化一个路由器
const router = Router();

//导入对应的回调函数
import { handleCategories } from '../controllers/handleCategories.js';



// 路由上挂载接口
router.get("/categories", handleCategories);

export default router;