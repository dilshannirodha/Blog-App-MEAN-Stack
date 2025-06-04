import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { Post } from '../../models/post.model'; // 👈 Import the type

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, CommentSectionComponent],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post!: Post;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.post = posts.find((p: Post) => p._id === id)!;
    });
  }
}
