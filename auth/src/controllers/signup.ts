import { body, validationResults } from "koa-req-validation"
import { RouterContext } from "@koa/router"
import { AuthValidationError, BadRequestError, DatabaseConnectionError } from "../middlewares"
import { User } from "../models/user"
import jwt from "jsonwebtoken"

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

		const existingUser = await User.findOne({ email })

		if (existingUser !== null) {
			// ctx.body = "email already in use"
			throw new BadRequestError("email already in use")
		}

		const newUser = User.build({ email, password })
		await newUser.save()

		// jwt generate
		const userJwt = jwt.sign(
			{
				id: newUser.id,
				email: newUser.email,
			},
			"TODO"
		)

		ctx.cookies.set("JWT", userJwt)

		ctx.body = newUser
	},
]
