import { Router } from 'express';
import { Request, Response } from 'express';



// 实例化一个路由器
const router = Router();


// 导入对应的回调函数
import {
    getArticlesHandler,
    createArticleHandler,
    getHotArticlesHandler,
    getRecentArticlesHandler,
    getMostCommentedArticlesHandler,
    getMostViewedArticlesHandler,
    searchArticlesByTitleHandler,
    deleteArticleHandler,
    getDraftArticlesHandler,
    toggleArticleDraftHandler,
    getArticleByIdHandler,
    updateArticleHandler
} from '../controllers/handleArticle.js';
//挂载接口，注意顺序，:id 路由放最后
router.get("/hot", getHotArticlesHandler as (req: Request, res: Response) => void);
router.get("/updateTime", getRecentArticlesHandler as (req: Request, res: Response) => void);
router.get("/comments", getMostCommentedArticlesHandler as (req: Request, res: Response) => void);
router.get("/views", getMostViewedArticlesHandler as (req: Request, res: Response) => void);
router.get("/search", searchArticlesByTitleHandler as (req: Request, res: Response) => void);
router.get("/draft", getDraftArticlesHandler as (req: Request, res: Response) => void);
router.put("/draft/:id", toggleArticleDraftHandler as (req: Request, res: Response) => void);
router.get("/", getArticlesHandler as (req: Request, res: Response) => void);
router.post("/", createArticleHandler as (req: Request, res: Response) => void);
router.delete( "/:id", deleteArticleHandler as (req: Request, res: Response) => void);
router.get( "/:id", getArticleByIdHandler as (req: Request, res: Response) => void);
router.put("/:id", updateArticleHandler as (req: Request, res: Response) => void);



export default router;