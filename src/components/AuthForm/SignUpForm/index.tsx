import React from 'react'
import styles from './SignUpForm.module.scss'
import Button from '@/UI/Button'
import { useForm } from 'react-hook-form'
import AuthInput from '../AuthInput'
import AuthErrorMessage from '../AuthErrorMessage'
import { useTranslation } from 'next-i18next'

const SignInForm = () => {
  const onSubmit = (data: object) => {
    console.log(JSON.stringify(data))
    reset()
  }

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const password = watch('password')
  const { t } = useTranslation('auth')

  return (
    <form action="#" className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        control={control}
        name="login"
        type="login"
        rules={{
          required: 'nologinl',
          pattern: {
            value: /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
            message: 'wrongInput',
          },
          minLength: {
            value: 5,
            message: 'min',
          },
        }}
      />
      <AuthInput
        control={control}
        name="email"
        type="email"
        rules={{
          required: 'noemail',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'wrongEmail',
          },
        }}
      />
      <AuthInput
        control={control}
        name="password"
        type="password"
        rules={{
          required: 'nopass',
          minLength: {
            value: 5,
            message: 'min',
          },
        }}
      />
      <AuthInput
        control={control}
        name="confirmpass"
        type="password"
        rules={{
          required: 'repeatPassword',
          minLength: {
            value: 5,
            message: 'min',
          },
          validate: (value: string) => {
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
        <AuthErrorMessage isVisible={!!errors.login} message={`${errors.login?.message}`} />
        <AuthErrorMessage isVisible={!!errors.email} message={`${errors.email?.message}`} />
        <AuthErrorMessage isVisible={!!errors.password} message={`${errors.password?.message}`} />
        <AuthErrorMessage
          isVisible={!!errors.confirmpass}
          message={`${errors.confirmpass?.message}`}
        />
      </aside>
    </form>
  )
}

export default SignInForm
