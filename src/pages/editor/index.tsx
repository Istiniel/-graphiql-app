import styles from '@/styles/Home.module.css'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function EditorPage() {
  const { t: translation } = useTranslation('editor')

  return (
    <>
      <Meta title="Editor" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          <div className={styles.description}>
            <h1>{translation('h1')}</h1>
          </div>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['editor', 'common'])),
    },
  }
}
