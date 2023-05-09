import styles from './EditorPage.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Wrapper from '@/components/Wrapper'
import { useAppSelector } from '@/redux/hooks'
import { selectUser } from '@/redux/features/AuthSlice/AuthSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { StartButton, SwitchButton } from '@/UI/EditorButtons'

export default function EditorPage() {
  const router = useRouter()
  const user = useAppSelector(selectUser)
  const { t } = useTranslation('editor')
  const [isSelected, setIsSelected] = useState(false)
  const [isStart, setIsStart] = useState(true)
  const [isDocsOpen, setIsDocsOpen] = useState(false)

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
                  <div className={styles.section}></div>
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
                  <StartButton onClickHandler={() => setIsStart(!isStart)} isStart={isStart} />
                </div>
                <div className={styles.block}>
                  <div className={styles.section}></div>
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
