const path = require('path')
const webpack = require('webpack')
// const IS_PROD = (process.env.NODE_ENV === 'production')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,

  configureWebpack: config => {
    // 定义resolve，参考webpack文档 https://webpack.js.org/configuration/resolve/
    config.resolve.alias = {
      '~': resolve('node_modules'),
      '@': resolve('src'),
      assets: resolve('src/assets'),
      model: resolve('src/model/'),
      js: resolve('src/assets/js/'),
      components: resolve('src/components/')
    }

    // 定义全局变量, 参考webpack文档 https://webpack.js.org/plugins/provide-plugin
    config.plugins.push(
      new webpack.ProvidePlugin({
        Utils: [resolve('src/utils/utils'), 'default'],
        Manba: 'manba',
        HeyUI: 'heyui',
        Model: 'js-model',
        G: 'hey-global',
        log: 'hey-log',
        R: [resolve('src/utils/request'), 'default']
      })
    )
  },

  pluginOptions: {
    // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('src/assets/css/var.less')] // less所在文件路径
    }
  },
  devServer: {
    historyApiFallback: true
  }
}
