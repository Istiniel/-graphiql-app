import React, { ReactNode } from 'react'
import NavBar from '../NavBar'
import LocaleSelect from '../LocaleSelect'
// import dynamic from 'next/dynamic'
// const MediaQuery = dynamic(() => import('react-responsive'), {
//   ssr: false,import NavBar from './../NavBar/index';
// })

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <MediaQuery minWidth={1025}>
        <Header />
      </MediaQuery> */}

      <NavBar />
      <LocaleSelect />
      {children}
    </>
  )
}

export default Layout
