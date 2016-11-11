// app.js
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

app.use(async(ctx, next) =>
{
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get('/users/login/:userName', async(ctx, next) =>
{
    const user = await "Hello,router-->"+ctx.params.userName;
    ctx.body = user;
});

app.use(router.routes())
    .use(router.allowedMethods());

app.use(ctx =>
{
    ctx.body = 'Hello Koa555';
});

app.listen(3000);