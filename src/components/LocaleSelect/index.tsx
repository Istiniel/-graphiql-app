import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './LocaleSelect.module.scss'

const LocaleSelect = () => {
  const { locale, locales } = useRouter()

  return (
    <div className={styles.container}>
      {locales?.map((l) => {
        return (
          <p key={l} className={[styles.navLink, locale === l ? styles.active : ''].join(' ')}>
            <Link href="" locale={l}>
              {l}
            </Link>
          </p>
        )
      })}
    </div>
  )
}

export default LocaleSelect
