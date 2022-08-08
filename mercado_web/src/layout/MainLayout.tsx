import { Breadcumbs, SearchBar } from "@components/index";
import Head from "next/head";
import { FC, ReactElement } from "react";
interface MainLayoutProps {
  title: string;
  children: any;
  categories?: string[]
}
const MainLayout: FC<MainLayoutProps> = ({ children, categories, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <SearchBar />

      <div className='container py-3'>
        <Breadcumbs categories={categories} />
        <div className='card border-0' style={{ padding: '16px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout;
