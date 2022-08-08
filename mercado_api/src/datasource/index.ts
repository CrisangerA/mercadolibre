import https from 'https';
import { BadRequestError } from '../models/errors';
import { inject, singleton } from 'tsyringe';
import Product, { Products } from '../models/product';

export default interface IDataSource<T> {
  GetById(id: string): Promise<T>;
  GetDescriptionById<T>(id: string): Promise<T>;
  SearchItem<T>(value: string): Promise<T>;
}

@singleton()
export class RickAndMortyDataSource implements IDataSource<Product> {
  private hostname: string;
  constructor(@inject('rickandmortybaseurl') hostname: string) {
    this.hostname = hostname;
  }
  GetDescriptionById<Product>(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  GetAll(): Promise<Product[]> {
    const options = {
      hostname: this.hostname,
      path: '/api/character',
      method: 'GET',
    };
    return fetch<Product[]>(options);
  }
  GetById(id: string): Promise<Product> {
    const options = {
      hostname: this.hostname,
      path: '/api/character/' + id,
      method: 'GET',
    };
    return fetch<Product>(options);
  }
  SearchItem<Products>(value: string): Promise<Products> {
    const options = {
      hostname: this.hostname,
      path: '/sites/MCO/search?q=/' + value,
      method: 'GET',
    };
    return fetch<Products>(options);
  }
}

@singleton()
export class MercadoDataSource implements IDataSource<Product> {
  private hostname: string;
  private routes;

  constructor(@inject('mercadolibrebaseurl') hostname: string) {
    this.hostname = hostname;
    this.routes = {
      items: {
        search: (value: string) => `/sites/MCO/search?q=/${value}`,
        description: (id: string) => `/items/${id}/description`,
        detail: (id: string) => `/items/${id}`,
      }
    }
  }

  SearchItem<Products>(value: string): Promise<Products> {
    const options = {
      hostname: this.hostname,
      path: this.routes.items.search(value),
      method: 'GET',
    };
    return fetch<Products>(options);
  }
  GetDescriptionById<Description>(id: string): Promise<Description> {
    const options = {
      hostname: this.hostname,
      path: this.routes.items.description(id),
      method: 'GET',
    };
    return fetch<Description>(options);
  }
  GetById(id: string): Promise<Product> {
    const options = {
      hostname: this.hostname,
      path: this.routes.items.detail(id),
      method: 'GET',
    };
    return fetch<Product>(options);
  }

}

const fetch = <T>(options: https.RequestOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let json = '';
      res.on('data', d => {
        json += d;
      });
      res.on('end', () => {
        const response = JSON.parse(json);
        if (response.error) reject(response);             
        resolve(response)
      })
    });
    req.on('error', error => {
      console.error('!!! Fetch error: ',error);
      reject(error);
    });
    req.end();
  });
}
