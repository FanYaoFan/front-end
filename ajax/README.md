# ajax 
# 目录 
# [1 了解](#1-了解)  
# [2 ajax](#2-ajax)  
# [3 HTTP状态码](#3-http状态码)  
# [4 xhr](#4-ajax关于xhr的属性和方法)  
# [5 同步异步](#5-同步异步-1)
***
___
___

##  1 了解  
### 1.1 浏览器解析 
 * 客户端 : 所有可以向服务器发生请求的
 * 服务端 : 所有可以接收客户端请求的,并且给其响应一些内容的
 * DNS   : 域名解析服务器  
 
    <img src="https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/ajax1.png"  width="1400" >
  
  
##### 1~4 为HTTP请求阶段  
 1. 浏览器根据 请求的url首先向DNS域名解析器发送请求 
 2. DNS反解析: 根据浏览器请求的域名,向DNS服务器找到对应的服务器ip地址
 3. 通过地址找到web站点管理工具 
 4. ip找到项目,通过url携带的端口号找到服务器对应的服务和资源
##### 5~6 HTTP响应阶段  
 * 找到项目中的内容,服务器根据请求中的地址中的路径名称,问号传参,或哈希值把客户端需要的内容进行准备和处理  
 * 反馈给浏览器,  服务器返回的是资源文件中的源代码*不是文件本身*) 
##### 7 渲染解析 
客户端浏览器接受到服务器返回的源代码,,基于自己内部的渲染引擎开始对页面进行绘制和渲染   
1. 首先计算DOM结构,生成DOM tree  
2. 自上而下运行代码,加载CSS等资源内容  
3. 根据css样式生成带样式的render tree  
4. 开始渲染和绘制
一次完整的 请求 + 响应 称之为 "http事物"  
一个页面完全加载完成,需要向服务器发起很多次http事物.   
如果我们做了资源加载处理(304),而且即将加载的资源在之前已经加载过了.这样的操作和传统的HTTP事物有所不一样.他们是从服务器和浏览器的缓存中获取数据,比传统速度快  
### 1.2 url  
URI(**统一资源标识符**) = URL(**统一资源占位符**) + URN(**统一资源名称**)  
**http & https** 
http:超文本传输协议  
https: 基于SSL(secure  sockets layer 安全套接层)加密的HTTP协议,比HTTP更加的安全   [设计支付的网站都是基于https完成的]  
ftp:文件传世协议:一般用来实现文件在服务器上的上传和下载  
**请求路径**  
####### DHTML
动态页面,泛指当前页面的内容不是写死的而是动态绑定的.例如 .jsp/.php/.aspx …这些页面的数据都是基于ajax或者是后台编程语言处理.由服务器渲染,最后把渲染的页面返回给客户端实现的.
####### 问号传参&哈希值  
?xxx=xxx&…#xxx  
在HTTP事务中,问号传参是客户端把信息传递给服务器的一种方式(也有可能是跳转到某一个页面,把参数值传递给页面用来标识的)  
哈希值一般都跟客户端服务器没有关系,主要用于页面的锚点定位和HASH路由切换. 
### 1.3 http报文
在客户端向服务器发送请求,以及服务器把内容响应给客户端的时候.中间相互传递了很多内容(客户端把一些内容传递给服务器, 服务器把一些内容响应给客户端) 我们把传递的内容统称为”http报文”.  
###### Headers Response
起始行:请求起始行.响应起始行 
首部:请求头 ,响应头,通用头
主体:请求主体  .响应主体  
 <img src="https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/https1.png" height = "400" >  
 <img src="https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/http2.png" height = "400" >   
#### 1.3.1 客户端与服务端交互方式  
**客户端传递给服务器**
1. 问号传参  
请求的url地址末尾通过问号传参的方式把一些信息传递给服务器  
2. 设置请求头  
  客户端把需要传递该服务端的内容设置到请求头的信息中(自定义),服务器可以通过接受请求头信息把内容得到 
