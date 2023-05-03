import Link from 'next/link'
import React, { useState } from 'react'
import styles from './NavBar.module.scss'

const NavBar = () => {
  const [isAuth] = useState(false)

  return (
    <nav>
      <ul>
        {isAuth && (
          <li>
            <Link href="/" className={styles.navLink}>
              Go to the main Page
            </Link>
          </li>
        )}
        {!isAuth ? (
          <li>
            <Link href="/auth" className={styles.navLink}>
              Sign in | Sign up
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/auth" className={styles.navLink}>
              Sign out
            </Link>
          </li>
        )}
        <li>
          <Link href="/editor" className={styles.navLink}>
            Editor
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
