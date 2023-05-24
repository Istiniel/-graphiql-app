import React, { ReactNode } from 'react'
import Header from './Header'

import Spinner from '@/UI/Spinner'
import dynamic from 'next/dynamic'
const DynamicFooter = dynamic(() => import('./Footer'), {
  loading: () => <Spinner />,
  ssr: false,
})

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <DynamicFooter />
    </>
  )
}

export default Layout
