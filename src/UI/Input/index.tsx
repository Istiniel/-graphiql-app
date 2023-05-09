import React, { HTMLInputTypeAttribute, useState } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

export interface InputProps {
  placeholder: string
  aside?: React.ReactNode
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string | number
  invalid?: boolean
  type?: HTMLInputTypeAttribute
}

const Input: React.FC<InputProps> = ({
  placeholder,
  aside,
  onChange,
  value,
  invalid,
  type = 'text',
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const { t } = useTranslation('auth')

  return (
    <div
      className={classNames(
        { [styles.active]: value || isFocused, [styles.invalid]: invalid },
        styles.form,
      )}
    >
      <label className={styles.label}>
        <input
          value={value}
          className={styles.searchBar}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          type={type}
        />
        <span className={classNames({ [styles.inputFilled]: value }, styles.placeholder)}>
          {t(placeholder.toLowerCase())}
        </span>
      </label>
      {aside && <div className={styles.iconContainer}>{aside}</div>}
    </div>
  )
}

export default Input
