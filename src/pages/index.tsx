import styles from './MainPage.module.scss'
import Link from 'next/link'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LocaleSelect from '../components/LocaleSelect'

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

const welcomeText = `This app makes it easy to interact with the API and get the data you need. With GraphQL, you can precisely specify what data you want, making your queries more efficient and reducing the amount of data sent over the wire. Try our app now and start building amazing things with GraphQL!`

export default function WelcomePage() {
  const { t } = useTranslation('common')

  return (
    <>
      <Meta title="Welcome" description="GraphQL editor" />
      <Layout>
        <main className={styles.main}>
          <LocaleSelect />
          <section className={styles.about}>
            <div className="wrapper">
              <div className={styles.container}>
                <div className={styles.welcomeInfo}>
                  <h1>{t('welcome')} to our GraphQL-powered app!</h1>
                  <span>{welcomeText}</span>
                  <Link href="/auth">
                    <button className={styles.navBtn}>Get started</button>
                  </Link>
                </div>
                <div className={styles.codeExample}>
                  <span className={styles.codeTitle}>Code example:</span>
                  <SyntaxHighlighter language="graphql">{query}</SyntaxHighlighter>
                  <SyntaxHighlighter language="graphql">{response}</SyntaxHighlighter>
                </div>
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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
