/*
 * @Author: tianzhi
 * @Date: 2019-12-30 17:13:39
 * @LastEditors  : tianzhi
 * @LastEditTime : 2019-12-30 17:27:25
 */
module.exports = {
    get body() {
        return this._body
    },
    set body(value) {
        this._body = value
    }
}