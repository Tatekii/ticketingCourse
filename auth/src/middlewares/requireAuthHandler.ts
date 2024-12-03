import { RouterContext } from "@koa/router"
import { Next } from "koa"
import { CustomError } from "./errorHandler"

class NotAuthorizedError extends CustomError {
	readonly statusCode = 401

	constructor() {
		super("Not Authorized")
	}

	serialize() {
		return [{ message: this.message }]
	}
}

export const requireAuthHandler = async (ctx: RouterContext, next: Next) => {
	if (!ctx.currentUser) {
		throw new NotAuthorizedError()
	}
	await next()
}
