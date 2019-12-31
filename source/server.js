const http = require('http');

/**
 * 简化版koa 还没有引入中间件
 */
// class MyServer {
//     listen(...arg) {
//         const sev = http.createServer((req, res) => {
//             this.callback(req, res);
//         })
//         sev.listen(...arg);
//     }
//     use(callback) {
//         this.callback = callback;
//     }
// }
// module.exports = MyServer


/**
 * koa为了能够简化API，引入上下文context中间件概念，将原始请求对象req和响应对象res封装并挂载到context上，
 * 并且在context上设置getter和setter，从而简化操作。
 */
// const context = require('./context')
// const response = require('./response')
// const request = require('./request')

// class MyServer {
//     listen(...arg) {
//         const sev = http.createServer((req, res) => {
//             const ctx = this.creatContext(req, res)
//             this.callback(ctx)
//             res.end(ctx.body)
//         })
//         sev.listen(...arg);
//     }
//     use(callback) {
//         this.callback = callback;
//     }
//     // 构建上下文, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
//     creatContext(req, res) {
//         const ctx = Object.create(context)
//         ctx.request = Object.create(request)
//         ctx.response = Object.create(response)
    
//         ctx.req = ctx.request.req = req
//         ctx.res = ctx.response.res = res
//         return ctx
//     }
// }
// module.exports = MyServer



/**
 * compose用在koa中的应用
 */
// const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
class MyServer {
  // 初始化中间件数组 
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
    const ctx = this.createContext(req, res); 
    // 中间件合成
    const fn = this.compose(this.middlewares); 
    // 执行合成函数并传入上下文
      await fn(ctx);
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  use(middleware) {
    // 将中间件加到数组里 
    this.middlewares.push(middleware);
  }
  // 合成函数 
  compose(middlewares) {
    return function(ctx) { 
      // 传入上下文 
      return dispatch(0);
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            // 将上下文传入中间件，mid(ctx,next)
            return dispatch(i + 1);
          })
        ); 
      }
    }; 
  }
  createContext(req, res) {
      let ctx = Object.create(context);
      ctx.request = Object.create(request);
      ctx.response = Object.create(response);
      ctx.req = ctx.request.req = req;
      ctx.res = ctx.response.res = res;
      return ctx;
  } 
}
module.exports = MyServer;

