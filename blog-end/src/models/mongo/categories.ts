

import config from "../../config.js";
import { MongoClient, ObjectId } from "mongodb";

// 定义分类的接口
export interface Category {
  _id?: ObjectId;
  category: string;
  parentid: string | null; // 父分类ID，如果是顶级分类则为null
  createTime: number; // 创建时间，使用时间戳格式
}

// 连接到MongoDB
async function connectToDatabase() {
  const client = new MongoClient(config.mongodb.uri);
  await client.connect();
  const db = client.db('blog');
  const collection = db.collection<Category>('categories');
  return { client, collection };
}

// 创建分类
export async function createCategory(category: string, parentid: string | null = null): Promise<Category> {
  const { client, collection } = await connectToDatabase();
  try {
    const newCategory: Category = {
      category,
      parentid,
      createTime: Date.now() // 当前时间的时间戳
    };
    
    const result = await collection.insertOne(newCategory);
    return {
      ...newCategory,
      _id: result.insertedId
    };
  } finally {
    await client.close();
  }
}

// 获取所有分类
export async function getAllCategories(): Promise<Category[]> {
  const { client, collection } = await connectToDatabase();
  try {
    return await collection.find().toArray();
  } finally {
    await client.close();
  }
}

// 根据ID获取分类
export async function getCategoryById(id: string): Promise<Category | null> {
  const { client, collection } = await connectToDatabase();
  try {
    return await collection.findOne({ _id: new ObjectId(id) });
  } finally {
    await client.close();
  }
}

// 获取子分类
export async function getChildCategories(parentId: string | null): Promise<Category[]> {
  const { client, collection } = await connectToDatabase();
  try {
    return await collection.find({ parentid: parentId }).toArray();
  } finally {
    await client.close();
  }
}

// 更新分类
export async function updateCategory(id: string, data: Partial<Category>): Promise<boolean> {
  const { client, collection } = await connectToDatabase();
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result.modifiedCount > 0;
  } finally {
    await client.close();
  }
}

// 删除分类
export async function deleteCategory(id: string): Promise<boolean> {
  const { client, collection } = await connectToDatabase();
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } finally {
    await client.close();
  }
}