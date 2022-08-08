import Typograpy from "@components/Typograpy";
import { SCREEN_ROUTES } from "@config/paths";
import Image from "next/image";
import Link from "next/link";
import { ProductDTO } from "src/interfaces/item";
import { fCurrency } from "src/utils/formatNumber";

interface ItemCardProps {
  item: ProductDTO;
  length: number;
  index: number;
}
export default function ItemCard({ item, length, index }: ItemCardProps) {
  return (
    <>
      <Link href={SCREEN_ROUTES.items.detail(item.id)}>
        <div className='container' style={{ cursor: 'pointer' }}>
          <div className='row'>
            <div className='col-md-2'>
              <Image src={item.picture} alt={item.title} width='180px' height='180px' objectFit='cover' />
            </div>
            <div className='col-md-8'>
              <Typograpy size={24}>
                {fCurrency(item.price.amount)}
              </Typograpy>
              <div style={{ height: '32px' }}></div>
              <Typograpy size={18}>
                {item.title}
              </Typograpy>
            </div>
            <div className='col-md-1'>
              <Typograpy size={12}>
                {item.author.name}
              </Typograpy>
            </div>
            <div className='col-md-1'>
            </div>
          </div>
        </div>
      </Link>
      {(length -1 ) !== index && <hr style={{ color: '#333333', marginTop: '16px', marginBottom: '16px' }} />}      
    </>
  )
}
