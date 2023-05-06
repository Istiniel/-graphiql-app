import { Inter } from 'next/font/google'
import { useTranslation } from 'next-i18next'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function WelcomePage() {
  const { t } = useTranslation('common')

  return (
    <>
      <Meta title="Welcome" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main} ${inter.className}`}>
          <div className={styles.description}>
            <h1>{t('welcome')}</h1>
          </div>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
