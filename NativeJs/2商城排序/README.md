##  ponit
# 1 JS 
整体采用单例模式 
整体:
```JavaScript
let productRender = function (){
   getData()
   return {
    init : function {
     getData()
    }
   }
}()
productRender.init()
 ```  
 # 2 获得数据 
 使用ajax从模拟的后台获得数据, 也可以用Promise来管控ajax 
 ```JavaScript
 let getData = function () {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'http://127.0.0.1:3000/shopList', 'true')
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText)
                bindHTML()  //绑定数据的方法
                sortList()  // 各种排序方法
            }
        }
        xhr.send(null)
    }
 ```
 
 # 3 绑定数据 
 ES6模板字符串绑定数据
 通过for循环/forEach()等将获得的数据循环渲染在页面上  
 ## 3.1 数组的解构赋值  
 通过forEach让productData里的数据解构出来,使用哪个就解构哪个  
 ```JavaScript
 productData.forEach( (item, index) => {
   let {         img,
                title,
                price,
                time,
                hot,} = item
 })
 //要拼接的字符串
 str = ` <li 
            data-time = "${time}" 
            data-price = "${price}"
            data-hot = "${hot}"
            >
            <a href="javascript:;"></a>
            <div class="Probody">
                <div class="Pro-imgBox"><img src="${img}"></div>
                <div class="Pro-text">
                    <p>${title}</p>
                    <span style="color : red;">¥${price}</span>
                    <span>${time}</span>
                    <span>${hot}</span>
                </div>
            </div>
        </li>`  
        listBox = str  
        // 如果使用的是queryselectAll()方法,要重新获取并绑定,因为,querySelectAll没有DOM回流机制  
        productList = listBox.querySelectorAll('li')
 ```
 # 4 排序  
 根据navbar上的导航来采取不同的排序方式  
 ## 4.1 每个navbar导航循环绑定点击事件  
 首先要获取navbar导航DOM元素 
 ```JavaScript
  headerList = headerBox.querySelectorAll('a')
 ```
 headerList是一个类数组,(NodeLIst :{ a ,a ,a})   
 所以如果要调用数组方法,必须借用 
 ```JavaScript
  //[].forEach.call(类数组, 方法)// [].forEach中的this本指向数组[],通过call的方式改变this指向,
 ;[].forEach.call(headerList, (aLink,index) => {
    aLink.onclick = function (){ 
     // 可以用自定义属性的形式获取到要排序的数据(索引)
     // 可以循环每一个商城数据(productList),用slice将其转变成数组 ,
      let productAry = [].slice.call(productList)
     // 根据数组自带的sort( a,b => {return a-b})的方法来实现排序 
      productAry.sort((a, b) => { return a -b})
    }
 })

 ```
 ## 4.2 排序方法 
 有两种, 一种是声明一个数组ary来接收自定义属性  
 ### 4.2.1 第一种 
 ```JavaScript
 let ary = ['data-time', 'data-price', 'data-hot'];
 
 let sortList = function () {
        [].forEach.call(headerList, (linka, index) => {
            //循环三次,执行三次这个方法,每一次执行都会形成一个闭包,
            // 每一个闭包都保存了当前a对应的索引index
            //   linka.flag = -1
            linka.onclick = function () {
                // this.flag *= -1
                // 根据点击li的索引获取按照谁来排序
                let ary = ['data-time', 'data-price', 'data-hot'];

                let productAry = [].slice.call(productList)
               
                productAry.sort((a, b) => {
                    let aIn = a.getAttribute(ary[index])

                    let bIn = b.getAttribute(ary[index])
                    if (index === 0) {
                        aIn = aIn.replace(/-/g, '')
                        bIn = aIn.replace(/-/g, '')
                    }
                    return aIn - bIn
                    // return (aIn - bIn)*this.flag
                })
                
 ```
 ### 4.2.2 switch 的形式来区分 

 ```JavaScript
 let sortList = function () {
        [].forEach.call(headerList, (linka, index) => {
            linka.onclick = function () {
                let productAry = [].slice.call(productList)
                productAry.sort((a, b) => {
                    switch (index) {
                        case 0:
                            console.log('按上架时间排序')
                            aI = a.getAttribute('data-time').replace(/-/g,'')
                            bI = b.getAttribute('data-time').replace(/-/g,'')
                            break;
                            case 1:
                            console.log('按价格排序')
                            aI = a.getAttribute('data-price')
                            bI = b.getAttribute('data-price')
                            break;
                            case 2:
                            console.log('按热度排序')
                            aI = a.getAttribute('data-hot')
                            bI = b.getAttribute('data-hot')
                            break;
                    }
                    return aI - bI 
                })
                productAry.forEach(item => {
                    listBox.appendChild(item)
                })
            }
        })
    }
 ```
 细节: 日期不能加减,可以用 replace( /-/g, '')的方法来替换 `- `符号
 ## 4.3 排序之后重新渲染数据
 ```JavaScript
  productAry.forEach( item => {
                    listBox.appendChild(item)
                })  
 ```
 
