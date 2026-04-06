import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageType } from './enums/MessageType';
import { IMessage } from './interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  
  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  closeMessage(messageId: number): void {
    this.messagesSubject.next(
      this.messagesSubject.value.filter((message: IMessage) => message.id !== messageId),
    );
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
    this.messagesSubject.next([message, ...this.messagesSubject.value]);
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }
  
}
