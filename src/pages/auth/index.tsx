import styles from '@/styles/Home.module.css'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function AuthPage() {
  const { t } = useTranslation('auth')

  return (
    <>
      <Meta title="Auth" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          <div className={styles.description}>
            <h1>{t('h1')}</h1>
          </div>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth', 'common'])),
    },
  }
}
