/*
 * @Author: tianzhi
 * @Date: 2019-12-30 17:13:52
 * @LastEditors  : tianzhi
 * @LastEditTime : 2019-12-30 17:30:57
 */
module.exports = {
    get url() {
        return this.request.url
    },
    get body() {
        return this.response.body
    },
    set body(value) {
        this.response.body = value
    },
    get method() {
        return this.request.method
    }
}