"use strict";

const Koa = require("koa");
const app = new Koa();
const config = require("config");
const router = require("./middleware/routes");

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.server.port);