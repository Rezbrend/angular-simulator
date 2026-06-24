import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../IPost';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [DynamicDialogModule, ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private postService: PostService = inject(PostService);
  post!: IPost;

  postEditForm!: FormGroup;

  ngOnInit(): void {
    this.post = this.config.data;

    this.postEditForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required]),
      tags: new FormControl(this.post.tags.join(','), [Validators.required]),
      views: new FormControl(this.post.views, [Validators.required, Validators.min(0)])
    });
  }

  saveChanges(): void {
    if (this.postEditForm.invalid) {
      return;
    }

    const data: Partial<IPost> = {
      title: this.postEditForm.value.title,
      tags: this.postEditForm.value.tags
        .split(',')
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0),
      views: this.postEditForm.value.views
    };

    this.postService.editPost(this.post.id, data)
      .pipe(
        tap(() => this.ref.close())
      ).subscribe();
  }
  
}