// app.js
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body')();

router.get('/users/login/:userName', async(ctx, next) =>
{
    const user = "Hello,router-->" + ctx.params.userName;
    ctx.body = user;
});

router.post('/users/register', koaBody, async(ctx, next) =>
{
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
});


app.use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);