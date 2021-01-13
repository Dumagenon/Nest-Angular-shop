import {
  WsResponse,
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

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() server;
  users = 0;

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any, ...args: any[]) {
    this.users++;
    this.server.emit('users', this.users);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.users--;
    this.server.emit('users', this.users);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.broadcast.emit('chat', data);
  }
}
