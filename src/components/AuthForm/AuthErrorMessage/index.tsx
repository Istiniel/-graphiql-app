import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ErrorMessage from '@/UI/ErrorMessage'
import { AdditionalValue } from '../SignInForm'

type AuthErrorMessageProps = {
  isVisible: boolean
  message: string
  additionalMessage?: Partial<AdditionalValue>
}

const AuthErrorMessage: React.FC<AuthErrorMessageProps> = ({
  isVisible,
  message,
  additionalMessage,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          animate={{ transform: 'translateY(0px)', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ErrorMessage message={message} additionalMessage={additionalMessage} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthErrorMessage
