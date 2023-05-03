import styles from '@/styles/Home.module.css'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'

export default function EditorPage() {
  return (
    <>
      <Meta title="Editor" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          <div className={styles.description}>
            <h1>Editor</h1>
          </div>
        </main>
      </Layout>
    </>
  )
}
