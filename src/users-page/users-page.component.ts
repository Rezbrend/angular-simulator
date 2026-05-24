import { Component, inject } from '@angular/core';
import { combineLatest, BehaviorSubject, Observable, tap, map, of, catchError } from 'rxjs';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { LoaderService } from '../loader.service';
import { MessageManagementService } from '../message-management.service';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  standalone: true,
})
export class UsersPageComponent {
  
  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageManagementService = inject(MessageManagementService);
  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  filteredUsers$: Observable<IUser[]> = new Observable<IUser[]>();
  searchTerm$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    this.userService.loadUsers()
    .subscribe();
  }

  onDeleteUser(userId: number): void {
    this.userService.removeUser(userId);
  }

  onCreateUser(newUser: IUser): void {
    this.userService.addUser(newUser)
  }
  
  onFilterChange(): void {
    this.filteredUsers$ = combineLatest([
      this.searchTerm$,
      this.users$
    ]).pipe(
      map(([searchTerm, users]) => {
        if (searchTerm === null) {
          return users;
        }
        return users.filter((user: IUser) =>
          user.name.trim()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      })
    );
  }
  
}
