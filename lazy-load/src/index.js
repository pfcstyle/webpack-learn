// function getComponent() {
// 	//懒加载
//   return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _}) => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Dell', 'Lee'], '-')
//     return element
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element)
// })

document.addEventListener('click', () => {
  //懒加载 & （预请求  预加载）
  //webpackPreload: true 和页面主js同时异步加载
  //webpackPrefetch: true 会等到主js加载完成够预加载
  //预加载有浏览器兼容问题
  import(/* webpackPrefetch: true */'./click.js').then(({default: func}) => {
    func();
  })
})
