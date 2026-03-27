import { Injectable } from '@angular/core';
import { MessageType } from './enums/MessageType';
import { IMessage } from './interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  
  messages: IMessage[] = [];

  closeMessage(messageId: number): void {
    this.messages = this.messages.filter((message: IMessage) => message.id !== messageId);
  }

  showInfo(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  showSuccess(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }

  showWarn(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  showError(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }

  private addMessage(text: string, type: MessageType): void {
    const id: number = new Date().getTime();
    const message: IMessage = { id, text, type };
    this.messages = [message, ...this.messages];

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }
  
}
