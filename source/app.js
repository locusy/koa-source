const Koa = require('koa');
const app = new Koa();

app.use((context, next) => {
    context.body = [
        {
            name: 'a sample body'
        }
    ]
    next()
})

app.listen(8000)