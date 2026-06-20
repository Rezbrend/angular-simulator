import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPost } from '../IPost';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { LoaderService } from '../../../loader.service';
import { AsyncPipe } from '@angular/common';
import { IPostResponce } from '../IPostResponce';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, ButtonModule, DialogModule, AsyncPipe],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  standalone: true,
})
export class PostsComponent implements OnInit {

  router: Router = inject(Router);
  dialogService: DialogService = inject(DialogService);
  loaderService: LoaderService = inject(LoaderService);
  postService: PostService = inject(PostService);
  private postApiService: PostApiService = inject(PostApiService);

  postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  isLoading: boolean = false;
  totalRecords: number = 0;
  first: number = 0;
  pageSize: number = 10;
  selectedPost: IPost | null = null;
  displayEditDialog: boolean = false;
  editPost: IPost = {} as IPost;

  contextMenuItems: MenuItem[] = [
    {
      label: 'View',
      icon: 'fa-eye',
      command: () => this.viewPost(this.selectedPost!)
    },
    {
      label: 'Edit',
      icon: 'fa-pencil',
      command: () => this.editPostDialog(this.selectedPost!)
    },
    {
      label: 'Delete',
      icon: 'fa-trash',
      command: () => this.deletePost(this.selectedPost!.id)
    }
  ];
  
  ngOnInit(): void {
    this.loadPosts(this.pageSize, this.first);
  }

  loadPosts(limit: number, skip: number): void {
    this.postApiService.getPosts(limit, skip).subscribe({
      next: (response: IPostResponce) => {
        this.postsSubject.next(response.posts); 
        this.totalRecords = response.totalPosts;
        this.isLoading = false;
      },
      error: () => (this.isLoading = true)
    });
  }

  openPostDetailPage(id: number): void {
    this.router.navigate([`/posts/${ id }`])
  }

  viewPost(selectedPost: IPost | null): void {
    if (selectedPost !== null) {
      this.openPostDetailPage(selectedPost.id);
    }
  }

  editPostDialog(post: IPost): void {
    this.editPost = { ...post };
    this.displayEditDialog = true;
  }

  savePost(): void {
    this.postApiService.editPost(this.editPost.id, this.editPost).subscribe({
      next: () => {
        this.displayEditDialog = false;
      }
    });
  }

  deletePost(id: number): void {
    this.postApiService.deletePost(id).subscribe({
      next: () => {
        this.selectedPost = null;
      }
    })
  }
  
}
