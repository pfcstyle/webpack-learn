const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: {
    lodash: {
      commonjs: lodash,
      root: '_'//html <script>标签
    }
  },//不打包进去
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'root',
    libraryTarget: 'umd'
  }
}