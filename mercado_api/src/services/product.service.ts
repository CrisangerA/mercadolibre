import { autoInjectable } from 'tsyringe';
import Product, { ProductDTO, ProductsDTO } from '../models/product';
import MercadoLibreRepository from '../repository/mercadolibre.repository';
import GenericService, { IGenericService } from './generic.service';

export interface IProductService extends IGenericService<Product> {
  GetProductById(id: string): Promise<ProductDTO>;
  SearchProduct(value: string): Promise<ProductsDTO>;
}

@autoInjectable()
export default class ProductService extends GenericService<Product> implements IProductService {
  constructor(private _repository: MercadoLibreRepository) {
    super(_repository);
  }
  SearchProduct(value: string): Promise<ProductsDTO> {
    return this._repository.SearchProduct(value);
  }
  GetProductById(id: string) {
    return this._repository.GetProductById(id);
  }
}
