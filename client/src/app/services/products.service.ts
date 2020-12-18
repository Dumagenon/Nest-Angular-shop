import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { CatalogStateModel } from '../models/catalog-state.model';
import {
  selectOrder,
  selectPageSize,
} from '../reducers/catalog/catalog.selector';
import { ProductsResponse } from '../models/product.models';
import { SetProducts, SetTotal } from '../actions/catalog.action';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private store: Store<CatalogStateModel>,
  ) {}

  loadProducts() {
    const order = String(this.getFromStore(selectOrder));
    const pageSize = String(this.getFromStore(selectPageSize));

    const params: HttpParams = new HttpParams()
      .set('order', order)
      .set('pageSize', pageSize);

    this.http
      .get<ProductsResponse>('/api/products', { params })
      .subscribe((res) => {
        this.store.dispatch(new SetProducts(res.items));
        this.store.dispatch(new SetTotal(res.total));
      });
  }

  private getFromStore(selector: any) {
    let res;
    this.store.pipe(select(selector)).subscribe((response) => {
      res = response;
    });
    return res;
  }
}
