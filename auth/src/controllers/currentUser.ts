import { RouterContext } from "@koa/router"
import { Next } from "koa"
import { currentUserHandler } from "../middlewares/currentUseHandler"
import { requireAuthHandler } from "../middlewares/requireAuthHandler"

export const currentUserController = [
	currentUserHandler,
	// requireAuthHandler,
	async (ctx: RouterContext, next: Next) => {

		ctx.body = { currentUser: ctx.currentUser }

		await next()
	},
]
