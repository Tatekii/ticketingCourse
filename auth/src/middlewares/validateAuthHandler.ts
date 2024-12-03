import { Context, Next } from "koa"
import { AuthValidationError } from "."
import { validationResults } from "koa-req-validation"
import { RouterContext } from "@koa/router"

/**
 * 权限判定
 */
export const validateAuthHandler = async (ctx: RouterContext, next: Next) => {
	const results = validationResults(ctx)

	if (results.hasErrors()) {
		throw new AuthValidationError(results.array())
	}

	await next()
}
