



import config from "../../config.js";
import { MongoClient } from "mongodb";


//定义登录接口
export interface User {
    username: string;
    password: string;
    role: string;
    createTime: number; // 使用时间戳格式存储创建时间
};

//连接到数据库
export async function connectToDatabase(){
    const client = new MongoClient(config.mongodb.uri);
    await client.connect();
    const db = client.db('blog');
    const collection = db.collection<User>('users');
    return { client, collection };
}


// 查找用户
export async function findUser(username: string) {
    const { client, collection } = await connectToDatabase();
    try {
        return await collection.findOne({ username });
    } catch (error) {
        console.error('查找用户时出错:', error);
        return null;        
    } finally {
        await client.close();
    }
}






//如果数据库没有用户，就创建一个默认用户
async function createDefaultUser(username: string, password: string ) {
    //先查询数据库中是否有用户
    const { client, collection } = await connectToDatabase();
    try {
        const userCount = await collection.countDocuments();
        if (userCount === 0) {
            // 如果没有用户，创建一个管理员用户
            const newUser: User = {
                username,
                password,
                role: 'admin', // 设置为管理员角色
                createTime: Date.now()
            };
            await collection.insertOne(newUser);
            console.log(`默认管理员用户 ${username} 已创建`);
        }
    } catch (error) {
        console.error('创建默认用户时出错:', error);
    } finally {
        await client.close();
    }
}

// 初始化默认管理员用户
createDefaultUser('381106114@qq.com', 'yu3114654955').catch(console.error);