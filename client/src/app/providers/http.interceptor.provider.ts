import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../classes/token.interceptor';

export default {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: TokenInterceptor,
};
