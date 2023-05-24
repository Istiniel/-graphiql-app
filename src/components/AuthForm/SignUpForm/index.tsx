import React, { useState } from 'react'
import styles from './SignUpForm.module.scss'
import Button from '@/UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import AuthInput from '../AuthInput'
import AuthErrorMessage from '../AuthErrorMessage'
import { useTranslation } from 'next-i18next'
import { auth, signUp } from '@/firebase/clientApp'
import { useRouter } from 'next/router'
import useSendEmailVerification from '@/hooks/useSendEmailVerification'

interface FormUpValues {
  email: string
  password: string
  confirmpass: string
}

export interface AdditionalValue {
  message: string
  value: number | string
}

const MIN_PASS = 8

const messagesWithValue = {
  message: 'min',
  value: MIN_PASS,
}

const SignInForm = () => {
  const router = useRouter()
  const [signUpError, setSignUpError] = useState<string>('')
  const [sendEmailVerification, ,] = useSendEmailVerification(auth)

  const onSubmit: SubmitHandler<FormUpValues> = async (data) => {
    const { email, password } = data
    const { error } = await signUp(email, password)
    await sendEmailVerification()

    if (error) {
      setSignUpError('Ошибка регистрации')
      return
    } else {
      reset()
      router.push('/editor')
    }
  }

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<FormUpValues>({
    mode: 'onChange',

    defaultValues: {
      email: '',
      password: '',
      confirmpass: '',
    },
  })

  const password = watch('password')
  const { t } = useTranslation('auth')

  return (
    <form action="#" className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <AuthInput<FormUpValues>
        control={control}
        name="email"
        type="email"
        rules={{
          required: 'noemail',
          minLength: {
            value: messagesWithValue.value,
            message: messagesWithValue.message,
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
            message: 'wrongEmail',
          },
        }}
      />
      <AuthInput<FormUpValues>
        control={control}
        name="password"
        type="password"
        rules={{
          required: 'nopass',
          minLength: {
            value: messagesWithValue.value,
            message: messagesWithValue.message,
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message: 'wrongPass',
          },
        }}
      />
      <AuthInput<FormUpValues>
        control={control}
        name="confirmpass"
        type="password"
        rules={{
          required: 'repeatPassword',
          minLength: {
            value: messagesWithValue.value,
            message: messagesWithValue.message,
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message: 'wrongPass',
          },
          validate: (value) => {
            if (value === password) {
              return true
            } else {
              return 'passwordNotMatch'
            }
          },
        }}
      />
      <Button primaryText={t('up')} disabled={!isValid} type="submit" />
      <aside className={styles.errors}>
        <AuthErrorMessage isVisible={!!signUpError} message={`${signUpError}`} />
        <AuthErrorMessage
          isVisible={!!errors.email}
          message={`${errors.email?.message}`}
          additionalMessage={messagesWithValue}
        />
        <AuthErrorMessage
          isVisible={!!errors.password}
          message={`${errors.password?.message}`}
          additionalMessage={messagesWithValue}
        />
        <AuthErrorMessage
          isVisible={!!errors.confirmpass}
          message={`${errors.confirmpass?.message}`}
          additionalMessage={messagesWithValue}
        />
      </aside>
    </form>
  )
}

export default SignInForm
