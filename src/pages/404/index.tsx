import styles from './Page404.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function EditorPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <Meta title="Editor" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          <Wrapper>
            <div className={styles.container}>
              <h1 className={styles.heading}>{t('pageNotFound')}</h1>
            </div>
          </Wrapper>
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
