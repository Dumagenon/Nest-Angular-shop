import { Action } from '@ngrx/store';
import { Product } from '../models/product.models';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_ORDER = 'SET_ORDER';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_TOTAL = 'SET_TOTAL';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export class SetOrder implements Action {
  readonly type = SET_ORDER;

  constructor(public payload: string) {}
}

export class SetPageSize implements Action {
  readonly type = SET_PAGE_SIZE;

  constructor(public payload: string) {}
}

export class SetTotal implements Action {
  readonly type = SET_TOTAL;

  constructor(public payload: number) {}
}

export type Actions = SetProducts | SetOrder | SetPageSize | SetTotal;
