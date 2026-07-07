import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MessageManagementService } from '../message-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';
import { AsyncPipe } from '@angular/common';
import { faCircleXmark, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-message',
  imports: [FormsModule, CommonModule, AsyncPipe, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class MessageComponent {
  
  faCircleXmark: IconDefinition = faCircleXmark;
  faEnvelope: IconDefinition = faEnvelope;

  messageManagementService: MessageManagementService = inject(MessageManagementService);
  messages$: Observable<IMessage[]> = this.messageManagementService.messages$;
  
}
