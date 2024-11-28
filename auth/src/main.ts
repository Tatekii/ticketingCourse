import Koa from "koa"
import { bodyParser } from "@koa/bodyparser"
import Router from "@koa/router"
import api from "./apis"

const app = new Koa()

const router = new Router()
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

app.use(api.routes()).use(api.allowedMethods())

app.listen(3000, () => {
	console.log("auth listening on 3000...")
})
