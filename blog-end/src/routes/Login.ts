


import { Request, Response } from 'express';
import { Router } from 'express';


const router = Router();

import { loginHandler } from '../controllers/handleLogin.js'; // 导入登录处理函数

//挂载路由接口

//需要生成token返回到客户端 本地浏览器缓存 token 有效期为1天

router.post('/', loginHandler as (req: Request, res: Response) => void);




export default router;