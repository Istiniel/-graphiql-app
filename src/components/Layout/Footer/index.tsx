import Link from 'next/link'
import React from 'react'
import styles from './Footer.module.scss'
import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <div className={styles.container}>
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
          <small>{t('createdIn')}</small>
          <Link href="https://rs.school/react/">
            <div className={styles.rsLogo}></div>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
