const Router = require("koa-router")
let router = new Router()
// 1 轮播图数据
router.get('/swiper', async ctx=>{
    let data  = require('./json/banner.json')
    ctx.body = data
})

// 2 商城排序数据
router.get('/shopList', async  ctx => {
    let data  = require('./json/product.json')
    ctx.body = data 
       
})

module.exports = router