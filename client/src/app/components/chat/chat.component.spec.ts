import { ChatComponent } from './chat.component';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { CHAT_CONNECTION } from '../../utils/constants';

describe('ChatComponent', () => {
  let component: ChatComponent;
  const message = { value: 'Text', sender: 'pasha', date: 12345 };
  const mockChatService: ChatService = jasmine.createSpyObj('ChatService', {
    send: () => true,
    receive: of([message]),
  });
  const mockAuthService: AuthService = jasmine.createSpyObj('AuthService', {
    getUser: { id: 1, login: 'den' },
  });

  beforeEach(() => {
    component = new ChatComponent(mockChatService, mockAuthService);
    component.message = { ...message };
  });

  it('sendMessage method should be sent with event and message щио', async () => {
    spyOn(Date, 'now').and.callFake(() => 12345);

    await component.sendMessage();
    expect(mockChatService.send).toHaveBeenCalledWith('message', message);
    expect(component.messages.length).toBe(1);
    expect(component.message).toEqual({ value: '', sender: 'pasha', date: 0 });
  });

  it('ngOnInit method must be called and started to receive messages', async () => {
    await component.ngOnInit();

    expect(component.message.sender).toBe('den');
    expect(mockChatService.send).toHaveBeenCalledWith(CHAT_CONNECTION, 1);
    expect(component.messages.length).toBe(1);
    expect(component.messages).toEqual([message]);
  });

  it('getDate method should return 03:00', async () => {
    const time = component.getDate(component.message.date);
    expect(time).toBe('03:00');
  });
});
