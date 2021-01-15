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
import { AuthService } from './modules/auth/auth.service';

@WebSocketGateway(3001)
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  constructor(private auth: AuthService) {}

  @WebSocketServer() private server;
  private users = 0;
  private messages = [];

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.users++;
    // console.log(this.auth.verifyToken(client.handshake.query.token));
    this.server.emit('messages', this.messages);
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
    this.messages.push(data);
    client.broadcast.emit('chat', data);
  }
}
