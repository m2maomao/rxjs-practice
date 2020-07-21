# 配置Webpack
> 新建目录
```
$: mkdir rxjs
$: cd rxjs
```
> 初始化
```
npm init -y
```
结束后生成package.json
```
{
  "name": "rxjs",
  "version": "1.0.0",
  "main": "src/index.js",
  "license": "MIT"
}
```
>组织目录
```
- build:打包相关配置，如存放webpack配置
- src: 项目目录
  - api: 接口可复用方法
  - assets: 静态文件
  - config: 配置文件
  - tools: 业务无关的工具函数
  - utils: 业务相关的可复用方法
- typings: TS模块声明文件
```
> 安装依赖
```
sudo npm install typescript tslint -g
```
> 测试是否安装成功
```
tsc -v
```
> 项目目录初始化TS
```
tsc --init
```
> 运行完后可见目录中生成了```tsconfig.json```文件。
> 安装相应依赖
```
npm install webpack webpack-cli webpack-dev-server ts-loader cross-env clean-webpack-plugin html-webpack-plugin typescript -D
```
- webpack
- wepback-cli
- webpack-dev-server 服务器
- ts-loader ts加载器
- cross-env 环境变量配置
- clean-webpack-plugin webpack清理插件
- html-webpack-plugin html模版插件
- typescript
> 在```build```文件夹中创建webpack配置文件```webpack.config.js```
```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入自动生成html插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 引入自动清除dist插件

module.exports = {
  entry: "./src/index.ts", // webpack编译入口
  output: {
    filename: 'main.js' // 输出的文件名称
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'] // 文件后缀(import/require默认加载)
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: { // webpack开发调试服务器配置
    contentBase: './dist',
    stats: 'errors-only',
    compress: false,
    host: 'localhost',
    port: '9999',
  },
  plugins: [ // 设置插件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```
> 配置```package.json```：添加开发启动和编译命令
```json
{
  "script": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --config ./build/webpack.config.js --open",
    "build": "cross-env NODE_ENV=production webpack --config ./build/webpack.config.js"
  }
}
```
> 这里使用```cross-env```来配置```NODE_ENV```,在```webpack.config.js```告知devtool当前环境是生产环境还是开发环境
```
devtool: process.envNODE_ENV === 'production' ? false : 'inline-source-map'
```
> 至此，已经可以使用webpack打包ts
```
npm run start
```