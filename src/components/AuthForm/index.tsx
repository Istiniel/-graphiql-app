import React, { useState } from 'react'
import styles from './AuthForm.module.scss'
import classNames from 'classnames'
import { AiOutlineGithub } from 'react-icons/ai'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useTranslation } from 'next-i18next'
import { useAppDispatch } from '@/redux/hooks'

import { auth } from '@/firebase/clientApp'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import { setUser } from '../../redux/features/AuthSlice/AuthSlice'

const provider = new GithubAuthProvider()

const AuthForm = () => {
  const dispatch = useAppDispatch()

  const [formType, setFormType] = useState<'in' | 'up'>('in')
  const { t } = useTranslation('auth')
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <span
          className={classNames({ [styles.active]: formType !== 'in' })}
          onClick={() => setFormType('in')}
        >
          {t('in')}
        </span>
        {` / `}
        <span
          className={classNames({ [styles.active]: formType !== 'up' })}
          onClick={() => setFormType('up')}
        >
          {t('up')}
        </span>
      </h2>
      {formType === 'in' ? <SignInForm /> : <SignUpForm />}
      <div className={styles.oauthContainer}>
        <AiOutlineGithub
          className={styles.social}
          onClick={() =>
            signInWithPopup(auth, provider)
              .then((result) => {
                const user = result.user
                dispatch(setUser(user))
                router.push('/editor')
              })
              .catch((error) => {
                console.warn(error)
              })
          }
        />
      </div>
    </div>
  )
}

export default AuthForm
