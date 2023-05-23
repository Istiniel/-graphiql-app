import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './NavBar.module.scss'
import LocaleSelect from '../LocaleSelect'
import capitalizeWord from '@/helpers/capitalizeWord'

import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/clientApp'
import useAuth from '@/hooks/useAuth'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/features/AuthSlice/AuthSlice'
import classNames from 'classnames'
import { useRouter } from 'next/router'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const isEditorPage = useMemo(() => {
    return router.asPath.includes('editor')
  }, [router])

  const handleOpenBurger = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  const handleSignOut = useCallback(() => {
    signOut(auth)
    dispatch(setUser(null))
  }, [dispatch])

  const { t } = useTranslation('common')

  return (
    <nav
      className={classNames(
        { [styles.loading]: isLoading, [styles.loaded]: !isLoading },
        styles.navBar,
      )}
    >
      <Link href="/">
        <div className={styles.logo}></div>
      </Link>
      {user && (
        <div className={styles.welcomeContainer}>
          <h2>
            {t('welcome')} {user?.displayName}!
          </h2>
        </div>
      )}
      <div
        className={classNames(styles.burgerBtn, isOpen ? styles.open : '')}
        onClick={handleOpenBurger}
      >
        <span></span>
      </div>
      <div
        className={classNames(styles.overlay, isOpen ? styles.openMenu : '')}
        onClick={handleOpenBurger}
      ></div>
      <div className={classNames(styles.burgerMenu, isOpen ? styles.openMenu : '')}>
        <ul className={styles.navList}>
          {user && !isEditorPage && (
            <li>
              <Link href="/editor" className={styles.navLink}>
                {capitalizeWord(t('gotomain'))}
              </Link>
            </li>
          )}

          {!user ? (
            <li>
              <Link href="/auth" className={styles.navLink}>
                {`${t('in')} / ${t('up')}`}
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/auth" className={styles.navBtn} onClick={handleSignOut}>
                {capitalizeWord(t('out'))}
              </Link>
            </li>
          )}
        </ul>
        <div className={styles.languageContainer}>
          <LocaleSelect />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
