import { body, validationResults } from "koa-req-validation"
import { RouterContext } from "@koa/router"
import { AuthValidationError, BadRequestError, DatabaseConnectionError } from "../middlewares"
import { User } from "../models/user"
import jwt from "jsonwebtoken"
import { validateAuthHandler } from "../middlewares/validateAuthHandler"
import { Next } from "koa"

// Validation rules for user registration
const userRegistrationValidation = [
	body("email").isEmail().withMessage("Invalid email address").build(),
	body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").build(),
]

export const signupController = [
	...userRegistrationValidation,
	validateAuthHandler,
	async (ctx: RouterContext, next: Next) => {
		const { email, password } = ctx.request.body

		const existingUser = await User.findOne({ email })

		if (existingUser !== null) {
			throw new BadRequestError("email already in use")
		}

		const newUser = User.build({ email, password })
		await newUser.save()

		ctx.status = 200
		ctx.body = { message: "Successful registration!" }

		await next()
	},
]
