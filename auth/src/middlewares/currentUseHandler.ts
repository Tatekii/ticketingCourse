import { RouterContext } from "@koa/router"
import { Context, Next, Request } from "koa"
import jwt from "jsonwebtoken"
import { User } from "../models/user"

// declare global {
// 	namespace Koa {
// 		interface ParameterizedContext<State = any, CustomKeys extends string = string> {
// 			request: Request & {
// 				currentUser?: User
// 			}
// 		}
// 	}
// }

export const currentUserHandler = async (ctx: Context, next: Next) => {
	const token = ctx.cookies?.get("JWT")

	if (!token) {
		await next()
		return
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_KEY!) as User
		ctx.currentUser = payload
	} catch (err) {}

	await next()
}
