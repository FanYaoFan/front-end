// 单例模式  

let productRender = function () {
    //获得页面上的list容器
    // const listBox = document.getElementById('list'),
    const listBox = document.querySelector('.productBox'),
        //获取header中的每个a,给其循环绑定事件
        headerBox = document.querySelector('.headerBox'),
        headerList = headerBox.querySelectorAll('a')
    // productList = document.querySelectorAll('li')
    productList = null  //页面本来没有的
    // headerBox = document.getElementById('header'),
    // headerList = headerBox.getElementsByTagName('a'),
    // productList = listBox.getElementsByTagName('li')

    let productData = []
    let getData = function () {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'http://127.0.0.1:3000/shopList', 'true')
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText)
                bindHTML()
                sortList()
            }
        }
        xhr.send(null)
    }
    // 将数据渲染在页面上
    let bindHTML = function () {
        console.log(productData)
        let str = ``
        productData.forEach((item, index) => {
            let {
                img,
                title,
                price,
                time,
                hot,
            } = item
            str += ` <li 
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
        })
        listBox.innerHTML = str
        //将得到的数据渲染在productLIst容器中
        productList = listBox.querySelectorAll('li')
    }
    // 排序方法
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
                // 2 按照最新顺序依次添加到容器中
                // ;[].forEach.call(productAry, curLi => {
                //     listBox.appendChild(curLi)
                // })
                productAry.forEach( item => {
                    listBox.appendChild(item)
                })  
            }
        })
    }
    // let sortList = function () {
    //     [].forEach.call(headerList, (linka, index) => {
    //         linka.onclick = function () {
    //             let productAry = [].slice.call(productList)
    //             productAry.sort((a, b) => {
    //                 switch (index) {
    //                     case 0:
    //                         console.log('按上架时间排序')
    //                         aI = a.getAttribute('data-time').replace(/-/g,'')
    //                         bI = b.getAttribute('data-time').replace(/-/g,'')
    //                         break;
    //                         case 1:
    //                         console.log('按价格排序')
    //                         aI = a.getAttribute('data-price')
    //                         bI = b.getAttribute('data-price')
    //                         break;
    //                         case 2:
    //                         console.log('按热度排序')
    //                         aI = a.getAttribute('data-hot')
    //                         bI = b.getAttribute('data-hot')
    //                         break;
    //                 }
    //                 return aI - bI 
    //             })
    //             productAry.forEach(item => {
    //                 listBox.appendChild(item)
    //             })
    //         }
    //     })
    // }

    return {
        init: function () {
            getData()

        }
    }
}()
productRender.init()