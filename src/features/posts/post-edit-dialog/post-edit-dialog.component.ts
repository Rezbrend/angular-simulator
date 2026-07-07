import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../IPost';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { PostService } from '../post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../loader.service';
import { IPostEditFormValue } from '../IPostEditFormValue';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [DynamicDialogModule, ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {
  
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private postService: PostService = inject(PostService);
  private loaderService: LoaderService = inject(LoaderService);
  post!: IPost;

  postEditForm!: FormGroup;

  ngOnInit(): void {
    this.post = this.config.data;

    this.postEditForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required]),
      tags: new FormControl(this.post.tags.join(','), [Validators.required]),
      views: new FormControl(this.post.views, [Validators.required, Validators.min(0)]),
    });
  }

  saveChanges(): void {
    if (this.postEditForm.invalid) {
      return;
    }

    const formValue: IPostEditFormValue = this.postEditForm.value;
    const tags: string[] = formValue.tags
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);

    const data: Partial<IPost> = {
      title: formValue.title,
      tags,
      views: formValue.views,
    };

    this.postService
      .editPost(this.post.id, data)
      .pipe(
        tap(() => {
          this.ref.close();
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        })
      )
      .subscribe();
  }
  
}