import Koa from "koa"
import { bodyParser } from "@koa/bodyparser"
import Router from "@koa/router"
import api from "./apis"
import * as middlewares from "./middlewares"
import { DB } from "./services"
import session from "koa-session"
import { User } from "./models/user"

if (!process.env.JWT_KEY) {
	throw new Error("Can not find JWT_KEY in auth container!")
}

const app = new Koa({
	proxy: true,
})

// port
const PORT = parseInt(process.env.PORT as string, 10) || 3000

// koa route
const router = new Router()

const CONFIG: Partial<session.opts<Koa.DefaultState, Koa.DefaultContext, any>> = {
	// key: "koa.sess" /** (string) cookie key (default is koa.sess) */,
	/** (number || 'session') maxAge in ms (default is 1 days) */
	/** 'session' will result in a cookie that expires when session/browser is closed */
	/** Warning: If a session cookie is stolen, this cookie will never expire */
	maxAge: 86400000,
	// autoCommit: true /** (boolean) automatically commit headers (default true) */,
	// overwrite: true /** (boolean) can overwrite or not (default true) */,
	// httpOnly: true /** (boolean) httpOnly or not (default true) */,
	signed: false /** (boolean) signed or not (default true) */,
	// rolling:
	// false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
	// renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
	secure: true /** (boolean) secure cookie*/,
	// sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */,
}

app.use(bodyParser()).use(session(CONFIG, app)).use(router.routes()).use(router.allowedMethods())

//
DB.connect()

//
app.use(middlewares.errorHandler)

// apis
app.use(api.routes()).use(api.allowedMethods())

app.listen(PORT, () => {
	console.log("auth listening on =>", PORT)
})
