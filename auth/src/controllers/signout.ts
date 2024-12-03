import { RouterContext } from "@koa/router"
import { Next } from "koa"

export const signoutController = [
	async (ctx: RouterContext, next: Next) => {

		ctx.cookies.set('JWT','',{
			maxAge:0
		})
		
		ctx.body = {}

		await next()
	},
]
