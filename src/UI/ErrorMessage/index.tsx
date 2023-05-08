import React from 'react'
import styles from './ErrorMessage.module.scss'
import { BiError } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'

type ErrorMessageProps = {
  message?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'Error' }) => {
  const { t } = useTranslation('auth')

  return (
    <div className={styles.container}>
      <BiError />
      <p className={styles.errorMessage}>{t(message)}</p>
    </div>
  )
}

export default ErrorMessage
