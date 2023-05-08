import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface IButton {
  onClickHandler?: () => void
  primaryText: string
  preamble?: string
  disabled?: boolean
}

const Button: React.FC<IButton & React.HTMLProps<HTMLButtonElement>> = ({
  onClickHandler,
  primaryText,
  preamble,
  disabled = false,
}) => {
  return (
    <button disabled={disabled} onClick={onClickHandler} className={classNames(styles.primary)}>
      <div>
        {primaryText && <span>{primaryText}</span>}
        {preamble && <span>{preamble}</span>}
      </div>
    </button>
  )
}

export default Button
