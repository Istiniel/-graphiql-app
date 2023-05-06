import styles from '../styles/Main.module.scss'
import Link from 'next/link'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
  return (
    <>
      <Meta title="Welcome" description="GraphQL editor" />
      <Layout>
        <main className={`${styles.main} ${styles.welcomePage}`}>
          <div className={styles.welcomeInfo}>
            <h1>Welcome to our GraphQL-powered app!</h1>
            <span>{welcomeText}</span>
            <button className={styles.navBtn}>
              <Link href="/auth" className={styles.navLink}>
                Get started
              </Link>
            </button>
          </div>
          <div className={styles.codeExample}>
            <span className="codeTitle">Code example:</span>
            <SyntaxHighlighter language="graphql" style={coldarkDark}>
              {query}
            </SyntaxHighlighter>
            <SyntaxHighlighter language="graphql" style={coldarkDark}>
              {response}
            </SyntaxHighlighter>
          </div>
        </main>
      </Layout>
    </>
  )
}
