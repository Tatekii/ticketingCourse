import { useState, useEffect } from "react"
import buildClient from "../apis/buildClient"

export default function Home(props) {

	const { currentUser } = props

	const [tickets, setTickets] = useState([])

	const ticketList = tickets.map((ticket) => {
		return (
			<tr key={ticket.id}>
				<td>{ticket.title}</td>
				<td>{ticket.price}</td>
				<td>
					<Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
						View
					</Link>
				</td>
			</tr>
		)
	})

	// useEffect(() => {
	// 	axios
	// 		.get("/api/tickets")
	// 		.then((d) => {
	// 			setTickets(d)
	// 		})
	// 		.catch((e) => {
	// 			console.log(e)
	// 		})
	// }, [])

	return (
		<div>
			<h2>Tickets</h2>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Link</th>
					</tr>
				</thead>
				<tbody>{ticketList}</tbody>
			</table>
		</div>
	)
}