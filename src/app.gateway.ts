import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001)
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
    console.log(Array.from(this.users));
    this.server.emit('users', Array.from(this.users));
  }
}
