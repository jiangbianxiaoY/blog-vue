import * as fs from 'fs';
import * as path from 'path';

// 读取配置文件
const configFile = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
const config = JSON.parse(configFile);

// 根据运行的脚本选择配置
const env = process.env.npm_lifecycle_event === 'dev' ? 'development' : 'production';
console.log(`Current environment: ${env}`);

// 导出当前环境的配置
export interface RedisConfig {
    host: string;
    port: number;
}

export interface MongoDBConfig {
    uri: string;
}

export interface Config {
    redis: RedisConfig;
    mongodb: MongoDBConfig;
}

const currentConfig: Config = config[env];



export default currentConfig;