import { Context, Next } from "koa"
import { IValidationError } from "koa-req-validation"

/** auth info 正则错误 */
export class AuthValidationError extends Error {
	statusCode = 400

	constructor(public errors: IValidationError[]) {
		super()
		Reflect.setPrototypeOf(this, AuthValidationError.prototype)
	}

	serialized() {
		return this.errors.map((e) => ({
			message: e.msg,
			field: e.param,
		}))
	}
}

/** 连接数据库出错 */
export class DatabaseConnectionError extends Error {
	statusCode = 500
	reason = "连接数据库出错"

	constructor() {
		super()
		Reflect.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}

	serialized() {
		return [{ message: this.reason }]
	}
}

/**
 * 错误捕获
 */
export const errorHandler = async (ctx: Context, next: Next) => {
	try {
		await next()
	} catch (err) {
		if (err instanceof AuthValidationError) {
			ctx.status = err.statusCode
			ctx.body = { errors: err.serialized() }
		} else if (err instanceof DatabaseConnectionError) {
			ctx.status = err.statusCode
			ctx.body = { errors: err.serialized() }
		} else {
			ctx.status = 400
			ctx.body = [{ message: "Ops, Something went wrong" }]
		}
	}
}
