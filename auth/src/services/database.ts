import mongoose from "mongoose"

export const DB = {
	url: "mongodb://auth-mongo-srv:27017/auth",
	connect: function () {
		try {
			mongoose.connect(this.url)
			console.log("connected to mongodb in ", this.url)
		} catch (err) {
			console.log("\x1b[41;37m 连接数据库出错，" + err)
		}
	},
}
