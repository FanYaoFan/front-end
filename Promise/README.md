# Promise  
## 1 JS中同步异步
浏览器是多线程的,js是单线程的.一个进程包含多个线程,加载页面的时候,浏览器会分配一个线程去计算DOM树,分配其他线程去加载对应资源文件,在分配一个线程自上而下执行JS
### 1.1.1 同步  
在一个线程(主栈)主任务队列同一时间只能做一件事情,当这件事完成之后再去做下一件事情.
### 1.1.2 异步
**macro task 宏任务** 
setlmmediate,setTimeout,setinterval  
定时器,事件绑定,ajax,回调函数,node中fs进行异步的I/O操作
**micro task 微任务** 
process.nextTick,Promise(async/await)  
执行顺序  
sync > micro(微) > macro(宏)
### 1.1.3 深入了解异步  
JS解析中,会把主任务队列的事情完成,把异步的放在等待队列.等主任务队列完成空闲后,再把等待任务队列的事情拿到主任务队列来执行.(注意的是,当主任务队列还在执行,而等待任务队列事件时间已经到,当主任务队列一完成,会先执行这个时间到的异步再执行这个主任务之后的等待任务)如图: 
<img src="https://github.com/FanYaoFan/front-end/blob/master/Promise/img/jsasync2.png"></img>
<img src="https://github.com/FanYaoFan/front-end/blob/master/Promise/img/Jsasync1.png"></img>
## Promise 
Promise并不是完全的异步操作,new Promise 是一个同步操作,而rsolve() 和 reject()是异步的.  
<img src="https://github.com/FanYaoFan/front-end/blob/master/Promise/img/async.png"></img>
`new Promise( (resolve,reject) => { console.log(2) resolve()} ).then().catch()`  
Promise(async/await) 当在excutor中执行resolve和reject的时候是异步操作.会先执行then/catch,当主栈完成后,才会再去调用resolve/reject,把存放的方法执行 
__问题__:async/await 是否把异步操作同步化? 图例说明 
<img src="https://github.com/FanYaoFan/front-end/blob/master/Promise/img/async3.png"></img>
### 经典案例   
<img src="https://github.com/FanYaoFan/front-end/blob/master/Promise/img/eg1.png" heighr="400"></img>
<img src="https://github.com/FanYaoFan/front-end/blob/master/Promise/img/eg2.png"></img>
