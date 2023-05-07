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
          required: 'Не указан логин',
          pattern: {
            value: /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
            message: 'Недопустимые символы',
          },
          minLength: {
            value: 5,
            message: 'Минимум 5 символов',
          },
        }}
      />
      <AuthInput
        control={control}
        name="email"
        type="email"
        rules={{
          required: 'Не указан e-mail',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Неправильно указан e-mail.',
          },
        }}
      />
      <AuthInput
        control={control}
        name="password"
        type="password"
        rules={{
          required: t('nopass') as string,
          minLength: {
            value: 5,
            message: 'Минимум 5 символов',
          },
        }}
      />
      <AuthInput
        control={control}
        name="confirm password"
        type="password"
        rules={{
          required: 'Введите пароль снова',
          minLength: {
            value: 5,
            message: 'Минимум 5 символов',
          },
          validate: (value: string) => {
            if (value === password) {
              return true
            } else {
              return 'Пароли не совпадают.'
            }
          },
        }}
      />
      <Button primaryText="Sing Up" disabled={!isValid} />
      <aside className={styles.errors}>
        <AuthErrorMessage isVisible={!!errors.login} message={`${errors.login?.message}`} />
        <AuthErrorMessage isVisible={!!errors.email} message={`${errors.email?.message}`} />
        <AuthErrorMessage isVisible={!!errors.password} message={`${errors.password?.message}`} />
        <AuthErrorMessage
          isVisible={!!errors['confirm password']}
          message={`${errors['confirm password']?.message}`}
        />
      </aside>
    </form>
  )
}

export default SignInForm
