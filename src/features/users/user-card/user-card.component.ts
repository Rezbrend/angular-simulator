import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { IUser } from '../interfaces/IUser';
import { BorderDirective } from '../../../app/shared/directives/border.directive';
import { BoldOnHoverDirective } from '../../../app/shared/directives/hover.directive';
import { PhonePipe } from '../../../app/shared/pipes/phone.pipe';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, BoldOnHoverDirective, BorderDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}
