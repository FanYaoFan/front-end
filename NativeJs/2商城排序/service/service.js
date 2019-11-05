const Koa  = require ('koa')
const cors = require ('koa-cors')
const Router = require ('koa-router')
const app = new Koa()
app.use(cors())
let router = new Router()

let content = require ('./content')
app.use (content.routes())

app.use(router.routes())
app.use(router.allowedMethods())
app.use( async ctx => {
    ctx.body = 
      `<h1>后台页面</h1>`
    
})
app.listen( 3000, () => {
  console.log( 'server is running!!!')
})