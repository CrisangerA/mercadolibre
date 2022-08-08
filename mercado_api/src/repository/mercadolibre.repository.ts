import { autoInjectable } from "tsyringe";
import { MercadoDataSource, RickAndMortyDataSource } from "../datasource";
import Product, { Description, ProductDTO, Products, ProductsDTO } from "../models/product";
import { IGenericService } from "../services/generic.service";
import GenericRepository from "./generic.repository";

interface IMercadoLibreRepository extends IGenericService<Product> {
  GetProductById(id: string): Promise<ProductDTO>;
  SearchProduct(value: string): Promise<ProductsDTO>;
}

@autoInjectable()
export default class MercadoLibreRepository extends GenericRepository<Product> implements IMercadoLibreRepository {

  constructor(private dataSource: MercadoDataSource) {
    super(dataSource);
  }
  async SearchProduct(value: string): Promise<ProductsDTO> {
    const prod = await this.dataSource.SearchItem<Products>(value);
    return ProductsDTO.MapFromProducts(prod);
  }

  GetProductById(id: string): Promise<ProductDTO> {
    return new Promise<ProductDTO>((resolve, reject) => {
      this.dataSource.GetById(id)
        .then(product => {
          //console.log(product);
          
          this.dataSource.GetDescriptionById<Description>(id)
            .then((description) => resolve(ProductDTO.MapFromProduct({ ...product, description })))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }
}
