"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCurUser } from "../../../context/user"

const SigninLayout = ({ children }) => {
	const router = useRouter()
	const userContext = useCurUser()

	useEffect(() => {
		if (userContext) {
			router.replace("/")
		}
	}, [userContext])

	return <>{children}</>
}

export default SigninLayout
