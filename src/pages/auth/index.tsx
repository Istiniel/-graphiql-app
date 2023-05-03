import styles from '@/styles/Home.module.css'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'

export default function AuthPage() {
  return (
    <>
      <Meta title="Auth" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          <div className={styles.description}>
            <h1>Sign in / Sign up</h1>
          </div>
        </main>
      </Layout>
    </>
  )
}
