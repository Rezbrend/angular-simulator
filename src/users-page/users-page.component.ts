import { Component, inject } from '@angular/core';
import { combineLatest, BehaviorSubject, Observable, tap, map } from 'rxjs';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  standalone: true,
})
export class UsersPageComponent {
  
  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  filteredUsers$: Observable<IUser[]> = new Observable<IUser[]>();
  searchTerm$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    this.userService
      .loadUsers()
      .pipe(tap((users: IUser[]) => this.userService.setUsers(users)))
      .subscribe();
  }

  onDeleteUser(userId: number): void {
    this.userService.removeUser(userId);
  }

  createUser(newUser: IUser): void {
    this.userService.addUser(newUser)
  }
  
  applyFilter(searchTerm: string | null): void {
    this.searchTerm$.next(searchTerm);
  }
  
  onFilterChange(): void {
    this.filteredUsers$ = combineLatest([
      this.searchTerm$,
      this.users$
    ]).pipe(
      map(([searchTerm, users]) => {
        if (!users || users.length === 0) return [];
        if (searchTerm === null || searchTerm === '') {
          return users;
        }
        return users.filter(user =>
          user.name.trim().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }
  
}
