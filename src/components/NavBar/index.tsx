import Link from 'next/link'
import React, { useState } from 'react'
import styles from './NavBar.module.scss'

const NavBar = () => {
  const [isAuth] = useState(true)

  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.navLink}>
          Logo
        </Link>
      </div>
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
            Editor
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
          <button className={styles.navBtn}>
            <Link href="/auth" className={styles.navLink}>
              Sign out
            </Link>
          </button>
        </li>
      )}
    </nav>
  )
}

export default NavBar
