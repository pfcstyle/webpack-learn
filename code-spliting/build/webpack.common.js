const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	optimization: {
		splitChunks: {//code spliting  使用的.在v8里可能有问题，使用的windows
      chunks: 'all',//async or initial  分别针对异步导入和同步导入, 默认是async
			minSize: 30000,//引入模块超过30k,就会代码分割
			// maxSize:50000, //会尝试分割大文件，但很可能分割不了，一般用不着这个
      minChunks: 1,//当引用库文件小于1次时，不会做代码分割
      maxAsyncRequests: 5,//同时加载的模块儿库不超过5，打包库时，只会打包前5个，后面就不会单独打包了。
      maxInitialRequests: 3,//入口文件引入的库最多分为3个库
      automaticNameDelimiter: '~',//文件名连接符，如vendor~main.js，如果配置了vendors中的filename,会忽略
      name: true,//让cacheGroups中的内容生效
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,//只对node_modules里的单独分割
          priority: -10,//
          // filename: 'vendors.js',//对vendors命名
        },
        default: {//当不符合vendors配置时，默认保存配置
          priority: -20,
          reuseExistingChunk: true,//复用模块，不会重复打包
          filename: 'common.js'
        }
      }
    }
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}