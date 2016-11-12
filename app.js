// app.js
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body')();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/koa2');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 用户模型
var userSchema = new Schema({
    uid: String, // 用户 id
    nick: String, // 用户昵称
    pwd: String, // 用户密码
    project: [{
        type: ObjectId,
        ref: 'Project'
    }] // 这个用户对应的作品
});

// 建立Model

var User = mongoose.model('User', userSchema);

var user = {
    uid: '545183867',
    nick: '哈哈哈'
};

var newUser = new User(user);
console.log(newUser.nick);
newUser.save();

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