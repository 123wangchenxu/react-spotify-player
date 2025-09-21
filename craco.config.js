const path = require('path')
const lessPlugin = require("craco-less");

module.exports = {
  // 插件
  plugins: [
    {
      plugin: lessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // antdv 主题之类的配置
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  // 如果没安装，可以删除
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  },
  devServer: {
    port:'3001',
    runTimeErrors: false,
    proxy: {
      '/kg-api': {
        target: 'http://m.kugou.com',
        changeOrigin: true,
        pathRewrite: { '^/kg-api': '' },
      },
    },
  },
};