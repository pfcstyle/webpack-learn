//webpack配置了optimization之后会自动对同步加载的文件分割
//webpack对异步加载的库会自动进行代码分割到单独文件，不需要配置spliteChunk,但是spliteChunk配置会影响它
function getComponent() {
	//使用魔法注释，配合@babel/plugin-syntax-dynamic-import 和spliteChunkPlugin(webpack's)  自定义命名
  return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _}) => {//动态import需要@babel/plugin-syntax-dynamic-import
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '-')
    return element
  })
}

getComponent().then(element => {
  document.body.appendChild(element)
})
// import test from './test.js';
// console.log(test.name);

// import _ from 'lodash';
// import jquery from 'jquery';

// var element = document.createElement('div');
// element.innerHTML = _.join(['Dell', 'Lee'], '-');
// document.body.appendChild(element);

// function getComponent() {
// 	return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['Dell', 'Lee'], '-');
// 		return element;
// 	})
// }

// getComponent().then(element => {
// 	document.body.appendChild(element);
// });
