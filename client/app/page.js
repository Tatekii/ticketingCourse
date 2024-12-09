// import { useState, useEffect,react } from "react"

// async function fetchData() {
// 	const response = await fetch('/api/data');
// 	const data = await response.json();
// 	return data;
//   }
import buildClient from "../api/buildClient"
import Header from "../components/header"

export default async function RootApp() {
	const client = await buildClient()

	const res = await client.get("/api/users/currentuser", { withCredentials: true })

	console.log(res.data)

	return (
		<>
			<Header currentUser={res.data.currentUser} />
			<main>
				<h2>Tickets</h2>
			</main>
		</>
	)
}
