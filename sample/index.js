/*
 * @Author: tianzhi 
 * @Date: 2019-12-29 15:13:10 
 * @Last Modified by:   tianzhi 
 * @Last Modified time: 2019-12-29 15:13:10 
 */
const Koa = require('koa');
const app = new Koa();

/**
 * 基本操作
 */
app.use((context, next) => {
    context.body = [
        {
            name: 'a sample body'
        }
    ]
    next()
})

// app.use((ctx, next) => {
//     console.log('url:', ctx.url)
//     if(ctx.url == '/html') {
//         ctx.type = 'text/html;charset=utf-8'
//         ctx.body = `<b>名字是${ctx.body[0].name}</b>`
//     }
//     next()
// })


/**
 * 定义路由
 */
const router = {}
router['/html'] = ctx => {
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = `<b>名字是${ctx.body[0].name}</b>`
}
app.use((ctx, next) => {
    router[ctx.url](ctx)
    next()
})


/**
 * 中间件
 */
app.use(require('koa-static')(__dirname + '/'))

const router = require('koa-router')();
router.get('/string', async (ctx, next) => {
    ctx.body = 'string koa'
})
router.get('/json', async (ctx, next) => {
    ctx.body = {
        name: 'json name koa'
    }
})
app.use(router.routes())


/**
 * 日志
 */
app.use(async (ctx,next) => {
    const start = new Date().getTime()
    console.log(`start: ${ctx.url}`);
    await next();
    const end = new Date().getTime();
    console.log(`请求${ctx.url}, 耗时${parseInt(end-start)}ms`)
})


app.listen(8000)