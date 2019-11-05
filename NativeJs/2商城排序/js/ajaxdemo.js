// # 假设json里的数据就是我们后台服务的数据
let xhr = new XMLHttpRequest
let productData = []
xhr.open('GET', 'http://127.0.0.1:3000/shopList', 'true') // 1请求的方式  2地址 3 是否异步
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText

        //这里得到的是JSON字符串,要把它转换为对象
        productData = JSON.parse(productData)
        console.log(productData)
        // ES6模板字符串 
        let list = document.getElementById('list')
        let str = ``;
        for (let i = 0; i < productData.length; i++) {
            let { title,
                img,
                price
            } = productData[i]
            str += ` <li>
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
        console.log(str)
    }
}
xhr.send(null)
 //获取的结果是一个(json格式字符串)
// 只要把对象的属性名用双引号包起来,此时的对象就不在称之为
// 普通对象,而是叫做json格式的对象
// 从服务器端获取的格式一般都是json格式的 

// 循环绑定到指定容器上

// for (let i = 0; i < productData.length; i++){
//     let item = productData[i]
//     let oLi = document.createElement('li')
//     list.appendChild(oLi)
// } 