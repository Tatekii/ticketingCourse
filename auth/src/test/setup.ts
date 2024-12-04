import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose, { mongo } from "mongoose"
import request from "supertest"
import app from "../app"

// app.ts
declare global {
	var signin: () => Promise<string[] | undefined>
}

let mockDb: MongoMemoryServer | null = null

beforeAll(async () => {
	process.env.JWT_KEY = "abcdefg123"

	mockDb = await MongoMemoryServer.create()
	const mockUrl = mockDb.getUri()

	await mongoose.connect(mockUrl)
})

beforeEach(async () => {
	// 清理
	const collections = await mongoose.connection.db?.collections()

	if (Array.isArray(collections)) {
		for (const collect of collections) {
			await collect.deleteMany()
		}
	}
})

afterAll(async () => {
	await mockDb?.stop()

	await mongoose.disconnect()
})

// global.signin = async () => {
// 	const email = "test@test.com"
// 	const password = "password"

// 	const authResponse = await request(app.callback())
// 		.post("/api/users/signup")
// 		.send({
// 			email,
// 			password,
// 		})
// 		.expect(201)

// 	const cookie = authResponse.get("Set-Cookie")

// 	console.log("AUTH,", cookie)

// 	return cookie
// }
