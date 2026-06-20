import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../IPost';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [DynamicDialogModule, ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  postService: PostService = inject(PostService);
  post!: IPost;

  ngOnInit(): void {
    this.post = this.dynamicDialogConfig.data;
  }

  postEditForm: FormGroup = new FormGroup({
    title: this.dynamicDialogConfig.data.title,
    tags: this.dynamicDialogConfig.data.tags.join(', '),
    views: this.dynamicDialogConfig.data.views,
  });

  saveChanges(): void {
    const data: Partial<IPost> = {
      title: this.postEditForm.value.title,
      tags: this.postEditForm.value.tags.split(', '),
      views: this.postEditForm.value.views,
    }
    this.postService.editPost(this.dynamicDialogConfig.data.id, data)
      .pipe(
        tap(() => this.dynamicDialogRef.close(),
      ),
    ).subscribe();
  }

}
