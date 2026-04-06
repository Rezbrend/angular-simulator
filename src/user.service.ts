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
  
  private userSubject = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();

  loaderService: LoaderService = inject(LoaderService);
  userApiService: UsersApiService = inject(UsersApiService);
  messageService: MessageManagementService = inject(MessageManagementService);

  setUsers(users: IUser[]): void {
    this.userSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
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
