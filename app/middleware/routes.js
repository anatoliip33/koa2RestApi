"use strict";

const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const router = new Router();
const usersModel = require('../models/users');

router
    /**
     * @example -v -X GET "http://127.0.0.1:3000/users/2/purchases"
     */
    .get("/users/:id/purchases", async(ctx, next) => {
        ctx.body = await usersModel.getById(ctx.params.id);
    })
    /**
     * @example curl -v -X POST "http://127.0.0.1:3000/users/2/purchases" -d '{"count":10}' -H "Content-Type: application/json"
     */
    .post('/users/:id/purchases', bodyParser(), async(ctx, next) => {
        let userId = await usersModel.add(ctx.request.body, ctx.params.id);

        if (typeof userId === 'number') {
            ctx.status = 201;
            ctx.body = {"id": userId};
        } else {
            ctx.status = 400;
        }
    })
    /**
     * @example curl -v -X DELETE "http://127.0.0.1:3000/users/2/purchases"
     * */
    .del("/users/:id/purchases", async(ctx, next) => {
        ctx.body = await usersModel.remove(ctx.params.id);
    });


module.exports = router;