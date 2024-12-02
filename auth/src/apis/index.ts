import Router from "@koa/router"
import * as controllers from "../controllers"
import { Context } from "koa"
import { NotFoundError } from "../middlewares"

/**
 * Start API Routes
 *
 * All prefixed with `/api/`
 */
const api = new Router({
	prefix: "/api",
})

api.get("/users/4041", async (ctx, next) => {
	throw new NotFoundError()
	// await next()
})

api.get("/users/currentUser", controllers.currentUserController)

// api.post("/users/signin", controllers.currentUserController)

api.post("/users/signup", ...controllers.signupController)

// api.get("/users/signout", controllers.currentUserController)

export default api
