import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  standalone: true,
})
export class UsersPageComponent {
  
  userService: UserService = inject(UserService);

  constructor() {
    this.userService.loadUsers()
     .pipe(
       tap((users: IUser[]) => this.userService.setUsers(users)),
     ).subscribe();
  }
  
}
