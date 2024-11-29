import { body, validationResults } from "koa-req-validation"
import { Context, Next } from "koa"
import { RouterContext } from "@koa/router"
import { AuthValidationError, DatabaseConnectionError } from "../middlewares"

// export const validationErrorHandler = async (ctx: Context, next: Next) => {
// 	try {
// 		await next()
// 	} catch (err: any) {
// 		console.log("CATCH ERR", err)

// 		if (err.isBoom) {
// 			ctx.status = err.output.statusCode
// 			ctx.body = err.output.payload
// 		} else {
// 			throw err
// 		}
// 	}
// }

// Validation rules for user registration
const userRegistrationValidation = [
	body("email").isEmail().withMessage("Invalid email address").build(),
	body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").build(),
]

export const signupController = [
	...userRegistrationValidation,
	async (ctx: RouterContext) => {
		const results = validationResults(ctx)

		if (results.hasErrors()) {
			throw new AuthValidationError(results.array())
		}

		const { email, password } = ctx.request.body

		ctx.body = { message: "User registered successfully" }
	},
]
