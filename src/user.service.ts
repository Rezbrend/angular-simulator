import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
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
    this.localStorageService.setItem('users', users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  addUser(newUser: IUser): void {
    this.setUsers([...this.usersSubject.value, newUser])
  }

  removeUser(userId: number): void {
    this.setUsers(this.usersSubject.getValue().filter(user => user.id !== userId));
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    const usersFromStorage: IUser[] | null = this.localStorageService.getItem<IUser[]>('users');
    if (usersFromStorage?.length) {
      this.loaderService.hideLoader();
      return of(usersFromStorage);
    };

    return this.userApiService.getUsers()
      .pipe(
        tap( (users: IUser[]) => this.setUsers(users) ),
        catchError((error: string) => {
          this.messageService.showError('Нет пользователей для отображения');
          console.error(error);
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
    }
  
}
