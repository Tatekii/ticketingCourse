import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"

function RootLayout({ children }) {
	return (
		<html>
			<body>{children}</body>
		</html>
	)
}

export default RootLayout
