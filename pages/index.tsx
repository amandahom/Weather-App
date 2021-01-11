import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Main from '../assets/components/main'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Localhost3000</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <Main />
      </main>

      <footer className={styles.footer}>
        <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
          Powered by OpenWeather
        </a>
      </footer>
    </div>
  )
}
