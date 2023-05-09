import styles from './AuthPage.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AuthForm from '@/components/AuthForm/index'
import Wrapper from '@/components/Wrapper'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/redux/hooks'
import { selectUser } from '@/redux/features/AuthSlice/AuthSlice'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthPageProps {}

const AuthPage: NextPage<AuthPageProps> = () => {
  const user = useAppSelector(selectUser)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <>
      <Meta title="Auth" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main}`}>
          <section className={styles.authSection}>
            <Wrapper>
              <div className={styles.container}>
                <AuthForm />
              </div>
            </Wrapper>
          </section>
        </main>
      </Layout>
    </>
  )
}

export default AuthPage

export const getStaticProps: GetStaticProps<AuthPageProps> = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ['auth', 'common'])),
    },
  }
}
