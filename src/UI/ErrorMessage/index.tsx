import React from 'react'
import styles from './ErrorMessage.module.scss'
import { BiError } from 'react-icons/bi'

type ErrorMessageProps = {
  message?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'Error' }) => {
  return (
    <div className={styles.container}>
      <BiError />
      <p className={styles.errorMessage}>{message}</p>
    </div>
  )
}

export default ErrorMessage
