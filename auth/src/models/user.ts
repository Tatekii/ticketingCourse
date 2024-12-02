import mongoose from "mongoose"
import { Password } from "../services"

interface User {
	email: string
	password: string
}

interface UserMethod {}

// Model<TRawDocType,TQueryHelpers = {},TInstanceMethods = {实例方法},...>
interface UserModel extends mongoose.Model<UserDoc, {}, UserMethod> {
	build(attrs: User): UserDoc
}

interface UserDoc extends mongoose.Document, User {}


// Model<TRawDocType,TModelType,TInstanceMethods,...>
const userSchema = new mongoose.Schema<UserDoc, UserModel, UserMethod>({
	email: {
		type: String,
		required: true, 
	},
	password: {
		type: String,
		required: true,
	},
})

userSchema.static("build", (attr: User) => new User(attr))

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
	  const hashed = await Password.toHash(this.get('password'));
	  this.set('password', hashed);
	}
	done();
  });
  

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export { User }

const user = User.build({
	email: "asdascaf",
	password: "askchbaksc",
})
