import React from 'react'
import Head from 'next/head'

interface MetaProps {
  title: string
  description: string
}

const Meta: React.FC<MetaProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{`GraphQL editor - ${title}`}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta
