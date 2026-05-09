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
    const currentUsers: IUser[] = this.usersSubject.getValue();
    const updatedUsers: IUser[] = [...currentUsers, newUser];
    this.setUsers(updatedUsers);
    console.log(updatedUsers)
  }

  removeUser(userId: number): void {
    const currentUsers: IUser[] = this.usersSubject.getValue();
    const filteredUsers: IUser[] = currentUsers.filter((currentUser: IUser) => currentUser.id !== userId);
    this.setUsers(filteredUsers);
  }

  loadUsers(): Observable<IUser[]> {
    return this.userApiService.getUsers().pipe(
      tap((users: IUser[]) => {
        this.localStorageService.setItem('users', users);
        this.usersSubject.next(users);
      })
    );
  }
  
}
