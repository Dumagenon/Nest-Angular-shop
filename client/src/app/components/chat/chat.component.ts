import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import Message from '../../models/message.interface';
import {
  CHAT_CONNECTION,
  CHAT_HISTORY,
  CHAT_MESSAGE,
  CHAT_USERS,
} from '../../utils/constants';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit {
  constructor(private chatService: ChatService, private auth: AuthService) {}

  public users = [];
  public message = { value: '', sender: '', date: null };
  public messages: Message[] = [];
  public showChat = false;

  @ViewChild('toggleButton') private toggleButton!: ElementRef;
  @ViewChild('chat') private chat!: ElementRef;
  @ViewChild('scrollMe') private scrollMe!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOut(e: Event) {
    if (
      !this.toggleButton.nativeElement.contains(e.target) &&
      !this.chat.nativeElement.contains(e.target)
    ) {
      this.showChat = false;
    }
  }

  ngOnInit() {
    const user = this.auth.getUser();
    this.message.sender = user.login || user.email;

    this.chatService.send(CHAT_CONNECTION, user.id);

    this.chatService.receive(CHAT_MESSAGE).subscribe((value: any) => {
      this.messages.push(value as Message);
    });

    this.chatService.receive(CHAT_USERS).subscribe((value: any) => {
      this.users = value;
    });

    this.chatService.receive(CHAT_HISTORY).subscribe((value: any) => {
      this.messages = value;
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  addChat() {
    const value = this.message.value.trim();

    if (value !== '') {
      const msg: any = {
        value,
        date: new Date().getTime(),
        sender: this.message.sender,
      };
      this.messages.push(msg);
      this.chatService.send(CHAT_MESSAGE, msg);
      console.log(this.messages);
      this.message.value = '';
      this.message.date = null;
    }
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }

  getUsersCount() {
    return this.users.length;
  }

  getDate(ms: any) {
    return new Date(ms).toLocaleTimeString().split(':').slice(0, 2).join(':');
  }

  isOwnMessage(msg: any) {
    return msg.sender === this.message.sender;
  }

  scrollToBottom() {
    this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  }
}
