import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();
const PORT =  3000;





// 中间件
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

//解析 body-parser中间件 可以解析这个req传递过来的列表数据和json数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// 路由部分
import categoriesRouter from './routes/Categories.js';


app.use('/api', categoriesRouter);











// 错误处理中间件
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
  next();
});



















// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

