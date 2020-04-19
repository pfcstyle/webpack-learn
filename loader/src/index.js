import avatar from './avatar.jpg';
import style from './index.scss';
import iconfont from './icon-font.scss';
import createAvatar from './createAvatar';

createAvatar();

var img = new Image();
img.src = avatar;
//这里需要引用style中的avatar, 对应loader中的modules：true option
img.classList.add(style.avatar);

var root = document.getElementById('root');
root.append(img);

var root = document.getElementById('root');
var fontDiv = new div();
fontDiv.classList.add(iconfont.iconfont)
fontDiv.classList.add(iconfont.icon-changjingguanli)
root.append(fontDiv)
