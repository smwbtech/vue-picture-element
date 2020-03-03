const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  configureWebpack: {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          sourceMap: false,
          terserOptions: {
            ie8: false,
            safari10: false,
            ecma: 2015
          }
        })
      ]
    }
  }
}
