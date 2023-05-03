import React, { ReactNode } from 'react'
import NavBar from '../NavBar'
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
      </MediaQuery>
      <MediaQuery maxWidth={1024}>
        <HeaderMobile />
      </MediaQuery> */}
      <NavBar />
      {children}
      {/* <MediaQuery minWidth={1025}>
        <Footer />
      </MediaQuery>
      <MediaQuery maxWidth={1024}>
        <FooterMobile />
      </MediaQuery> */}
    </>
  )
}

export default Layout
