import axios from "axios"
import { headers } from "next/headers"
import { cookies } from "next/headers"

export default async () => {
	if (typeof window === "undefined") {
		console.log("RUN IN SERVER")

		const headerStore = await headers()
		const cookieStore = await cookies()

		const { name, value } = cookieStore.get("JWT") || {}

		const jwtString = `${name}=${value}`

		console.log({ jwtString })

		return axios.create({
			baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
			// baseURL: "http://10.97.113.193.ingress-nginx.svc.cluster.local",
			// baseURL: "http://10.97.113.193.ingress-nginx",
			headers: {
				Host: headerStore.get("Host"), // match ingress config file <rules.host>
				Cookie: jwtString,
			},
		})
	} else {
		return axios.create({
			baseURL: "/",
		})
	}
}
