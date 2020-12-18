import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../models/product.models';
import { CatalogStateModel } from '../../models/catalog-state.model';
import { catalogNode } from './catalog.reducer';

export const selectCatalogFeature = createFeatureSelector<CatalogStateModel>(
  catalogNode,
);

export const selectProducts = createSelector(
  selectCatalogFeature,
  (state: CatalogStateModel): Product[] => state.products,
);

export const selectOrder = createSelector(
  selectCatalogFeature,
  (state: CatalogStateModel): string => state.order,
);

export const selectPageSize = createSelector(
  selectCatalogFeature,
  (state: CatalogStateModel): string => state.pageSize,
);

export const selectTotal = createSelector(
  selectCatalogFeature,
  (state: CatalogStateModel): number => state.total,
);
