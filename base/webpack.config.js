const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	//source map，如果加上cheap，就只会映射到行，不会映射到列; cheap只会映射自己的module代码
	//如果加上eval ,通过eval的方式生成soucemap，最快，但是错误提示可能不全
	//最佳实践：  dev:cheap-module-eval-source-map  prod: cheap-module-source-map
	devtool: 'cheap-module-eval-source-map',
	// devtool: 'inline-source-map',//source map, 打包到js中，也可以加cheap
	entry: {
		main: './src/index.js',
		sub: './src/index.js'
	},
	output: {//默认生成main.js  [name]对应entry中的key
		publicPath: 'https://cdn.cn',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
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
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({//打包结束后自动生成一个html文件，并把打包生成的js自动引入到html中
			template: 'src/index.html'//设置生成html文件用的模板
		}), 
		new CleanWebpackPlugin(['dist'])//生成前清除dist目录
	]
	
}