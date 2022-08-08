import type { NextPage, NextPageContext } from "next"
import { MainLayout } from '@layout/index';
import itemService from "@services/item.service";
import ProductsDTO from "src/interfaces/item";
import ItemsListComponent from "@components/ItemsList/ItemsList";
import { SCREEN_ROUTES } from "@config/paths";

interface ItemsListProps {
  data: ProductsDTO
}
const ItemsList: NextPage<ItemsListProps> = ({ data }) => {
  return (
    <MainLayout title='Mercado Libre' categories={data.categories}>      
      <ItemsListComponent items={data.items} />
    </MainLayout>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { search } = context.query;
  const data = await itemService.SearchItem(search as string);
  if (search === '') return {
    redirect: {
      destination: SCREEN_ROUTES.root,
      permanent: false,
    }
  }
  return {
    props: { data }
  }
}

export default ItemsList;
