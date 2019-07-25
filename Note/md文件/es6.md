# 📄ES6+常用语法（简） 

**这里不只是ES6 (ECMAScript 2015)的语法， 加号的意思是ES6以及更高的版本**
 `这里用+主要是我懒,不想再细分了🤣` 

标准的基础版本ECMAScript 2015， 也称为 ES6 或者 ES2015 。 该版本从1999年到2009年， 花费 10 年定制， 因此它也是该语言的基础和非常重要的修订版。 

本来按照新的命名规则： 根据发布年号命名， 他不应该叫ES6的， 应该是ES2015才对。 

 `我想说特么的这些大佬就一个命名规则改来改去真的好吗?我猜一定是他们这些基佬生活枯燥,所以改个规则调戏一下广大开发而寻求乐趣😵` 

::: tip 提醒
为了方便书写， 下文中 :

 ` ES5 ` 代表ES5.1 ` (ECMAScript5.1) ` 这里的 ` 5.1 ` 是版本号` ; 

 ` ES6 ` 代表了ES 2015 + ` (ECMAScript 2015及以后) ` 官方新命名规则， 这里 ` 2015 ` 代表发布年号` 
:::

## 变量声明

### let

- `let` 用于声明一个变量
- `let` 声明的变量不存在变量提升<Badge text="非正确"/>， 
- `let` 声明的变量存在块级作用域, 
- `let` 声明的变量只在其声明的作用域可以访问, 
- 使用了 `let` 声明的作用域, 会生成暂时性死区.

```js
let num = 1; //这是全局变量
{
    let sum = 2;
}

console.log(num) //1
console.log(sum) //报错sum is not defined
//上面的{}内中的sum 在外部是访问不到的
```

:::tip 提示
 通过 `let` 声明的变量, 其所在的作用域以及其下的子作用域, 都不可使用 var 重新声如果声明, 则会报错 `Identifier '某' has already been declared(某标识符已被声明)` 举例如下
:::

```js
{
    let str = 'stringcodeOne';
    var str = 'stringcodeTwo'; // 报错Identifier 'str' has already been declared(str已被声明)
    {
        var str = 'stringcodeTwo' // 报错Identifier 'str' has already been declared(str已被声明)
        // 因为根据作用域链, var声明一个变量的时候, 没有暂时性死区, 且存在变量提升.
    }
}
```

:::tip 提示
在for 循环中, 设置循环条件的 `(let i = 1;...)` 是父作用域, 而循环体 `{...}` 则是一个子作用域
:::
**具体效果如下**

```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function() {
        console.log(i)
    }, 0)
}
// 最终打印了5次 5

for (let i = 1; i <= 5; i++) {
    setTimeout(function() {
        console.log(i)
    }, 0)
}
// 最终依次打印出 1,2,3,4,5
```

### const

- const用于声明一个常量; 
- const只能声明一未被声明的常量, 如果已经声明过, 则会报错; 
- const声明的常量必须在声明的时候就进行赋值; 
- const声明的常量不可修改(对象除外, 包括数组对象)
- 同样 , 存在块级作用域 , 存在暂时性死区, 不存在变量提升<Badge text="非正确"/>.

```js
var a = 1;
const a = 2 // 报错  Identifier 'a' has already been declared (告诉我们a已经被声明)

const b; // 报错   Missing initializer in const declaration (告诉我们缺少初始化值)
```

const 本质上是保存的是当前声明变量所指向的内存地址不得改变. 那么, 对于const 声明的对象, 仍然是可以修改的. 数组也是可以的, 因为数组也是对象的一种.

```js

1. 基本数据类型(String、 Undefined、 Null、 Boolean、 Number)

const a = '字符串';
a = '新字符串' //报错 Assignment to constant variable (告诉你这是一个常量,不可以给一个常量赋值)
const b = 10;
b = 20 //报错 Assignment to constant variable 
const c = true;
c = false //报错 Assignment to constant variable

2. 引用类型Object(复杂数据类型)

const obj = {
    name: '爸爸',
    sex: '男'
}
obj.name = '妈妈';
obj.sex = '女';
console.log(obj) //修改成功 {name:'妈妈', sex:'女'}

3. 引用类型Array(数组也是一种对象, 复杂数据类型)

const arr = ['数组', 10, '数组']
arr[0] = '新数组'
console.log(arr) //修改成功  ['新数组', 10, '数组']

4. 引用类型Function(思考, 这个可以吗 ? 当然可以啦)

function Fun() {
    this.name = '女儿'
}
const fn = new Fun()
console.log(fn.name) // '女儿'
fn.name = '儿子'
console.log(fn.name) // '儿子'
```

