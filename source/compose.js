/*
 * @Author: tianzhi
 * @Date: 2019-12-31 10:04:18
 * @LastEditors  : tianzhi
 * @LastEditTime : 2019-12-31 15:28:22
 */
const add = (x, y) => x + y
const add2 = (x) => x * 2
const square = z => z * z

/**
 * 函数组合
 */
// const fn = (x, y) => square(add(x, y))
// console.log(fn(1, 5))


/**
 * 上面就算是两次函数组合调用，我们可以把他合并成一个函数
 */
// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// const fn3 = compose(add,square)
// console.log(fn3(1, 8))
// console.log(fn3(...[1, 8]))


/**
 * 多个函数组合:中间件的数目是不固定的，我们可以用数组来模拟
 */
// const compose = (...[first, ...other]) => (...args) => {
//     let ret = first(...args)
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret
// }
// const fn4 = compose(add, add2, square)
// console.log(fn4(...[1, 3]))


/**
 * 异步中间件:上面的函数都是同步的，挨个遍历执行即可，如果是异步的函数呢，是一个promise，
 * 我们要支 持async + await的中间件，所以我们要等异步结束后，再执行下一个中间件。
 */
function compose(middlewares) {
    return function() {
        return dispatch(0)
        function dispatch(i) {
            const fn = middlewares[i]
            if(!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i+1)
                })
            )
        }
    }
}

async function fn1(next) {
    console.log('fn1')
    await next()
    console.log('fn1 end')
}

async function fn2(next) {
    console.log('fn2')
    await delay()
    await next()
    console.log('fn2 end')
}

function fn3(next) {
    console.log('fn3')
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}

const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares)
finalFn()
