let list = document.getElementById('list'),
    headerBox = document.getElementById('header'),
    linkList = headerBox.getElementsByTagName('a')
    productList = list.getElementsByTagName('li')
console.log(headerBox)
// 获取数据函数
~function () {
    let xhr = new XMLHttpRequest
    let productData = []
    xhr.open('GET', 'http://127.0.0.1:3000/shopList', 'true') // 1请求的方式  2地址 3 是否异步
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            productData = xhr.responseText

            //这里得到的是JSON字符串,要把它转换为对象
            productData = JSON.parse(productData)
            // ES6模板字符串 

            let str = ``;
            for (let i = 0; i < productData.length; i++) {
                let { title,
                    img,
                    price,
                    hot,
                    time,
                } = productData[i]
                str += ` <li data-price="${price}"
                 data-time="${time}"
                 data-hot="${hot}">
                <a href="javascript:;"></a>
                <div class="Probody">
                    <div class="Pro-imgBox"><img src="${img}"></div>
                    <div class="Pro-text">
                        <p>${title}</p>
                        <span>¥${price}</span>
                    </div>
                </div>
            </li>`
            }

            list.innerHTML = str
        }
    }
    xhr.send(null)

}()
// 操作
~function () {
    let sortList = () => {
        // 按照价格升序排列
        // 是给productList排序而不是给productData 
        // 1 先将productList转换成数组  
        let productAry = [].slice.call(productList)
        //用这种借口slice方式操作元素集合或者节点集合,在IE中不兼容
        //   2 基于数组按价格(sort)排序 
        productAry.sort((a, b) => {
            // a 数组当前项
            // b 数组中的下一项
            let aP = a.getAttribute('data-price'),
            bP = b.getAttribute('data-price')
            return aP - bP 
        })
        for(let i = 0; i< productAry.length; i++){
            let curLi = productAry[li]
            list.appendChild(curLi)
        }
    }
    linkList[1].onclick = function (){
        sortList()
    }
    
}()
