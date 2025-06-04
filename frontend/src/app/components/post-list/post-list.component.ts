import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  like(id: string) {
    this.postService.likePost(id).subscribe(() => this.ngOnInit());
  }

  dislike(id: string) {
    this.postService.dislikePost(id).subscribe(() => this.ngOnInit());
  }
}
