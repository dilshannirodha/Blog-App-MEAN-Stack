import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html'
})
export class CommentComponent {
  @Input() comment!: any;
  @Input() postId!: string;
  @Output() updated = new EventEmitter();
  replyText = '';

  constructor(private postService: PostService) {}

  like() {
    this.postService.likeComment(this.postId, this.comment._id).subscribe(() => this.updated.emit());
  }

  reply() {
    this.postService.replyToComment(this.postId, this.comment._id, this.replyText)
      .subscribe(() => this.updated.emit());
  }

  delete() {
    this.postService.deleteComment(this.postId, this.comment._id).subscribe(() => this.updated.emit());
  }
}
