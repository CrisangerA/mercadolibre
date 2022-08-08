import { IGenericRepository } from "../repository/generic.repository";

export interface IGenericService<T> {
  GetById(id: string): Promise<T>;
  SearchItem(value: string): Promise<T[]>;
}

/**
 * @class GenericService
 * @desc Responsible for handling read and write operations for basic CRUD operations
 * @param {GenericRepository} genericRepository GenericRepository<T>
 **/
export default class GenericService<T> implements IGenericService<T> {
  
  private _genericRepository: IGenericRepository<T>
  constructor(genericRepository: IGenericRepository<T>) {
    this._genericRepository = genericRepository;
  }

  GetById(id: string): Promise<T> {
    return this._genericRepository.GetById(id);
  }
  SearchItem(value: string): Promise<T[]> {
    return this._genericRepository.SearchItem(value);
  }
}