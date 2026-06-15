import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhonePipe } from '../app/phone.pipe';
import { BoldOnHoverDirective } from '../app/hover.directive';
import { BorderDirective } from '../app/border.directive';

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
