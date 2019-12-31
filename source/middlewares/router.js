/*
 * @Author: tianzhi
 * @Date: 2019-12-31 18:19:18
 * @LastEditors  : tianzhi
 * @LastEditTime : 2019-12-31 18:20:47
 */

/**
 * koa中间件的规范:
        一个async函数 
        接收ctx和next两个参数 
        任务结束需要执行next
 */
const mid = async (ctx, next) => {
     // 来到中间件，洋葱圈左边
    next() // 进入其他中间件
    // 再次来到中间件，洋葱圈右边
};