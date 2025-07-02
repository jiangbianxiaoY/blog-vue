import config from "../../config.js";
import { MongoClient, ObjectId } from "mongodb";


export interface Article {
  _id?: ObjectId;
  title: string;
  authorName: string; // 作者名称
  content: string;      //文章内容部分
  createTime: number; // 创建时间，使用时间戳格式
  updateTime: number; // 更新时间，使用时间戳格式
  categoryid: string; // 分类ID
  childCategories: string; // 子分类ID
  views: number; // 浏览量
  comments: number; // 评论数
  isDraft: boolean; // 是否为草稿
}


//连接到mongodb数据库
async function connectToDatabase() {
  const client = new MongoClient(config.mongodb.uri);
  await client.connect();
  const db = client.db('blog');
  const collection = db.collection<Article>('articles');
  return { client, collection };
}


// 创建文章
export async function createArticle(articleData: Omit<Article, '_id'>): Promise<Article> {
    const { client, collection } = await connectToDatabase();
    try {
        // 确保时间戳存在，如果没有提供则使用当前时间
        const now = Date.now();
        const article: Omit<Article, '_id'> = {
            ...articleData,
            createTime: articleData.createTime || now,
            updateTime: articleData.updateTime || now,
            views: articleData.views || 0,
            comments: articleData.comments || 0,
            isDraft: articleData.isDraft !== undefined ? articleData.isDraft : false
        };
        
        // 插入文章到数据库
        const result = await collection.insertOne(article as any);
        
        // 返回创建的文章，包括生成的_id
        return {
            ...article,
            _id: result.insertedId
        };
    } finally {
        await client.close();
    }
}


export async function getAllArticles(): Promise<Article[]> {
  const { client, collection } = await connectToDatabase();
  try {
    return await collection.find().toArray();
  } finally {
    await client.close();
  }
}

// 根据 id 删除文章
export async function deleteArticle(id: string) {
  const { client, collection } = await connectToDatabase();
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } finally {
    await client.close();
  }
}

// 伪删除：将文章 isDraft 设为 true
export async function setArticleDraftTrue(id: string) {
  const { client, collection } = await connectToDatabase();
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isDraft: true } }
    );
    return result;
  } finally {
    await client.close();
  }
}

// 导出 connectToDatabase 以便外部调用
export { connectToDatabase };