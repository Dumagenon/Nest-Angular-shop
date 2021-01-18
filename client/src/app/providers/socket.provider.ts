import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AUTH_TOKEN, env } from '../utils/constants';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SocketProvider extends Socket {
  constructor(private auth: AuthService) {
    super({
      url: env.WS_HOST,
      options: { auth: { token: localStorage.getItem(AUTH_TOKEN) } },
    });
  }
}
