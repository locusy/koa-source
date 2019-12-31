/*
 * @Author: tianzhi 
 * @Date: 2019-12-29 15:13:04 
 * @Last Modified by: tianzhi
 * @Last Modified time: 2019-12-29 17:34:29
 */

 
 /**
  * 原始http
  */
//  const http = require('http');
//  const server = http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('server sample');
//  })

//  server.listen(8001, () => {
//     res.end('server is listening at 8001');
//  })


/**
 * 简化版koa
 * koa的目标是用更简单化、流程化、模块化的方式实现回调部分
 */
// const MyServer = require('./server');
// const app = new MyServer();

// app.use((req, res) => {
//    res.writeHead(200);
//    res.end('MyServer koa');
// })
// app.listen(8000, () => {
//    console.log('server is listening at 8000');
// })


/**
 * koa引入中间件概念
 */
// const MyServer = require('./server');
// const app = new MyServer();

// app.use(ctx => {
//    ctx.body = '1321'
// })
// app.listen(8000, () => {
//    console.log('server is listening at 8000');
// })



/**
 * compose在koa中的应用
 */
const MyServer = require('./server');
const app = new MyServer();
const delay = () => Promise.resolve(resolve => 
  setTimeout(() => resolve() ,2000)
);
app.use(async (ctx, next) => {
    ctx.body = "1";
    setTimeout(() => {
        ctx.body += "2";
    }, 2000);
    await next();
    ctx.body += "3";
});
app.use(async (ctx, next) => {
    ctx.body += "4";
    await delay();
    await next();
    ctx.body += "5";
});
app.use(async (ctx, next) => {
    ctx.body += "6";
});
app.listen(8000, () => {
    console.log('server is listening at 8000');
})



