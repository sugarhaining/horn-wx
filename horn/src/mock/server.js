const koa =require('koa')
const bodyParser=require('koa-bodyparser')
const router=require('./router/route')
const app=new koa();
const port=8080;

//配置body-parser
app.use(bodyParser())

//配置路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(port)


