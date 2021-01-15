import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import Message from '../../models/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService, private auth: AuthService) {}

  public users = 0;
  public message = { value: '', sender: '', date: null };
  public messages: Message[] = [];
  public showChat = false;

  ngOnInit() {
    const user = this.auth.getUser();
    this.message.sender = user.login || user.email;

    this.chatService.receiveChat().subscribe((value: any) => {
      this.messages.push(value as Message);
    });

    this.chatService.getUsers().subscribe((value: any) => {
      this.users = value;
    });

    this.chatService.getMessages().subscribe((value: any) => {
      this.messages = value;
    });
  }

  addChat() {
    const value = this.message.value.trim();

    if (value !== '') {
      const msg: any = {
        ...this.message,
        value,
        date: new Date().getTime(),
      };
      this.messages.push(msg);
      this.chatService.sendChat(msg);

      this.message.value = '';
      this.message.date = null;
    }
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }

  getUsersCount() {
    // return new Set(this.users).size;
    return this.users;
  }

  getDate(ms: any) {
    return new Date(ms).toLocaleDateString();
  }

  isOwnMessage(msg: any) {
    return msg.sender === this.message.sender;
  }
}
