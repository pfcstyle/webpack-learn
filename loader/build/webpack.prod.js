const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [//loader执行顺序是从下到上（postcss,sass,css,style)
				MiniCssExtractPlugin.loader, 
				{
					loader: 'css-loader',//分析css文件间的import关系，合并到一个css
					options: {
						//当css中使用@import时，默认会直接从css-loader开始执行，如果需要也使用sass-loader和postcss-loader,
						//需要使用这个变量，让其多加载2个loaders。
						importLoaders: 2,
						//css module. css默认是全局的，需要开启模块化打包。注意：代码中使用class时，应该使用css文件中的class(style.cssname)
						modules: true
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
}

module.exports = prodConfig;