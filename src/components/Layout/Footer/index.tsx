import Link from 'next/link'
import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Link href="https://github.com/AnAtoliyAK" className={styles.navLink}>
            <div className={styles.ghLogo}></div> AnAtoliyAK
          </Link>
        </li>
        <li>
          <Link href="https://github.com/Istiniel" className={styles.navLink}>
            <div className={styles.ghLogo}></div> Istiniel
          </Link>
        </li>
        <li>
          <Link href="https://github.com/aliceinapple" className={styles.navLink}>
            <div className={styles.ghLogo}></div> aliceinapple
          </Link>
        </li>
      </ul>
      <small>Created in 2023</small>
      <div className={styles.rsLogo}>RS School</div>
    </footer>
  )
}

export default Footer
