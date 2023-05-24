import React, { useState } from 'react'
import styles from './SignInForm.module.scss'
import Button from '@/UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import AuthInput from '../AuthInput'
import AuthErrorMessage from '../AuthErrorMessage'
import { useTranslation } from 'next-i18next'
import { signIn } from '@/firebase/clientApp'
import { useRouter } from 'next/router'

export interface FormInValues {
  email: string
  password: string
}

const MIN_PASS = 8

export interface AdditionalValue {
  message: string
  value: number | string
}

const messagesWithValue = {
  message: 'min',
  value: MIN_PASS,
}

const SignInForm = () => {
  const router = useRouter()
  const [signinError, setSigninError] = useState<string>('')

  const onSubmit: SubmitHandler<FormInValues> = async (data) => {
    const { email, password } = data

    const { error } = await signIn(email, password)

    if (error) {
      setSigninError('Неверный пароль')
      return
    } else {
      reset()
      router.push('/editor')
    }
  }

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<FormInValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { t } = useTranslation('auth')

  return (
    <form action="#" className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <AuthInput<FormInValues>
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
      <AuthInput<FormInValues>
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
      <Button primaryText={t('in')} disabled={!isValid} type="submit" />
      <aside className={styles.errors}>
        <AuthErrorMessage isVisible={!!signinError} message={`${signinError}`} />
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
      </aside>
    </form>
  )
}

export default SignInForm
