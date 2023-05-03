import Link from 'next/link'
import React from 'react'
import styles from './NavBar.module.scss'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/auth" className={styles.navLink}>
            Sign in | Sign up
          </Link>
        </li>
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
