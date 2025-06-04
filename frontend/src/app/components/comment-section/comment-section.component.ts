import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentComponent],
  templateUrl: './comment-section.component.html'
})
export class CommentSectionComponent {
  @Input() post!: any;
  comment = '';

  constructor(private postService: PostService) {}

  addComment() {
    this.postService.addComment(this.post._id, this.comment).subscribe(() => this.refresh());
  }

  refresh() {
    // Re-fetch post or manually update `this.post.comments`
  }
}
