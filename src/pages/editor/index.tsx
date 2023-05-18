import React from 'react'
import styles from './EditorPage.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Wrapper from '@/components/Wrapper'
import { useAppSelector } from '@/redux/hooks'
import { selectUser } from '@/redux/features/AuthSlice/AuthSlice'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { StartButton, SwitchButton } from '@/UI/EditorButtons'
import { useDispatch } from 'react-redux'
import { getGqlValueThunk } from '@/redux/features/AuthSlice/EditorSlice'
import { AppDispatch } from '@/redux/store'
import QueryField from '@/components/QueryField'
import ResponseResult from '@/components/ResponseResult'

export default function EditorPage() {
  const router = useRouter()
  const user = useAppSelector(selectUser)
  const { t } = useTranslation('editor')
  const [isSelected, setIsSelected] = useState(false)
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleStartClick = useCallback(() => {
    dispatch(getGqlValueThunk())
  }, [dispatch])

  const handleToggleDocs = useCallback(() => {
    setIsDocsOpen((prevState) => !prevState)
  }, [])

  const handleToggleVarsHeaders = useCallback(() => {
    setIsSelected((prevState) => !prevState)
  }, [])

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
        <main className={styles.main}>
          <Wrapper>
            <div className={styles.container}>
              <div className={styles.docs}>
                <div className={styles.docsBtn} onClick={handleToggleDocs}>
                  {t('docs')}
                </div>
                {isDocsOpen && (
                  <div className={classNames(styles.section, styles.docsSection)}>
                    Documentation
                  </div>
                )}
              </div>
              <div className={styles.block}>
                <div className={styles.section}>
                  <QueryField fieldType="query" />
                </div>
                <div className={classNames(styles.section, styles.headersSection)}>
                  <div className={styles.btnSection}>
                    <SwitchButton
                      onClickHandler={handleToggleVarsHeaders}
                      isSelected={isSelected}
                      primaryText={t('variables')}
                    />
                    <SwitchButton
                      onClickHandler={handleToggleVarsHeaders}
                      isSelected={!isSelected}
                      primaryText={t('headers')}
                    />
                  </div>
                  <div className={styles.optionsEditor}>
                    {isSelected ? (
                      <QueryField fieldType="headers" />
                    ) : (
                      <QueryField fieldType="variables" />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.btnBlock}>
                <StartButton onClickHandler={handleStartClick} />
              </div>
              <div className={styles.block}>
                <div className={styles.section}>
                  <ResponseResult />
                </div>
              </div>
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
      ...(await serverSideTranslations(locale, ['editor', 'common'])),
    },
  }
}
