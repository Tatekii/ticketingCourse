import { scrypt, randomBytes } from "node:crypto"
import { promisify } from "node:util"

const scryptAsync = promisify(scrypt)

export class Password {
	static async toHash(password: string) {
		const salt = randomBytes(8).toString("hex")
		const buffer = (await scryptAsync(password, salt, 64)) as Buffer
		return `${buffer.toString("hex")}.${salt}`
	}
	static async compare(password1: string, password2: string) {
		const [hashed, salt1] = password1.split(".")
		const buffer2 = (await scryptAsync(password2, salt1, 64)) as Buffer
		return buffer2.toString("hex") === hashed
	}
}
