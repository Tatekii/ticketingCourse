import Router from "@koa/router"
import * as controllers from "../controllers"

/**
 * Start API Routes
 *
 * All prefixed with `/api/`
 */
const api = new Router({
	prefix: "/api",
})

api.get("/users/currentUser", controllers.currentUserController)

export default api
