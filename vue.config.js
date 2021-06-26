const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: false
      },
      sass: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'node_modules'), './node_modules']
        }
      }
    }
  },
  chainWebpack: conf => {
    const svgRule = conf.module.rule('svg')
    conf.resolve.alias.delete('@')
    conf.resolve.alias.set('v~', path.resolve(__dirname, 'src'))

    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
