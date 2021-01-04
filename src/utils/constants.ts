import { NotFoundResponse } from '../modules/products/dto/products.dto';

export const ApiErrorResponse = {
  status: 404,
  description: 'Not found',
  type: NotFoundResponse,
};
