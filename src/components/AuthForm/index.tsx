import React, { useCallback, useState } from 'react'
import styles from './AuthForm.module.scss'
import classNames from 'classnames'
import { AiOutlineGithub } from 'react-icons/ai'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useTranslation } from 'next-i18next'
import { useAppDispatch } from '@/redux/hooks'

import { auth } from '@/firebase/clientApp'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { setUser } from '@/redux/features/AuthSlice/AuthSlice'

const provider = new GithubAuthProvider()

enum FormTypes {
  IN = 'in', // the same values should be in public/locales/auth
  UP = 'up',
}

const AuthForm = () => {
  const dispatch = useAppDispatch()

  const [formType, setFormType] = useState<FormTypes>(FormTypes.IN)
  const { t } = useTranslation('auth')

  const handleGithubAuthClick = useCallback(() => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user

        dispatch(setUser(user))
      })
      .catch((error) => {
        console.warn(error)
      })
  }, [dispatch])

  const handleInUpClick = useCallback(
    (val: FormTypes) => () => {
      setFormType(val)
    },
    [],
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <span
          className={classNames({ [styles.active]: formType !== FormTypes.IN })}
          onClick={handleInUpClick(FormTypes.IN)}
        >
          {t(FormTypes.IN)}
        </span>
        {` / `}
        <span
          className={classNames({ [styles.active]: formType !== FormTypes.UP })}
          onClick={handleInUpClick(FormTypes.UP)}
        >
          {t(FormTypes.UP)}
        </span>
      </h2>
      {formType === FormTypes.IN ? <SignInForm /> : <SignUpForm />}
      <div className={styles.oauthContainer}>
        <AiOutlineGithub className={styles.social} onClick={handleGithubAuthClick} />
      </div>
    </div>
  )
}

export default AuthForm
