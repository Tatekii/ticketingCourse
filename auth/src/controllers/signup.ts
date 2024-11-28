import { body, validationResults } from "koa-req-validation"
import { RequestError, SignupInfo } from "."
import { Context, Next } from "koa"
import { RouterContext } from "@koa/router"

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
	async (ctx: RouterContext<SignupInfo>) => {
		const results = validationResults(ctx)

		if (results.hasErrors()) {
			throw new Error("Invalid email or password")
		}

		const { email, password } = ctx.request.body
		// Process the user registration here

		ctx.body = { message: "User registered successfully" }
	},
]
