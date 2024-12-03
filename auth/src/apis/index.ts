import Router from "@koa/router"
import * as controllers from "../controllers"
import { NotFoundError } from "../middlewares"

/**
 * Start API Routes
 *
 * All prefixed with `/api/`
 */
const api = new Router({
	prefix: "/api",
})

api.get("/users/404", async (ctx, next) => {
	throw new NotFoundError()
})

api.get("/users/currentUser", ...controllers.currentUserController)

api.post("/users/signin", ...controllers.signinController)

api.post("/users/signup", ...controllers.signupController)

api.post("/users/signout", ...controllers.signoutController)

export default api
