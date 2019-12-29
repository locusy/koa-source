const http = require('http');

/**
 * koa为了能够简化API，引入上下文context概念，将原始请求对象req和响应对象res封装并挂载到context 上，
 * 并且在context上设置getter和setter，从而简化操作。
 */

class MyServer {
    listen(...arg) {
        const sev = http.createServer((req, res) => {
            this.callback(req, res);
        })
        sev.listen(...arg);
    }
    use(callback) {
        this.callback = callback;
    }
}
module.exports = MyServer

