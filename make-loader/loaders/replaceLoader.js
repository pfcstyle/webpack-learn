const loaderUtils = require('loader-utils');//官方提供  需要安装

module.exports = function(source) {
	return source.replace('lee', 'world');
}