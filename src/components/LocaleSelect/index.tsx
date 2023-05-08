import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './LocaleSelect.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const LocaleSelect = () => {
  const { locale, locales } = useRouter()
  const { t } = useTranslation('common')

  return (
    <div className={styles.container}>
      {locales?.map((l) => {
        return (
          <p key={l} className={classNames({ [styles.active]: locale === l }, styles.navLink)}>
            <Link href="" locale={l}>
              {t(l)}
            </Link>
          </p>
        )
      })}
    </div>
  )
}

export default LocaleSelect
