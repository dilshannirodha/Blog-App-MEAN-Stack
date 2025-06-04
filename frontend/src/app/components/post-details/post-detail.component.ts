import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, CommentSectionComponent],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  showComments = false;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.postService.getPosts().subscribe((posts: Post[]) => {
      const found = posts.find((p: Post) => p._id === id);
      if (found) {
        this.post = found;
      }
    });
  }

  getMediaType(mediaUrl: string): 'image' | 'video' | 'unknown' {
    const extension = mediaUrl?.split('.').pop()?.toLowerCase();
    if (!extension) return 'unknown';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';

    return 'unknown';
  }

  onAddComment() {
  // You can implement your logic here, e.g., open a comment input form/modal
  alert('Add comment functionality not implemented yet.');
}


  toggleComments() {
    this.showComments = !this.showComments;
  }
}
