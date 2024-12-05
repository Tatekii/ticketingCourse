import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Next in Docker</title>
			</Head>

			<main className={styles.main}>
				Hello shit
			</main>

			<footer className={styles.footer}></footer>
		</div>
	)
}
