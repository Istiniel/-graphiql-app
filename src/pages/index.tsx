import styles from './MainPage.module.scss'
import Link from 'next/link'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import coldarkDark from 'react-syntax-highlighter/dist/cjs/styles/prism/coldark-dark'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Wrapper from '@/components/Wrapper'
import { auth } from '../firebase/clientApp'
import { GetStaticProps, NextPage } from 'next'

const query = `query Library {
  books {
    title
    author
    genre
    publishedYear
  }
}`

const response = `{
  "data": {
    "books": [
      {
        "title": "1984",
        "author": "George Orwell",
        "genre": "Fiction",
        "publishedYear": 1949
      }
    ]
  }
}
`

const WelcomePage: NextPage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Meta title="Welcome" description="GraphQL editor" />
      <Layout>
        <main className={styles.main}>
          <section className={styles.about}>
            <Wrapper>
              <div className={styles.container}>
                <div className={styles.welcomeInfo}>
                  <h1>{t('aboutTitle')}</h1>
                  <span>{t('aboutParagraph')}</span>
                  <Link href="/auth" className={styles.navBtn}>
                    {t('getstarted')}
                  </Link>
                </div>
                <div className={styles.codeExample}>
                  <span className={styles.codeTitle}>{t('codeExample')}</span>
                  <div className={styles.codeContainer}>
                    <SyntaxHighlighter language="graphql" style={coldarkDark}>
                      {query}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="json" style={coldarkDark}>
                      {response}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </Wrapper>
          </section>
        </main>
      </Layout>
    </>
  )
}

export default WelcomePage

export const getStaticProps: GetStaticProps = async (context) => {
  const user = auth.currentUser

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale as string, ['auth', 'common'])),
    },
  }
}
