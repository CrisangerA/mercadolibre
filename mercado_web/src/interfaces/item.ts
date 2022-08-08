interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

interface Author {
  name: string;
  lastName: string;
}
export interface ProductDTO {
  author: Author;
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  freeShipping: boolean;
  soldQuantity: number;
  description: string;
}
export default interface ProductsDTO {
  author: Author;
  categories: string[];
  items: ProductDTO[];
}