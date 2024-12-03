import { Context, Next } from "koa"
import { IValidationError } from "koa-req-validation"

export abstract class CustomError extends Error {
	abstract statusCode: number
	abstract serialize(): { message: string; field?: string }[]

	constructor(message: string) {
		super(message)
	}
}

/** auth info 正则错误 */
export class AuthValidationError extends CustomError {
	readonly statusCode = 400

	constructor(public errors: IValidationError[]) {
		super("Error in auth info")
	}

	serialize() {
		return this.errors.map((e) => ({
			message: e.msg,
			field: e.param,
		}))
	}
}

/** 连接数据库出错 */
export class DatabaseConnectionError extends CustomError {
	readonly statusCode = 500
	readonly reason = "连接数据库出错"

	constructor() {
		super("Error connecting to DB")
	}

	serialize() {
		return [{ message: this.reason }]
	}
}

export class NotFoundError extends CustomError {
	readonly statusCode = 404

	constructor() {
		super("Resource not found")
	}

	serialize() {
		return [{ message: this.message }]
	}
}

export class BadRequestError extends CustomError {
	readonly statusCode = 400

	constructor(public message: string) {
		super(message)
	}

	serialize() {
		return [{ message: this.message }]
	}
}

/**
 * 错误捕获
 */
export const errorHandler = async (ctx: Context, next: Next) => {
	try {
		await next()
	} catch (err) {
		console.log(err);
		
		if (err instanceof CustomError) {
			ctx.status = err.statusCode
			ctx.body = { errors: err.serialize() }
		} else {
			ctx.status = 400
			ctx.body = [{ message: "Ops, Something went wrong" }]
		}
	}
}
