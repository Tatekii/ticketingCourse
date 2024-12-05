import { bodyParser } from "@koa/bodyparser"
import Router from "@koa/router"
import api from "./apis"
import * as middlewares from "./middlewares"
import Koa, { Context, Next } from "koa"
import session from "koa-session"
import { User } from "./models/user"

declare module "koa" {
	interface Context {
		state: {
			user?: User
		}
	}
}

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

const app = new Koa({
	proxy: true,
})
// koa route
const router = new Router()

app.use(bodyParser()).use(session(CONFIG, app)).use(router.routes()).use(router.allowedMethods())

const test = new Router()


console.log(123);

test.get('/hello',async (ctx:Context,next:Next)=>{
	await next()
	ctx.body = 'HELLO WORD'
})
app.use(test.routes()).use(test.allowedMethods())
//
app.use(middlewares.errorHandler)

// apis
app.use(api.routes()).use(api.allowedMethods())

export default app
