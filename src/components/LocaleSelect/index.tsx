import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './LocaleSelect.module.scss'
import classNames from 'classnames'

const LocaleSelect = () => {
  const { locale, locales } = useRouter()

  return (
    <section className={styles.container}>
      <div className="wrapper">
        {locales?.map((l) => {
          return (
            <p key={l} className={classNames({ [styles.active]: locale === l }, styles.navLink)}>
              <Link href="" locale={l}>
                {l}
              </Link>
            </p>
          )
        })}
      </div>
    </section>
  )
}

export default LocaleSelect
