import { Component, inject } from '@angular/core';
import { MessageManagementService } from '../message-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  standalone: true
})
export class MessageComponent {

  messageManagementService: MessageManagementService = inject(MessageManagementService);
  messages$: Observable<IMessage[]> = this.messageManagementService.messages$;
  
  constructor() {
    this.messages$ = this.messageManagementService.messages$;
  }
  
}
