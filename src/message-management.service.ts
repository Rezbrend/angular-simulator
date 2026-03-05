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
    this.messages.unshift(message);

    setTimeout(() => {
      this.closeMessage(message);
    }, 5000);
  }
  
  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((m: IMessage) => m !== message);
  }
  
  addInfoMessage(): void {
    this.addMessage('Стоимость отправлена на почту', MessageType.INFO, 1);
  }

  addSuccessMessage(): void {
    this.addMessage('Направления получены',  MessageType.SUCCESS, 2);
  }

  addWarningMessage(): void {
    this.addMessage('Программа недоступна', MessageType.WARN, 3);
  }

  addErrorMessage(): void {
    this.addMessage('Материалы недоступны', MessageType.ERROR, 4);
  }
  
}