:::tip 小技巧
通过上面的代码, 我们可以看到, 我们列举了两种数据类型. 发现一般情况下**基本类型**都**不可以修改**, **引用数据类型**基本都**可以修改**.
:::

:::tip 变量提升
关于变量提升这个名词, 是非正式的.    
详细解释请参考**变量提升**   
var 声明提升, 初始化提升, 赋值不提升; 
let/cost 声明提升, 初始化不提升, 赋值不提升; 
function 声明提升, 初始化提升, 赋值提升; 
:::

## 箭头函数

- 不需要 function 关键字来创建函数
- 省略 return 关键字
- 继承当前上下文的 this 关键字

### 基本用法， 以及写法对比

```js
// ES5
const fn = function fn() {
    //... 需要执行的代码块
}

// ES6
const fn = () => {
    //... 需要执行的代码块
}
```

### 简写

在 `ES6` 中， 当我们的函数体 `{}` 里的代码块只有**一行代码**的时候； 我们可以将其简写

```js
const fn = () => {
    num + 1;
}
// 简写
const fn = () => num + 1;
```

::: warning 警告
函数体简写中， 不可以使用 `return` , 因为在简写中 , 函数体默认使用了 return ; 

 `const fn = () =>  return num + 1;` ❌
:::

在 `ES6` 中， 当我们的函数体的 `argument` 参数只有 **一个参数**的时候； 我们可以将其简写

```js
const fn = (num) => {
    num + 1;
}
// 简写
const fn = num => {
    num + 1
}
```

那么， 在满足**只有一个参数**且**只有一行执行代码**, 可以如下简写

```js
const fn = (num) => {
    num + 1;
}
//简写
const fn = num => num + 1;
```

::: tip 思考？ 
是否可以利用 `(,doing1,doing2...)` 来简写多行代码块呢？ 是可以的！ 

关于 `(,doing1,doing2...)` 写法解释请查看XXX `XXX我还没更新上来,其实你也看到了,好多都还是残缺不全的,熬夜码字不易,慢慢来吧,我是想到什么就写什么` 
:::

```js
var double_num;
const fn = (num) => {
    double_num = num * 2
    console.log(before_num, after_num, double_num)
}
// 简写
const fn = num => (double_num = num * 2, console.log(double_num))
```

### rest 参数

- rest 参数的形式为 `...变量名` , 用于获取多余的参数. 
- rest 运算符和扩展运算符一样的写法, 也是 三个点 (...)
- 但是功能缺完全相反 , rest 运算符是将逗号隔开的值序列组合成一个数组

```js
let showFood = (...foodlist) => foodlist.map(item => console.log(item)) //最终会打印出每一个参数

showFood('苹果', '栗子', '香蕉') //苹果,栗子,香蕉
```

## 扩展运算符(...)

- 注意扩展运算符和rest运算符是完全相反的 , 他是将一个数组或类数组对象展开成用逗号隔开的一系列值
- 扩展运算符是把数组或类数组对象展开成一系列用逗号隔开的值
- 我们一般来讲扩展运算符(...)用于取出参数对象中的所有可遍历属性， 拷贝到当前对象之中.
- 使用扩展运算进行拷贝的时候, 是进行的**浅拷贝**

**基本用法**

```js
// 数组
//建议使用扩展运算符拷贝一个数组

let ar1 = [1, 2, 3, 44, 4];
let ar2 = [929, 221, 2, 3]
let _ar1 = [...ar1] //拷贝了 数组ar1 
let all = [...ar1, ...ar2] //将 数组ar1 和 数组ar2 合并 
// 对象
```

扩展运算符内部使用的是for ... of ... 进行的遍历, 所以只有可迭代类型的数据才可以使用扩展运算符
