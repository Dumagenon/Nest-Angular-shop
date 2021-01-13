import {
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { env } from '../utils/constants';

export default {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(env.APP_ID),
      },
    ],
  } as SocialAuthServiceConfig,
};
