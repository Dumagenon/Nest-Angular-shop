import { NotFoundResponse } from '../products/products.dto';

export const ApiErrorResponse = {
  status: 404,
  description: 'Not found',
  type: NotFoundResponse,
};
