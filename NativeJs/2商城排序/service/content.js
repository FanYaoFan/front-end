const Router = require("koa-router")
let router = new Router()

router.get('/shopList', async  ctx => {
    let data  = require('./json/product.json')
    ctx.body = data 
       
})
module.exports = router