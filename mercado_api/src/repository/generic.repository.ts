import IDataSource from '../datasource';

export interface IGenericRepository<T> {
  GetById(id: string): Promise<T>;
  GetDescriptionById(id: string): Promise<T>;
  SearchItem(value: string): Promise<T[]>;
}

/**
 * @class GenericRepository
 * @desc Responsible for establishing the connection with the data source, database, rest api, etc
 * @param {DataSource} dataSource DataSource<T>
 **/
export default class GenericRepository<T> implements IGenericRepository<T> {
  private _dataSource: IDataSource<T>;
  constructor(dataSource: IDataSource<T>) {
    this._dataSource = dataSource;
  }
  GetDescriptionById(id: string): Promise<T> {
    return this._dataSource.GetDescriptionById(id);
  }
  SearchItem(value: string): Promise<T[]> {
    return this._dataSource.SearchItem(value);
  }
  GetById(id: string): Promise<T> {
    return this._dataSource.GetById(id);
  }
}