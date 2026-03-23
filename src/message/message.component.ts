import { Component, inject } from '@angular/core';
import { MessageManagementService } from '../message-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  imports: [ FormsModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageManagementService: MessageManagementService = inject(MessageManagementService);
  
}
