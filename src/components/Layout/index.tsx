import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
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
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
