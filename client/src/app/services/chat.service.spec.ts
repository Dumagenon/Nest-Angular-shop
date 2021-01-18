import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  const mockSocket: Socket = jasmine.createSpyObj('Socket', [
    'emit',
    'fromEvent',
  ]);

  beforeEach(() => {
    service = new ChatService(mockSocket);
  });

  it('must be called with event and message text', async () => {
    await service.send('message', 'Some text');
    expect(mockSocket.emit).toHaveBeenCalledWith('message', 'Some text');
  });

  it('must be called with event', async () => {
    await service.receive('users');
    expect(mockSocket.fromEvent).toHaveBeenCalledWith('users');
  });
});
