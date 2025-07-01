import { Request, Response } from 'express';
import { findUser } from '../models/mongo/user.js';
import jwt from 'jsonwebtoken';
import { jsonwebtoken_key, jsonwebtoken_date } from '../.env.js';

export const loginHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        });
    }
    const user = await findUser(username);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: '用户不存在'
        });
    }else if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: '密码错误'
        });
    }
    
    // 生成JWT token
    const payload = {
        id: user._id,
        username: user.username
    };
    
    const token = jwt.sign(payload, jsonwebtoken_key, { 
        expiresIn: jsonwebtoken_date.expiresIn as unknown as number 
    });
    
    return res.json({
        success: true,
        message: '登录成功',
        token :token
    });

};