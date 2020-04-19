const webpack = require('webpack');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [//loader执行顺序是从下到上（postcss,sass,css,style)
				'style-loader', //将css挂载到html的head标签上
				{
					loader: 'css-loader',
					options: {
						//当css中使用@import时，默认会直接从css-loader开始执行，如果需要也使用sass-loader和postcss-loader,
						//需要使用这个变量，让其多加载2个loaders。
						importLoaders: 2,
						//css module. css默认是全局的，需要开启模块化打包。注意：代码中使用class时，应该使用css文件中的class(style.cssname)
						modules: true
					}
				},
				'sass-loader',//打包sass
				'postcss-loader'//通过js工具和插件转换css代码，如添加厂商前缀
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
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
	}
}

module.exports = devConfig;