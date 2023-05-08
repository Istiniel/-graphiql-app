import styles from './EditorPage.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Wrapper from '@/components/Wrapper'
import { useAppSelector } from '@/redux/hooks'
import { selectUser } from '@/redux/features/AuthSlice/AuthSlice'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function EditorPage() {
  const router = useRouter()
  const user = useAppSelector(selectUser)
  const { t: translation } = useTranslation('editor')

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <>
      <Meta title="Editor" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          {user && (
            <Wrapper>
              <div className={styles.container}>
                <h1>{translation('h1')}</h1>
              </div>
            </Wrapper>
          )}
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
