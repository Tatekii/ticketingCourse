import { useEffect, useState } from "react"
import axios from "axios"
import Router, { useRouter } from "next/router"
import useRequest from "../../hooks/use-request"

export default function TicketShow() {
	const router = useRouter()
	const { ticketId } = router.query
	const [ticket, setTicket] = useState({})

	const { doRequest, errors } = useRequest({
		url: "/api/orders",
		method: "post",
		body: {
			ticketId: ticket.id,
		},
		onSuccess: (order) => Router.push("/orders/[orderId]", `/orders/${order.id}`),
	})

	useEffect(async () => {
		if (ticketId) {
			const { data } = await axios.get(`/api/tickets/${ticketId}`)
			setTicket(data)
		}
	}, [])

	return (
		<div>
			<h1>{ticket.title}</h1>
			<h4>Price: {ticket.price}</h4>
			{errors}
			<button onClick={() => doRequest()} className="btn btn-primary">
				Purchase
			</button>
		</div>
	)
}
