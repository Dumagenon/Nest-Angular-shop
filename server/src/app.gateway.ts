import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server;
  private connections = 0;
  private messages = [];
  private users = new Set();

  handleConnection(client: any) {
    this.connections++;
    this.server.emit('history', this.messages);
  }

  handleDisconnect(client: any) {
    this.connections--;
    this.server.emit('users', Array.from(this.users));
  }

  @SubscribeMessage('message')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.messages.push(data);
    client.broadcast.emit('message', data);
  }

  @SubscribeMessage('connect-user')
  setUserConnection(@MessageBody() data: string): void {
    this.users.add(data);
    this.server.emit('users', Array.from(this.users));
  }
}
