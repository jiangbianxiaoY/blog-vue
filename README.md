# Blog Project

## 项目结构
- **blog-end**: 后端服务，基于Node.js和MongoDB。
  - `controllers`: 包含文章、分类和登录的处理逻辑。
  - `models`: 定义MongoDB的数据模型（文章、分类、用户）。
  - `routes`: 提供API路由（文章、分类、登录）。
  - `app.ts`: 主应用文件，启动服务器。
  - `config.json` 和 `config.ts`: 配置文件。

- **blog-vue**: 前端应用，基于Vue.js。
  - `components`: 可复用的Vue组件（导航栏、侧边栏、文章展示等）。
  - `layouts`: 页面布局组件（主页、博客详情页、管理页面等）。
  - `views`: 实际页面视图（主页、博客详情、分类详情、登录、管理面板等）。
  - `router/index.ts`: Vue Router配置。
  - `store/Category.ts`: Vuex状态管理模块。
  - `main.ts`: 应用入口文件。
  - `vite.config.ts`: Vite构建配置。
  - 使用了Markdown编辑器，并支持Markdown格式的博客内容。

## 特点
- 全栈实现：使用Node.js后端与Vue.js前端结合。
- 数据持久化：通过MongoDB存储文章、分类和用户数据。
- 组件化开发：前端采用模块化设计，提高代码复用性。
- 路由管理：Vue Router实现单页应用的多页面切换。
- 状态管理：Vuex用于管理全局状态（如分类信息）。
- 开发工具支持：TypeScript、Vite、TSLint等提供更好的开发体验。



## 项目是参照了B站Up主的开源博客项目
  - https://gitee.com/secondtonone1/bstgo-blog.git

  - 我仿造了这个项目，将一些功能进行修改
  - 取消了点赞和评论功能
  - 没有使用Redis进行文章分类的评论的缓存功能
  - 部分功能 例如通过导航栏的分类进行跳转到重定向的第一个分类第一个子分类的文章页面 跳转了但是还没有加载对应的文章博客

  - 项目配置对应原博客 dockerfile配置可以参考源项目
