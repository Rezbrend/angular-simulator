import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageManagementService } from '../../../message-management.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
  })

  onSubmit(): void {
    this.authService.login(this.form.value)
      .pipe(
        tap(() => {
          this.messageService.showSuccess('Вы вошли в систему');
          this.router.navigate(['/']);
        }),
        catchError(() => {
          this.messageService.showError('Неверный логин или пароль');
          return EMPTY;
        })
      ).subscribe();
  }

}