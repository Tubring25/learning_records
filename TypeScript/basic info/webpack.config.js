const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/index.ts',

  // 指定打包文件位置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // 打包时不使用箭头函数
    // enviroument: {
    //   arrowFunction: false
    // }
  },

  // webpack打包时使用的模块
  module: {
    rules: [
      {
        // test制定规则生效的文件
        test: /\.ts$/,
        // 使用的loader
        use: [
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置与定义环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      // 指定浏览器版本
                      "chrome": "88"
                    },
                    // 指定corejs版本
                    "corejs": "3",
                    // 使用corejs方式  usage表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'],  // 执行顺序从后往前
      // 要排除的文件
        exclude: /node_modules/
      },
      // 设置less文件处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },

  // 配置webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  // 设置引用模块
  resolve: {
    extensions: ['.js', '.ts'], // 以ts 和 js 结尾的文件都可以作为模块使用
  }
}