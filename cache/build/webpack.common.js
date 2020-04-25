const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
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
	// performance: fasle, 阻止优化警告
	optimization: {
		//webpack在分库时，会自动生成一些代码间的关系逻辑代码，叫做manifest。老版本中，会把这部分（每次都会变）
		//分别打包到主文件和库文件中，因此，会导致每次打包的hash都不同。需要配置这个选项，把manifest单独放一个文件里。
		// runtimeChunk: {
		// 	name: 'runtime'
		// },
		usedExports: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				style: {//通过配置cacheGroups，根据entry对css进行分割
					name: 'main',
					test: (m, c, entry = 'main') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
				}
			}
    }
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../dist')
	}
}