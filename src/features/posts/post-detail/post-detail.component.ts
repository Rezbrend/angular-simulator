import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../IPost';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-detail',
  imports: [ButtonModule],
  templateUrl: './post-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);
  post!: IPost;
  
  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
  }
  
  goBack(): void {
    this.location.back();
  }

}
