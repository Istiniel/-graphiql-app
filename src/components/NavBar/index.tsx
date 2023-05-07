import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './NavBar.module.scss'

const NavBar = () => {
  const [isAuth] = useState(false)
  const { t } = useTranslation('common')

  return (
    <nav className={styles.navBar}>
      <Link href="/">
        <div className={styles.logo}></div>
      </Link>
      <ul>
        {isAuth && (
          <li>
            <Link href="/" className={styles.navLink}>
              Go to the main Page
            </Link>
          </li>
        )}
        <li>
          <Link href="/editor" className={styles.navLink}>
            {t('editor')}
          </Link>
        </li>
      </ul>
      {!isAuth ? (
        <li>
          <Link href="/auth" className={styles.navLink}>
            Sign in | Sign up
          </Link>
        </li>
      ) : (
        <li>
          <Link href="/auth">
            <button className={styles.navBtn}>Sign out</button>
          </Link>
        </li>
      )}
    </nav>
  )
}

export default NavBar
