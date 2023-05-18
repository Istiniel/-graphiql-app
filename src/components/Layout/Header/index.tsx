import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames'

const Header = () => {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={classNames(styles.header, sticky ? styles.sticky : '')}>
      <div className="wrapper">
        <div className={styles.container}>
          <NavBar />
        </div>
      </div>
    </header>
  )
}

export default Header
