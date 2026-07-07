import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { catchError, finalize, first, Observable, tap, throwError } from 'rxjs';
import { IPost } from '../IPost';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { IPostResponce } from '../IPostResponce';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { MessageManagementService } from '../../../message-management.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, ButtonModule, DynamicDialogModule, AsyncPipe, RouterLink],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
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
        tap((response: IPostResponce) => {
          this.totalRecords = response.totalPosts;
          this.postService.setPosts(response.posts);
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Не удалось загрузить посты');
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe();
  }

  openPostDetailPage(id: number): void {
    this.router.navigate([`/posts/${ id }`]);
  }

  viewPost(selectedPost: IPost | null): void {
    if (!selectedPost) {
      return;
    }
    this.openPostDetailPage(selectedPost.id);
  }

  editPostDialog(post: IPost): void {
    this.ref = this.dialogService.open(PostEditDialogComponent, {
      header: 'Редактировать пост',
      width: '50vw',
      data: { post: post },
      style: { padding: 0 },
      maximizable: true,
    });

    this.ref!.onClose.pipe(
      first(), 
      tap((result: boolean | undefined) => {
        if (result === true) {
          this.messageService.showSuccess('Пост успешно сохранён, обновляем список');
          this.loadPosts(this.pageSize, this.first);
        }
      })
    ).subscribe();
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).pipe(
      tap(() => {
        this.selectedPost = null;
        this.messageService.showSuccess('Пост успешно удалён');
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError('Не удалось удалить пост');
        return throwError(() => error);
      })
    ).subscribe();
  }

}