3. 设置请求主体  
xhr.send ajax中传递的内容就是客户端设置的请求主体内容,服务器可以接收到这些信息  
**服务器返回给客户端**  
1. 设置响应头信息  
把服务时间通过响应头返回给客户端,客户端通过获取响应头信息得到这个时间(响应头返回的速度是优先于响应主体) 
2. 设置响应主体 
主要的返回信息都在响应主体中  
## 2. ajax 
### 2.1 背景  
*ajax* :  async JavaScript and xml  异步的js和xml是泛指局部刷新  
在以前,服务器为了清晰的表达数据结构,都是返回XML格式的内容.(类似字符串拼接) 
全局刷新 
<img src="https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/global.png"  width = "1200" >  
不使用ajax,首先向服务器发送一个请求,服务器获取请求后,都要给用户一个提示(原页展示的内容可能发生变化)服务器把带提示的内容重新进行拼接,然后返回给客户端,客户端重新渲染最新的内容(只能页面整体刷新)  
ajax的诞生就是为了实现局部刷新  
<img src="https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/ajaxmu.png"  width = "1200" >  
### 2.1 操作
1. 创建ajax实例,ActiveXObject来实现的  
`let xhr = new XMLHttpRequest()`
2. 请求行  
`xhr.open('get', 'xxx.php, true/false)` true => 异步 false 同步
3. 事件监听  
一般监听的都是ready-state-change事件(ajax状态改变事件)基于这个事件可以获取服务器返回的响应头响应主体内容  
`xhr.onreadystatechange = () => {  } `  
eg        
    xhr.onreadystatechange = () => { 
    	if(xhr.readystate === 4  && xhr.status === 200 ){
    	xhr.responseText}}
4. 发送ajax请求  
`xhr.send()`  
### 2.2 请求方式
所有的请求都可以向服务器端传递内容,也都可以从服务器获取内容  
**GET**  
**POST**  
get是基于url地址"问号传参", 
xhr.open('GET', '/user/id?=xxx&ame=xxx')  
post是基于'请求主体'方式把信息传递给服务器 
xhr.send('xxx=xxx&xxx=xxx')请求主体中,xhr.send( JSON.stringify({id:1000,lx:333}))传递给服务器的是json格式的字符串,但你真实项目中常用url-encode格式的字符串  
区别  
get一般从服务器获取数据,eg轮播图,页面图片等.而post的是给服务器,注册登录.  
如果post是基于问号传参的方式会出现一些问题:url会拼接很长,浏览器对于url的最大的长度有最大限制(谷歌8kb,火狐7kb,ie2kb) ,超过的部分浏览器会截掉.  = > 所以get请求可以基于url传参,而post是基于请求主体传递(.真实项目中我们会设置大小限制,防止上传过大信息导致请求迟迟完不成)  
get不安全,post相对安全;get会产生不可控制的缓存.post不会 
### 2.3 ajax状态  
* 0 unsent 刚开始创建xhr,还没有发送
* 1 opened 已经执行了open这个操作  
* 2 headers received 已经发送了ajax请求(ajax任务开始),响应头信息已经被客户端接收(响应头中包含了: 服务器的时间,和返回的http状态码) 
* 3 loading 响应的主体内容正在返回  
* 4 done 响应主体内容已经被客户端接收

## 3 HTTP状态码 
1. 200 ok
2. 301  Moved Permanently 永久转移(永久重定向) => 域名更改  
3. 302  Move temporarily 临时转移(临时重定向 => 307)   
一般用作服务器负载均衡,当一台服务器达到最大的并发数的时候,会把后续访问的用户历史转移到其他的服务器组上处理  
4. 304 Not Modified 设置缓存   
对于不经常更新的资源文件,eg(css/js/html/img),服务器会结合客户端设置304缓存,第一次加载过这些资源就会缓存到客户端了.下载再获取的时候,是从缓存中获取的;如果资源更新了,服务器会通过最后修改的时间强制让客户端从服务器重新拉取;  
5. 400 Bad Request 请求参数错误
6. 401 Unauthorized 无权限访问  
7. 404 Not Found 找不到资源(地址不存在)
8. 413 Request Entity Too Large 和服务器交互的内容资源超过服务器最大限制  
9. 500 Interal Server Error 未知的服务器错误
10. 503 Service Unavailable 服务器超负荷 
## 4 ajax关于xhr的属性和方法  
* xhr.statusText 状态码的描述
* xhr.timeout 设置请求超时的时间  
* xhr.withCredentials  是否允许跨域(false)
* xhr.about() 强制中断ajax请求
* xhr.getAllResponseHeaders() 获取所有响应头信息  
* xhr.getResponseHeader('key') 获取key对应的响应头信息 eg xhr.getResponseHeader('data')就是在获取响应中的服务器时间  
* xhr.open() 打开url请求 
* xhr.overrideMinetype() 重写MIME类型
* xhr.send() 发送ajax 请求 
* xhr.setRequestHeader()设置请求头 
## 5 同步异步
js是单线程的,浏览器是多线程的,在浏览器中每打开一个页面都相当于开辟出一个进程.一个进程包含多个线程;js同一个时间只能干一件事  
<img src="https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/ajaxi.png"  width = "1200" > 
**案例**
如图   
<img src=https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/async.png  height="400"> 
<img src=https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/absend.png height="400"> 
<img src=https://github.com/FanYaoFan/front-end/blob/master/ajax/ajax/afsend.png height="400"> 

[回到顶部](#ajax)
 
