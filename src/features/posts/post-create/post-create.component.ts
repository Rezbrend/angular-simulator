import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { MessageManagementService } from '../../../message-management.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  
  router: Router = inject(Router);
  private postService: PostService = inject(PostService);
  private messageService: MessageManagementService = inject(MessageManagementService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder)
  
  postForm: FormGroup = new FormGroup({
    id: this.fb.control(0, [Validators.required]),
    title: this.fb.control('', [Validators.required]),
    body: this.fb.control('', [Validators.required]),
    tags: this.fb.control([], [Validators.required]),
    reactions: this.fb.group({
      likes: this.fb.control(0, [Validators.required]),
      dislikes: this.fb.control(0, [Validators.required]),
    }),
    views: this.fb.control(0, [Validators.required]),
    userId: this.fb.control(0, [Validators.required]),
  })

  onSubmit(): void {
    this.postService.createPost(this.postForm.getRawValue())
      .pipe(
        switchMap(() => {
          this.messageService.showSuccess('Пост успешно создан');
          return this.router.navigate(['/posts']);
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Ошибка при создании поста');
          return throwError(() => error);
        })
      ).subscribe();
  }

}
