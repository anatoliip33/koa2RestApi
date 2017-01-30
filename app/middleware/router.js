"use strict";

const Router = require("koa-router");
const router = new Router();


router.get('/users', async (ctx, next) => {
    ctx.body = '/users';
});

module.exports = {
    router: router,
    allowedMethods: router.allowedMethods
};