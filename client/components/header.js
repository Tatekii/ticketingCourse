import Link from "next/link"

export default function Header({ currentUser }) {
	
	return (
		<header>
			<nav className="navbar navbar-light bg-light">
				<Link href="/">
					<span className="navbar-brand">Logo</span>
				</Link>
				<div className="d-flex justify-content-end">
					<ul className="nav d-flex align-items-center">
						{[
							!currentUser && { label: "Sign Up", href: "/auth/signup" },
							!currentUser && { label: "Sign In", href: "/auth/signin" },
							currentUser && { label: "Sell Tickets", href: "tickets/new" },
							currentUser && { label: "My Orders", href: "/orders" },
							currentUser && { label: "Sign Out", href: "/auth/signout" },
						]
							.filter((linkConfig) => !!linkConfig)
							.map(({ label, href }) => {
								return (
									<li key={href} className="nav-item">
										<Link href={href}>
											<span className="nav-link">{label}</span>
										</Link>
									</li>
								)
							})}
					</ul>
				</div>
			</nav>
		</header>
	)
}
