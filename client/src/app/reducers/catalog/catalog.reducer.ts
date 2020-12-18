import * as CatalogActions from '../../actions/catalog.action';
import { CatalogStateModel } from '../../models/catalog-state.model';

export const catalogNode = 'catalog';

const initialState: CatalogStateModel = {
  products: [],
  order: 'asc',
  pageSize: '6',
  total: 0,
};

export const catalogReducer = (
  state = initialState,
  action: CatalogActions.Actions,
) => {
  switch (action.type) {
    case CatalogActions.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case CatalogActions.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CatalogActions.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
      };
    default:
      return state;
  }
}
