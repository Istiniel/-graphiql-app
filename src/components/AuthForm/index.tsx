import React, { useState } from 'react'
import styles from './AuthForm.module.scss'
import classNames from 'classnames'
import { BsGoogle } from 'react-icons/bs'
import { AiOutlineGithub } from 'react-icons/ai'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useTranslation } from 'next-i18next'

const AuthForm = () => {
  const [formType, setFormType] = useState<'in' | 'up'>('in')
  const { t } = useTranslation('auth')

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
        <BsGoogle className={styles.social} />
        <AiOutlineGithub className={styles.social} />
      </div>
    </div>
  )
}

export default AuthForm
