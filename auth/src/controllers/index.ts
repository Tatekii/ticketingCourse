import Koa from "koa"

export const currentUserController = async (ctx: Koa.Context, next: Koa.Next) => {
	await next()
	ctx.body = "current user"
}
