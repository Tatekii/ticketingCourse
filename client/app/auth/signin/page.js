"use client"
import { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import useRequest from "../../../hooks/use-request"
import { useRouter } from 'next/navigation'

export default function Signin() {
	const router = useRouter()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { doRequest, errors } = useRequest({
		url: "/api/users/signin",
		method: "post",
		body: { email, password },
		onSuccess: () => router.push("/"),
	})

	const onSubmit = async (event) => {
		event.preventDefault()

		doRequest()
	}

	return (
		<Form onSubmit={onSubmit}>
			<h1>Sign In</h1>
			<Form.Group controlId="formEmail">
				<Form.Label>Email Address</Form.Label>
				<Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
			</Form.Group>
			<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
			</Form.Group>
			{errors}
			<Button variant="primary" type="submit">
				Sign In
			</Button>
		</Form>
	)
}
