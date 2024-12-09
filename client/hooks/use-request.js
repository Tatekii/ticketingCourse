import axios from "axios"
import { useState } from "react"
import Alert from "react-bootstrap/Alert"

export default function useRequest({ url, method, body, onSuccess }) {
	const [errors, setErrors] = useState(null)

	const doRequest = async (props = {}) => {
		try {
			setErrors(null)
			const response = await axios[method](url, { ...body, ...props })

			if (onSuccess) {
				console.log("onsuccess")

				onSuccess(response.data)
			}

			return response.data
		} catch (err) {
			console.log(err);
			
			if (err) {
				setErrors(
					<Alert variant="danger">
						<h4>Ooops....</h4>
						<ul className="my-0">
							{err.response?.data?.errors?.map((err, idx) => (
								<li key={idx}>{err.message}</li>
							))}
						</ul>
					</Alert>
				)
			}
		}
	}

	return { doRequest, errors }
}
