import { RouterContext } from "@koa/router"
import { body } from "koa-req-validation"
import { AuthValidationError, BadRequestError } from "../middlewares"
import { User } from "../models/user"
import jwt from "jsonwebtoken"
import { validateAuthHandler } from "../middlewares"
import { Password } from "../services"
import { Next } from "koa"

const userSigninValidation = [
	body("email").isEmail().withMessage("Email must be valid").build(),
	body("password").trim().isLength({ min: 1 }).withMessage("Password can not be empty").build(),
]

export const signinController = [
	...userSigninValidation,
	validateAuthHandler,
	async (ctx: RouterContext, next: Next) => {
		const { email, password } = ctx.request.body

		const existingUser = await User.findOne({ email })

		// 无该注册用户
		if (existingUser === null) {
			throw new BadRequestError("This email address was not registered")
		}

		const passwordMatch = await Password.compare(existingUser.password, password)

		if (!passwordMatch) {
			throw new BadRequestError("Password is not correct")
		}

		// jwt generate
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!,
			{
				expiresIn: "1h", // 1h过期
			}
		)

		ctx.cookies.set("JWT", userJwt, {
			maxAge: 3600000, // 1h过期
		})

		ctx.body = existingUser

		await next()
	},
]
