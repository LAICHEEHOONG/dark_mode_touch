


var new_element_N = document.createElement("style");
new_element_N.innerHTML = '#drager {' +
  '     position: fixed;' +
  '     width: 40px;' +
  '     height: 40px;' +
 

  '     cursor: pointer;' +
  '     top: 0px;' +
  '     left: 0px;' +
  '     border-radius: 30%;' +
  '     padding: 6px;' +
  ' }' +
  ' ' +
  ' #drager>div {' +
  '     border-radius: 50%;' +
  '     width: 100%;' +
  '     height: 100%;' +
 
  '      transition: all 0.2s;' +
  '   -webkit-transition: all 0.2s;' +
  '   -moz-transition: all 0.2s;' +
  '   -o-transition: all 0.2s;' +
  ' }' ;
document.body.appendChild(new_element_N);
new_element_N = document.createElement('div');
new_element_N.setAttribute("id", "drager");
new_element_N.style.top = "300px";
new_element_N.style.right = "0px";
new_element_N.innerHTML = ' <div id="ball"></div>';
document.body.appendChild(new_element_N);
// 
// 
var posX;
var posY;
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var fdiv = document.getElementById("drager");
fdiv.onmousedown = function(e) {
  screenWidth = document.documentElement.clientWidth;
  screenHeight = document.documentElement.clientHeight;
  if (!e) {
    e = window.event;
  } //IE
  posX = e.clientX - parseInt(fdiv.style.left);
  posY = e.clientY - parseInt(fdiv.style.top);
  document.onmousemove = mousemove;
}
document.onmouseup = function() //释放时自动贴到最近位置
  {
    document.onmousemove = null;
    if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (screenHeight / 2)) { //在上半部分
      if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2) <= (screenWidth / 2)) { //在左半部分
        if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2)) { //靠近上方
          fdiv.style.top = "0px";
        } else { //靠近左边
          fdiv.style.left = "0px";
        }
      } else { //在右半部分
        if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (screenWidth - (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2))) { //靠近上方
          fdiv.style.top = "0px";
        } else { //靠近右边
          fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
        }
      }
    } else { //下半部分
      if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2) <= (screenWidth / 2)) { //在左半部分
        if ((screenHeight - (parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2)) <= (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2)) { //靠近下方
          fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
        } else { //靠近左边
          fdiv.style.left = "0px";
        }
      } else { //在右半部分
        if ((screenHeight - (parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2)) <= (screenWidth - (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2))) { //靠近上方
          fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
        } else { //靠近右边
          fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
        }
      }
    }
  }

function mousemove(ev) {
  if (ev == null) {
    ev = window.event;
  } //IE
  if ((ev.clientY - posY) <= 0) { //超过顶部
    fdiv.style.top = "0px";
  } else if ((ev.clientY - posY) > (screenHeight - parseInt(fdiv.clientHeight))) { //超过底部
    fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
  } else {
    fdiv.style.top = (ev.clientY - posY) + "px";
  }

  if ((ev.clientX - posX) <= 0) { //超过左边
    fdiv.style.left = "0px";
  } else if ((ev.clientX - posX) > (screenWidth - parseInt(fdiv.clientWidth))) { //超过右边
    fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
  } else {
    fdiv.style.left = (ev.clientX - posX) + "px";
  }
  // console.log( posX +"  "+ fdiv.style.left);

}
window.onload = window.onresize = function() { //窗口大小改变事件
  screenWidth = document.documentElement.clientWidth;
  screenHeight = document.documentElement.clientHeight;
  if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight)) > screenHeight) { //窗口改变适应超出的部分
    fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
  }
  if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth)) > screenWidth) { //窗口改变适应超出的部分
    fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
  }
  document.onmouseup.apply()
};
fdiv.addEventListener('touchstart', fdiv.onmousedown, false);
fdiv.addEventListener('touchmove', function(event) {
  // 如果这个元素的位置内只有一个手指的话
  if (event.targetTouches.length == 1) {　　　　
    event.preventDefault(); // 阻止浏览器默认事件，重要  
    var touch = event.targetTouches[0];
    if ((touch.pageY) <= 0) { //超过顶部
      fdiv.style.top = "0px";
    } else if (touch.pageY > (screenHeight - parseInt(fdiv.clientHeight))) { //超过底部
      fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
    } else {
      fdiv.style.top = (touch.pageY - parseInt(fdiv.clientHeight) / 2) + "px";
    }

    if (touch.pageX <= 0) { //超过左边
      fdiv.style.left = "0px";
    } else if (touch.pageX > (screenWidth - parseInt(fdiv.clientWidth))) { //超过右边
      fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
    } else {
      fdiv.style.left = (touch.pageX - parseInt(fdiv.clientWidth) / 2) + "px";
    }
  }
}, false);
fdiv.addEventListener('touchend', document.onmouseup, false);


document.querySelector('body').insertAdjacentHTML('beforeend', `
<div id="screenShader" style="
transition: opacity 0.1s ease 0s;             
z-index: 99999;            
margin: 0;             
border-radius: 0;             
padding: 0;             
background: #939393 !important;             
pointer-events: none;             
position: fixed;             
top: -10%;             
right: -10%;             
width: 120%;             
height: 120%;             
mix-blend-mode: multiply;             
display: block;        
"></div>
`)

let opacityNum = 0;
const darkScreen = document.querySelector('#screenShader');
const ball = document.querySelector('#ball');

const btnOpacity = () => {
   
    if(opacityNum < 1) {
        opacityNum = opacityNum + 0.2;
    } else {
        opacityNum = 0;
    }

    ball.innerHTML = `${Math.floor(opacityNum*10)/2}`
    // console.log(Math.floor(opacityNum*10))
    darkScreen.style.opacity = `${opacityNum}`;
    // console.log(opacityNum)
}
const clickSound = new Audio(chrome.runtime.getURL("./sound.mp3"))

fdiv.onclick = function() {
  btnOpacity()
  clickSound.play()
}


ball.innerHTML = '0'

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  // console.log(message.on)
  if(!message.on) {
    darkScreen.style.opacity = 0;
    
    const btnTouch = document.getElementById('drager')
    btnTouch.style.display = 'none'

    chrome.runtime.sendMessage({icon1: true})


  } else {
    const btnTouch = document.getElementById('drager')
    btnTouch.style.display = 'block'
    ball.innerHTML = '0'
  }


}

/****************************** chrome runtime *************************************/
