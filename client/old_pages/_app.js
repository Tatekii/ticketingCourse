import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/header"
import buildClient from "../apis/buildClient"

function MyApp({ Component, pageProps }) {
	const { currentUser } = pageProps
	return (
		<div>
			<Header currentUser={currentUser} />
			<div className="container">
				<Component {...pageProps} currentUser={currentUser} />
			</div>
		</div>
	)
}

MyApp.getInitialProps = async () => {
		const { data } = await buildClient().get("/api/users/currentuser")
		// return data
}

export default MyApp
