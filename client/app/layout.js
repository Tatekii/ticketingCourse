import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import buildClient from "../api/buildClient"
import Header from "../components/header"
import { UserProvider } from "../context/user"

async function RootLayout({ children }) {
	const client = await buildClient()

	const res = await client.get("/api/users/currentuser", { withCredentials: true })

	return (
		<html>
			<body>
				<UserProvider value={res.data.currentUser}>
					<Header />
					{children}
				</UserProvider>
			</body>
		</html>
	)
}

export default RootLayout
