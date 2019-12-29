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
 * koa的目标是用更简单化、流程化、模块化的方式实现回调部分
 */
const MyServer = require('./server');
const app = new MyServer();

app.use((req, res) => {
   res.writeHead(200);
   res.end('MyServer koa');
})
app.listen(8000, () => {
   console.log('server is listening at 8000');
})
