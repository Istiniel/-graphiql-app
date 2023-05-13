import styles from './EditorPage.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Wrapper from '@/components/Wrapper'
import { useAppSelector } from '@/redux/hooks'
import { selectUser } from '@/redux/features/AuthSlice/AuthSlice'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { StartButton, SwitchButton } from '@/UI/EditorButtons'
import { useDispatch } from 'react-redux'
import {
  getGqlValueThunk,
  selectEditorData,
  selectQuery,
  setQuery,
} from '@/redux/features/AuthSlice/EditorSlice'
import { AppDispatch } from '@/redux/store'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const QueryField = () => {
  const query = useAppSelector(selectQuery)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useDispatch()

  const handleTextFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const query = e.target.value

      dispatch(setQuery(query))
    },
    [dispatch],
  )

  // return <textarea value={query} onChange={handleTextFieldChange} />
  // return <SyntaxHighlighter language="graphql" onChange={handleTextFieldChange}>{query}</SyntaxHighlighter>

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => textareaRef.current?.focus()}
      onClick={() => textareaRef.current?.focus()}
      className={styles.editorTextAreaContainer}
    >
      <textarea
        className={styles.editorTextArea}
        ref={textareaRef}
        value={query}
        onChange={handleTextFieldChange}
      />
      <SyntaxHighlighter
        language="graphql"
        style={coldarkDark}
        customStyle={{
          flex: '1',
          background: 'transparent',
        }}
      >
        {query}
      </SyntaxHighlighter>
    </div>
  )
}

// const Results = () => {
//   const data = useAppSelector(selectEditorData)

//   return (
//     <>
//       {data &&
//         Object.keys(data)?.map((k) => {
//           const results = (data?.[k] as unknown as { results: Array<{ name: string }> })?.results

//           if (results?.length) {
//             return results.map((r) => {
//               const { name } = r

//               return <p key={name}>{name}</p>
//             })
//           }
//           return <></>
//         })}
//     </>
//   )
// }

const Results = () => {
  const data = useAppSelector(selectEditorData)

  return (
    <>
      {data && (
        <SyntaxHighlighter
          language="graphql"
          style={coldarkDark}
          customStyle={{
            flex: '1',
            background: 'transparent',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </SyntaxHighlighter>
      )}
    </>
  )
}

export default function EditorPage() {
  const router = useRouter()
  const user = useAppSelector(selectUser)
  const query = useAppSelector(selectQuery)
  const { t } = useTranslation('editor')
  const [isSelected, setIsSelected] = useState(false)
  const [isStart, setIsStart] = useState(true)
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleStartClick = useCallback(() => {
    setIsStart((prev) => !prev)

    if (query === null || typeof query !== 'string') return

    dispatch(getGqlValueThunk(query))
  }, [dispatch, query])

  useEffect(() => {
    //TODO correct redirection
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
                <div className={styles.docs}>
                  <button className={styles.docsBtn} onClick={() => setIsDocsOpen(!isDocsOpen)}>
                    {t('docs')}
                  </button>
                  {isDocsOpen && (
                    <div className={classNames(styles.section, styles.docsSection)}>
                      Documentation
                    </div>
                  )}
                </div>
                <div className={styles.block}>
                  <div className={styles.section}>
                    <QueryField />
                  </div>
                  <div className={classNames(styles.section, styles.headersSection)}>
                    <div className={styles.btnSection}>
                      <SwitchButton
                        onClickHandler={() => setIsSelected(!isSelected)}
                        isSelected={isSelected}
                        primaryText={t('variables')}
                      />
                      <SwitchButton
                        onClickHandler={() => setIsSelected(!isSelected)}
                        isSelected={!isSelected}
                        primaryText={t('headers')}
                      />
                    </div>
                    {isSelected ? (
                      <div className={styles.headers}>{t('headers')}</div>
                    ) : (
                      <div className={styles.variables}>{t('variables')}</div>
                    )}
                  </div>
                </div>
                <div className={styles.btnBlock}>
                  <StartButton onClickHandler={handleStartClick} isStart={isStart} />
                </div>
                <div className={styles.block}>
                  <div className={styles.section}>
                    <Results />
                  </div>
                </div>
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
