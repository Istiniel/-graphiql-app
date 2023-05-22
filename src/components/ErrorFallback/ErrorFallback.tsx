import React, { FC } from 'react'
import styles from './ErrorFallback.module.scss'

interface ErrorFallbackProps {
  error: { message: string }
  resetErrorBoundary: VoidFunction
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles.errorContainer}>
      <h3>An error occurred: </h3>
      <p>{error?.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )
}

export default ErrorFallback
