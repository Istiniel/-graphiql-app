import React from 'react'
import styles from './EditorPage.module.scss'
import Meta from '@/components/Meta'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Wrapper from '@/components/Wrapper'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { StartButton, SwitchButton } from '@/UI/EditorButtons'
import { useDispatch } from 'react-redux'
import { getGqlValueThunk } from '@/redux/features/AuthSlice/EditorSlice'
import { AppDispatch } from '@/redux/store'
import QueryField from '@/components/QueryField'
import ResponseResult from '@/components/ResponseResult'
import Spinner from '@/UI/Spinner'
import dynamic from 'next/dynamic'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback'

const Schema = dynamic(() => import('@/components/Schema'), {
  loading: () => <Spinner />,
})
import useAuth from '@/hooks/useAuth'

export default function EditorPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
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
    if (!user && !isLoading) {
      router.push('/')
    }
  }, [user, router, isLoading])

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
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <Schema />
                    </ErrorBoundary>
                  </div>
                )}
              </div>
              <div className={styles.block}>
                <div className={styles.section}>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <QueryField fieldType="query" />
                  </ErrorBoundary>
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
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <QueryField fieldType="headers" />
                      </ErrorBoundary>
                    ) : (
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <QueryField fieldType="variables" />
                      </ErrorBoundary>
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
