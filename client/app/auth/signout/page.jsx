"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useRequest from "../../../hooks/use-request"

const SignoutPage = () => {
	const router = useRouter()

	const { doRequest } = useRequest({
		url: "/api/users/signout",
		method: "post",
		body: {},
		onSuccess: () => {
			router.replace("/")
			router.refresh()
		},
	})

	useEffect(() => {
		doRequest()
	}, [])

	return <div>Signing you out...</div>
}

export default SignoutPage
