import React from 'react'
import styles from './EditorButtons.module.scss'
import { useAppSelector } from '@/redux/hooks'
import { selectStatus } from '@/redux/features/AuthSlice/EditorSlice'

interface ISwitchButton {
  onClickHandler?: VoidFunction
  isSelected: boolean
  primaryText: string
  preamble?: string
}

export const SwitchButton: React.FC<ISwitchButton & React.HTMLProps<HTMLButtonElement>> = ({
  onClickHandler,
  isSelected,
  primaryText,
  preamble,
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={`${styles.switchBtn} ${!isSelected ? styles.select : ''}`}
    >
      <div>
        {primaryText && <span>{primaryText}</span>}
        {preamble && <span>{preamble}</span>}
      </div>
    </button>
  )
}

interface IStartButton {
  onClickHandler?: VoidFunction
}

export const StartButton: React.FC<IStartButton & React.HTMLProps<HTMLButtonElement>> = ({
  onClickHandler,
}) => {
  const status = useAppSelector(selectStatus)
  return (
    <button
      onClick={onClickHandler}
      className={status === 'idle' ? styles.btnStart : styles.btnStop}
    ></button>
  )
}
