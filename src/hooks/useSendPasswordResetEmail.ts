import {
  ActionCodeSettings,
  Auth,
  AuthError,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
} from 'firebase/auth'
import { useCallback, useState } from 'react'

export type SendPasswordResetEmailHook = [
  (email: string, actionCodeSettings?: ActionCodeSettings) => Promise<boolean>,
  boolean,
  AuthError | Error | undefined,
]

const useSendPasswordResetEmail = (auth: Auth): SendPasswordResetEmailHook => {
  const [error, setError] = useState<AuthError>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendPasswordResetEmail = useCallback(
    async (email: string, actionCodeSettings?: ActionCodeSettings) => {
      setIsLoading(true)
      setError(undefined)
      try {
        await fbSendPasswordResetEmail(auth, email, actionCodeSettings)
        return true
      } catch (err) {
        setError(err as AuthError)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [auth],
  )

  return [sendPasswordResetEmail, isLoading, error]
}

export default useSendPasswordResetEmail
