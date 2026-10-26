import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageManagementService } from '../../../message-management.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageManagementService = inject(MessageManagementService);

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  
  isLoading: boolean = false;

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.form.value).pipe(
      tap(() => {
        this.messageService.showSuccess('Вы вошли в систему');
        this.form.reset();
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        let message: string = 'Произошла ошибка соединения';
        
        if (error.status === 401 || error.status === 403) {
          message = 'Неверный логин или пароль';
        } else if (error.status === 0) {
          message = 'Нет соединения с сервером';
        }

        this.messageService.showError(message);
        this.form.reset();
        this.isLoading = false;
        return EMPTY;
      })
    ).subscribe();
  }

}