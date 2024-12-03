import app from "./app"
import { DB } from "./services"

// port
const PORT = parseInt(process.env.PORT as string, 10) || 3000

const start = async () => {
	console.log("starting auth...")

	if (!process.env.JWT_KEY) {
		throw new Error("Can not find JWT_KEY in auth container!")
	}

	await DB.connect()

	app.listen(PORT, () => {
		console.log("auth listening on =>", PORT)
	})
}

start()
