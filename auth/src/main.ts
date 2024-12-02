import Koa from "koa"
import { bodyParser } from "@koa/bodyparser"
import Router from "@koa/router"
import api from "./apis"
import * as middlewares from "./middlewares"
import { DB } from "./services"

const app = new Koa()

// port
const PORT = parseInt(process.env.PORT as string, 10) || 3000

// koa route
const router = new Router()
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

//
DB.connect()

//
app.use(middlewares.errorHandler)

// apis
app.use(api.routes()).use(api.allowedMethods())

app.listen(PORT, () => {
	console.log("auth listening on =>", PORT)
})
