/*
 * @Author: tianzhi
 * @Date: 2019-12-30 17:13:46
 * @LastEditors  : tianzhi
 * @LastEditTime : 2019-12-30 17:26:27
 */
module.exports = {
    get url() {
        return this.req.url
    },
    get method() {
        return this.req.method.toLowerCase()
    }
}