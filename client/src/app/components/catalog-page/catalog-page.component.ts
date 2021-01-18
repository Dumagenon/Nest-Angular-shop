import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CatalogStateModel } from '../../models/catalog-state.model';
import { selectProducts } from '../../reducers/catalog/catalog.selector';
import { SetOrder, SetPageSize } from '../../actions/catalog.action';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  products$: Observable<Product[]> = this.store$.pipe(select(selectProducts));

  aSub: any;

  constructor(
    private productsService: ProductsService,
    private store$: Store<CatalogStateModel>,
  ) {}

  ngOnInit() {
    this.productsService.loadProducts();
  }

  setSelectOption = (event: any, key: string) => {
    const value = event.target.options[event.target.selectedIndex].value;
    this.store$.dispatch(
      key === 'order' ? new SetOrder(value) : new SetPageSize(value),
    );
    this.productsService.loadProducts();
  };
}
