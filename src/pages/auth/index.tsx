import styles from './AuthPage.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
// import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LocaleSelect from '@/components/LocaleSelect'
import AuthForm from './../../components/AuthForm/index'

export default function AuthPage() {
  // const { t } = useTranslation('auth')

  return (
    <>
      <Meta title="Auth" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          <LocaleSelect />
          <section className={styles.authSection}>
            <div className="wrapper">
              <div className={styles.container}>
                {/* <h1 className={styles.heading}>{t('h1')}</h1> */}
                <AuthForm />
              </div>
            </div>
          </section>
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
