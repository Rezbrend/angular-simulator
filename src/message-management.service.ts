import { Injectable } from '@angular/core';
import { MessageType } from './enums/MessageType';
import { IMessage } from './interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  
  messages: IMessage[] = [];

  addMessage(text: string, type: MessageType, id: number): void {
    const message: IMessage = {id, text, type,};
    this.messages = [message, ...this.messages];

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }
  
  closeMessage(messageId: string | number): void {
    this.messages = this.messages.filter((message: IMessage) => message.id !== messageId);
  }
  
  addInfoMessage(): void {
    this.addMessage('Стоимость отправлена на почту', MessageType.INFO, new Date().getTime());
  }

  addSuccessMessage(): void {
    this.addMessage('Направления получены',  MessageType.SUCCESS, new Date().getTime());
  }

  addWarningMessage(): void {
    this.addMessage('Программа недоступна', MessageType.WARN, new Date().getTime());
  }

  addErrorMessage(): void {
    this.addMessage('Материалы недоступны', MessageType.ERROR, new Date().getTime());
  }
  
}
