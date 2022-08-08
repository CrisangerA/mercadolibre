import type { NextPage, NextPageContext } from "next"
import { MainLayout } from '@layout/index';
import itemService from "@services/item.service";
import { ProductDTO } from "src/interfaces/item";
import Image from "next/image";
import { Typograpy } from "@components/index";
import { fCurrency } from "src/utils/formatNumber";
import { fCondition } from "src/utils/formatText";

interface ItemsListProps {
  data: ProductDTO
}
const ItemDetail: NextPage<ItemsListProps> = ({ data }) => {
  return (
    <MainLayout title={data.title} categories={[]}>
      <div className='row'>
        <div className="col-md-8">
          <Image src={data.picture} alt={data.title} width="680px" height="680px" objectFit="contain" />
        </div>
        <div className="col-md-4">
          <div style={{ height: '32px' }}></div>
          <Typograpy size={14} display='block'>
            {fCondition(data.condition) + ' - ' + data.soldQuantity + ' vendidos'}
          </Typograpy>
          <div style={{ height: '16px' }}></div>
          <Typograpy size={24}>{data.title}</Typograpy>
          <div style={{ height: '32px' }}></div>
          <Typograpy size={48} display='block'>{fCurrency(data.price.amount)}</Typograpy>
          <div style={{ height: '32px' }}></div>
          <button style={{ minWidth: '200px'}} className='btn btn-primary'>Comprar</button>
        </div>
      </div>
      <div className='px-3'>
        <Typograpy size={28}>
          Descripción del producto
        </Typograpy>
        <div style={{ height: '32px' }}></div>
        <Typograpy size={16}>
          {data.description}
        </Typograpy>
        <div style={{ height: '32px' }}></div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { itemId } = context.query;
  const data = await itemService.GetItemDetails(itemId as string);
  return {
    props: { data }
  }
}

export default ItemDetail;
