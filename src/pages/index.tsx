import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function WelcomePage() {
  return (
    <>
      <Meta title="Welcome" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main} ${inter.className}`}>
          <div className={styles.description}>
            <h1>Welcome page</h1>
          </div>
        </main>
      </Layout>
    </>
  )
}
