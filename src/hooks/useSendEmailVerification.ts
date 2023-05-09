import { Auth, AuthError, sendEmailVerification as fbSendEmailVerification } from 'firebase/auth'
import { useCallback, useState } from 'react'

export type SendEmailVerificationHook = [
  () => Promise<boolean>,
  boolean,
  AuthError | Error | undefined,
]

const useSendEmailVerification = (auth: Auth): SendEmailVerificationHook => {
  const [error, setError] = useState<AuthError>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendEmailVerification = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)
    try {
      if (auth.currentUser) {
        await fbSendEmailVerification(auth.currentUser)
        return true
      } else {
        throw new Error('No user is logged in')
      }
    } catch (err) {
      setError(err as AuthError)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [auth])

  return [sendEmailVerification, isLoading, error]
}

export default useSendEmailVerification
