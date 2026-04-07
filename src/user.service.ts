import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { MessageManagementService } from './message-management.service';
import { LoaderService } from './loader.service';
import { IUser } from './interfaces/IUser';
import { UsersApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  loaderService: LoaderService = inject(LoaderService);
  userApiService: UsersApiService = inject(UsersApiService);
  messageService: MessageManagementService = inject(MessageManagementService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.userApiService.getUsers().pipe(
      finalize(() => {
        setTimeout(() => this.loaderService.hideLoader(), 1000);
      }),
      catchError(() => {
        this.messageService.showError('Ошибка');
        return of<IUser[]>([]);
      }),
    );
  }
  
}
