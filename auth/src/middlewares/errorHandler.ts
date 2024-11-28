import { Context, Next } from "koa"

export const errorHandler = async (ctx: Context, next: Next) => {
	try {
		await next()
	} catch (err) {
		console.log("CATCH ERROR", err)
	}
}
