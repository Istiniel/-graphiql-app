import React from 'react'
import styles from './ErrorMessage.module.scss'
import { BiError } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'
import { AdditionalValue } from '@/components/AuthForm/SignInForm'

type ErrorMessageProps = {
  message?: string
  additionalMessage?: Partial<AdditionalValue>
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'Error', additionalMessage }) => {
  const { t } = useTranslation('auth')
  const value = additionalMessage?.value
  const text = additionalMessage?.message

  return (
    <div className={styles.container}>
      <BiError />
      <p className={styles.errorMessage}>
        <>
          {t(message)}
          {text !== undefined && text === message && value !== undefined && ` ${value}`}
        </>
      </p>
    </div>
  )
}

export default ErrorMessage
