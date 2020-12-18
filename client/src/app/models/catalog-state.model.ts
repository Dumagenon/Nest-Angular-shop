import { catalogNode } from '../reducers/catalog/catalog.reducer';
import { Product } from './product.models';

export interface CatalogStateModel {
  products: Product[];
  order: string;
  pageSize: string;
  total: number;
}

export interface StoreModel {
  [catalogNode]: CatalogStateModel;
}
