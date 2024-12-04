import request from "supertest"
import app from "../../app"

describe("test signup", () => {
	it("returns a 201 on successful sigup", async () => {
		request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(201)
	})

	it("returns a 400 with an invalid email", async () => {
		return request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "testtest.com",
				password: "password",
			})
			.expect(400)
	})

	it("returns a 400 with an invalid password", async () => {
		return request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "testtest.com",
				password: "p",
			})
			.expect(400)
	})

	it("returns a 400 with missing email and password", async () => {
		await request(app.callback()).post("/api/users/signup").send({ email: "test@test.com" }).expect(400)
		await request(app.callback()).post("/api/users/signup").send({ password: "password" }).expect(400)
	})

	it("disallows duplicate emails", async () => {
		await request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(201)

		await request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(400)
	})
})

describe("test signin", () => {
	it("fails when a email that does not exist ia supplied", async () => {
		await request(app.callback())
			.post("/api/users/signin")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(400)
	})

	it("fails when an incorrect password is supplied", async () => {
		await request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(201)

		await request(app.callback())
			.post("/api/users/signin")
			.send({
				email: "test@test.com",
				password: "asdfghj",
			})
			.expect(400)
	})

	it("responds with a cookie when given valid credentials", async () => {
		await request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(201)

		const response = await request(app.callback())
			.post("/api/users/signin")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(200)

		expect(response.get("Set-Cookie")).toBeDefined()
	})
})

// it("sets a cookie after successful signup", async () => {
// 	const response = await request(app.callback())
// 		.post("/api/users/signup")
// 		.send({
// 			email: "test@test.com",
// 			password: "password",
// 		})
// 		.expect(201)

// 	expect(response.get("Set-Cookie")).toBeDefined()
// })

describe("test current user", () => {
	it("responds with details about the current user", async () => {
		const email = "test@test.com"
		const password = "password"

		// signup
		const signupResponse = await request(app.callback())
			.post("/api/users/signup")
			.send({
				email,
				password,
			})
			.expect(201)

		// signin
		const signinResponse = await request(app.callback())
			.post("/api/users/signin")
			.send({
				email,
				password,
			})
			.expect(200)

		const cookie = signinResponse.get("Set-Cookie")

		const response = await request(app.callback())
			.get("/api/users/currentuser")
			.set("Cookie", cookie!)
			.send()
			.expect(200)

		expect(response.body.currentUser.email).toEqual(email)
	})

	it("responds with null if not authenticated", async () => {
		const response = await request(app.callback()).get("/api/users/currentuser").send().expect(200)

		expect(response.body.currentUser).toEqual(null)
	})
})

describe("test signout", () => {
	it("clears the cookie after signing out", async () => {
		await request(app.callback())
			.post("/api/users/signup")
			.send({
				email: "test@test.com",
				password: "password",
			})
			.expect(201)

		const response = await request(app.callback()).post("/api/users/signout").send({}).expect(200)

		expect(response.get("Set-Cookie")?.[0]).toEqual("JWT=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly")
	})
})
