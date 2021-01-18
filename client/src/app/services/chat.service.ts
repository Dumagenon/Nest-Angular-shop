import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  send(event: string, message: any) {
    this.socket.emit(event, message);
  }

  receive(event: string) {
    return this.socket.fromEvent(event);
  }
}
