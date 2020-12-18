import { ActionReducerMap } from '@ngrx/store';
import { StoreModel } from '../models/catalog-state.model';
import { catalogNode, catalogReducer } from './catalog/catalog.reducer';

export const reducers: ActionReducerMap<StoreModel, any> = {
  [catalogNode]: catalogReducer,
};
