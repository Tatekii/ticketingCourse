import { RouterContext } from "@koa/router"
import Koa from "koa"
import { body, validationResults } from "koa-req-validation"


export const currentUserController = async (ctx: Koa.Context, next: Koa.Next) => {
	await next()
	ctx.body = "current user"
}

export const signinController = async (ctx: Koa.Context, next: Koa.Next) => {
	await next()
	ctx.body = "current user"
}

export const signoutController = async (ctx: Koa.Context, next: Koa.Next) => {
	await next()
	ctx.body = "current user"
}

export * from "./signup"
