import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { Observable, tap } from 'rxjs';
import { IPost } from '../IPost';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { IPostResponce } from '../IPostResponce';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { MessageManagementService } from '../../../message-management.service';

type IPostEditDialogResult =
  | {
      success: true;
      post: IPost;
    }
  | {
      success: false;
      error?: unknown;
    };

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, ButtonModule, DynamicDialogModule, AsyncPipe],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  standalone: true,
})
export class PostsComponent implements OnInit {
  
  public  dialogService: DialogService = inject(DialogService);
  private router: Router = inject(Router);
  private postService: PostService = inject(PostService);
  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageManagementService = inject(MessageManagementService);

  posts$: Observable<IPost[]> = this.postService.posts$;
  isLoading: boolean = false;
  totalRecords: number = 0;
  first: number = 0;
  pageSize: number = 10;
  selectedPost: IPost | null = null;
  ref: DynamicDialogRef<PostEditDialogComponent> | null = null;
  editPost: IPost = {} as IPost;

  contextMenuItems: MenuItem[] = [
    {
      label: 'View',
      icon: 'fa-eye',
      command: () => this.viewPost(this.selectedPost!),
    },
    {
      label: 'Edit',
      icon: 'fa-pencil',
      command: () => this.editPostDialog(this.selectedPost!),
    },
    {
      label: 'Delete',
      icon: 'fa-trash',
      command: () => this.deletePost(this.selectedPost!.id),
    },
  ];

  ngOnInit(): void {
    this.loadPosts(this.pageSize, this.first);
  }

  loadPosts(limit: number, skip: number): void {
    this.isLoading = true;
    this.postApiService.getPosts(limit, skip)
      .pipe(
        tap({
          next: (response: IPostResponce) => {
            this.totalRecords = response.totalPosts;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          },
        }),
      ).subscribe();
  }

  openPostDetailPage(id: number): void {
    this.router.navigate([`/posts/${id}`]);
  }

  viewPost(selectedPost: IPost | null): void {
    if (selectedPost !== null) {
      this.openPostDetailPage(selectedPost.id);
    }
  }

  editPostDialog(post: IPost): void {
    this.ref = this.dialogService.open(PostEditDialogComponent, {
      header: 'Редактировать пост',
      width: '50vw',
      data: { post: post },
      style: { padding: 0 },
      maximizable: true,
    });

    this.ref!.onClose.subscribe((result?: IPostEditDialogResult) => {
      if (!result) {
        return;
      }
      if (result.success) {
        this.messageService.showSuccess('Пост успешно сохранён, обновляем список');
        this.loadPosts(this.pageSize, this.first);
      } else if (result.error) {
        this.messageService.showError('Ошибка при сохранении поста');
      }
    });
  }

  deletePost(id: number): void {
    this.postApiService.deletePost(id)
      .pipe(
        tap({
          next: () => {
            this.selectedPost = null;
            this.loadPosts(this.pageSize, this.first);
          },
        }),
      ).subscribe();
  }

}