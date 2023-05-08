import React from 'react'

import st from './Spinner.module.scss'
import classNames from 'classnames'

type SpinnerProps = {
  isSmall?: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ isSmall = false }) => {
  return <div className={classNames({ [st.small]: isSmall }, st.container)}></div>
}

export default Spinner
