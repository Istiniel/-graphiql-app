import React, { FC } from 'react'
import styles from './ErrorFallback.module.scss'
import { useTranslation } from 'next-i18next'

interface ErrorFallbackProps {
  error: { message: string }
  resetErrorBoundary: VoidFunction
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.errorContainer}>
      <h3>{t('errorMessage')}</h3>
      <p>{error?.message}</p>
      <button onClick={resetErrorBoundary}>{t('retry')}</button>
    </div>
  )
}

export default ErrorFallback
