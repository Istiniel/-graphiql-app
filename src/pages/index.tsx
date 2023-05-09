import styles from './MainPage.module.scss'
import Link from 'next/link'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction",
        "publishedYear": 1960
      },
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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WelcomePageProps {}

const WelcomePage: NextPage<WelcomePageProps> = () => {
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
                  <SyntaxHighlighter language="graphql">{query}</SyntaxHighlighter>
                  <SyntaxHighlighter language="graphql">{response}</SyntaxHighlighter>
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

export const getStaticProps: GetStaticProps<WelcomePageProps> = async (context) => {
  const user = auth.currentUser

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale as string, ['auth', 'common'])),
    },
  }
}
