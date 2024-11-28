import { RouterContext } from "@koa/router"
import Koa from "koa"
import { body, validationResults } from "koa-req-validation"

/**
 * Class returning errors as JSON response.
 */
export class RequestError extends Error {
	public readonly name = "RequestError"

	public readonly status: number

	public readonly response: any

	constructor(status: number, errors: any) {
		super()
		this.status = status
		this.response = errors
	}
}

export const currentUserController = async (ctx: Koa.Context, next: Koa.Next) => {
	await next()
	ctx.body = "current user"
}

export interface SignupInfo {
	email: string
	password: string
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
