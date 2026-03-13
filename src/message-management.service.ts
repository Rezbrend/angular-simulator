import { Injectable } from '@angular/core';
import { MessageType } from './enums/MessageType';
import { IMessage } from './interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  
  messages: IMessage[] = [];

  private addMessage(text: string, type: MessageType): void {
    const id = new Date().getTime();
    const message: IMessage = { id, text, type };
    this.messages = [message, ...this.messages];

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(messageId: number): void {
    this.messages = this.messages.filter((message: IMessage) => message.id !== messageId);
  }

  addInfoMessage(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  addSuccessMessage(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }

  addWarningMessage(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  addErrorMessage(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }
  
}
