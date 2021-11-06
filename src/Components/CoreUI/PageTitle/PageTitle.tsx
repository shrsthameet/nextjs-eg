import { FC } from 'react'
import Head from 'next/head'

interface PageTitleProps {
	title: string,
}

export const PageTitle:FC<PageTitleProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
