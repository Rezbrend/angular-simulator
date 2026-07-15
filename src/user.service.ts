import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { MessageManagementService } from './message-management.service';
import { LoaderService } from './loader.service';
import { IUser } from './interfaces/IUser';
import { UsersApiService } from './user-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  loaderService: LoaderService = inject(LoaderService);
  userApiService: UsersApiService = inject(UsersApiService);
  messageService: MessageManagementService = inject(MessageManagementService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem('users', JSON.stringify(users));
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue() || [];
  }

  addUser(newUser: IUser): void {
    this.setUsers([...this.usersSubject.value, newUser]);
  }

  removeUser(userId: number): void {
    this.setUsers(this.usersSubject.getValue().filter((user: IUser) => user.id !== userId));
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    const usersFromStorage: IUser[] | null = JSON.parse(
      this.localStorageService.getItem('users') || 'null',
    );
    if (usersFromStorage && usersFromStorage.length > 0) {
      this.loaderService.hideLoader();
      return of(usersFromStorage);
    }

    return this.userApiService.getUsers()
      .pipe(
        catchError(() => {
          this.messageService.showError('Нет пользователей для отображения');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
  }
  
}
