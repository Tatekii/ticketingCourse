import { RouterContext } from "@koa/router"
import { Context, Next } from "koa"
import { currentUserHandler } from "../middlewares/currentUseHandler"
import { requireAuthHandler } from "../middlewares/requireAuthHandler"

export const currentUserController = [
	currentUserHandler,
	// requireAuthHandler,
	async (ctx: Context, next: Next) => {

		ctx.body = { currentUser: ctx.state.user }

		await next()
	},
]
