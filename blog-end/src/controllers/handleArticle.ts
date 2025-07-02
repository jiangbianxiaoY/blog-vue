import { Request, Response } from 'express';
import { getAllArticles, createArticle } from '../models/mongo/article.js';




//文章模型进行操作
import {Article } from '../models/mongo/article.js';


// 获取所有文章
export async function getArticlesHandler(req: Request, res: Response) {
  try {
    const articles = await getAllArticles();
    // 处理 limit 和 newerThan 参数
    const limit = Number(req.query.limit) || articles.length;
    const newerThan = req.query.newerThan ? Number(req.query.newerThan) : undefined;
    const olderThan = req.query.olderThan ? Number(req.query.olderThan) : undefined;
    let filtered = articles;
    if (newerThan) {
      filtered = articles.filter(article => article.createTime > newerThan);
    } else if (olderThan) {
      filtered = articles.filter(article => article.createTime < olderThan);
    }
    res.status(200).json({
      success: true,
      data: filtered.slice(0, limit)
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch articles'
    });
  }
}

// 创建文章
export async function createArticleHandler(req: Request, res: Response) {
    try {
        const { title, content, authorName, categoryid, childCategories, isDraft } = req.body;
        //打印请求体内容
        console.log('Request body:', req.body);
        // 验证必填字段
        if (!title || !content || !authorName || !categoryid ) {
            return res.status(400).json({
                success: false,
                message: '标题、内容、作者和分类为必填项'
            });
        }

        // 创建文章对象
        const articleData: Omit<Article, '_id'> = {
            title,
            content,
            authorName,
            categoryid,
            childCategories: childCategories || '',
            isDraft: isDraft !== undefined ? isDraft : false,
            createTime: Date.now(),
            updateTime: Date.now(),
            views: 0,
            comments: 0
        };

        // 调用模型函数创建文章
        const newArticle = await createArticle(articleData);

        // 返回成功响应
        return  res.status(201).json({
                    success: true,
                    message: '文章创建成功',
                    data: newArticle
        });
    } catch (error) {
        console.error('Error creating article:', error);
        return res.status(500).json({
                        success: false,
                        message: '创建文章失败'
                    });
    }
}


export async function getHotArticlesHandler(_req: Request, res: Response){
    
    //查询热门文章
    try {
        const articles = await getAllArticles();
        // console.log(articles);
        //排序，按 views + comments 总和降序
        articles.sort((a: Article, b: Article) => {
            return (b.views + b.comments) - (a.views + a.comments);
        });
        //截取前5个
        const hotArticles = articles.slice(0, 5);
        //返回
        res.status(200).json({
            success: true,
            data: hotArticles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: '服务器错误'
        });
    }
}

// 获取最近更新的文章
export async function getRecentArticlesHandler(req: Request, res: Response) {
  try {
    const articles = await getAllArticles();
    const limit = Number(req.query.limit) || 10;
    // 按 updateTime 降序排列
    articles.sort((a: Article, b: Article) => b.updateTime - a.updateTime);
    res.status(200).json({
      success: true,
      data: articles.slice(0, limit)
    });
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent articles'
    });
  }
}

// 获取评论数最多的文章
export async function getMostCommentedArticlesHandler(req: Request, res: Response) {
  try {
    const articles = await getAllArticles();
    const limit = Number(req.query.limit) || 10;
    // 按 comments 降序排列
    articles.sort((a: Article, b: Article) => b.comments - a.comments);
    res.status(200).json({
      success: true,
      data: articles.slice(0, limit)
    });
  } catch (error) {
    console.error('Error fetching most commented articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch most commented articles'
    });
  }
}

// 获取浏览量最多的文章
export async function getMostViewedArticlesHandler(req: Request, res: Response) {
  try {
    const articles = await getAllArticles();
    const limit = Number(req.query.limit) || 10;
    // 按 views 降序排列
    articles.sort((a: Article, b: Article) => b.views - a.views);
    res.status(200).json({
      success: true,
      data: articles.slice(0, limit)
    });
  } catch (error) {
    console.error('Error fetching most viewed articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch most viewed articles'
    });
  }
}

// 搜索标题包含关键字的文章
export async function searchArticlesByTitleHandler(req: Request, res: Response) {
  try {
    const { title, limit } = req.query;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({
        success: false,
        message: '缺少 title 查询参数'
      });
    }
    const articles = await getAllArticles();
    // 模糊匹配 title，忽略大小写
    const matched = articles.filter(article =>
      article.title && article.title.toLowerCase().includes(title.toLowerCase())
    );
    const max = Number(limit) || matched.length;
    return res.status(200).json({ // 显式返回 res.json()
      success: true,
      data: matched.slice(0, max)
    });
  } catch (error) {
    console.error('Error searching articles by title:', error);
    return res.status(500).json({ // 显式返回 res.json()
      success: false,
      message: 'Failed to search articles by title'
    });
  }
}
