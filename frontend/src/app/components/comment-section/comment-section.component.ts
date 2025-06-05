import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { SocketService } from '../../services/socket.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentComponent],
  templateUrl: './comment-section.component.html'
})
export class CommentSectionComponent implements OnInit, OnDestroy {
  @Input() post!: any;
  comment = '';
@Input() currentUserId!: string;



  constructor(private postService: PostService, private socketService: SocketService) {}

  ngOnInit() {
    // Listen for new top-level comments
    this.socketService.on('newComment', (comment) => {
      this.post.comments = this.post.comments || [];
      this.post.comments.push(comment);
    });

    // Listen for deleted comments
    this.socketService.on('deleteComment', (commentId) => {
      this.post.comments = this.post.comments.filter((c: any) => c._id !== commentId);
    });
  }

  ngOnDestroy() {
    this.socketService.off('newComment');
    this.socketService.off('deleteComment');
  }

  addComment() {
    if (!this.comment.trim()) return;

    this.postService.addComment(this.post._id, this.comment).subscribe({
      next: () => {
        this.comment = '';
        // The socket event will add the new comment
      },
      error: (err) => console.error('Failed to post comment:', err)
    });
  }

  refreshComments() {
  // This will be triggered when a comment is deleted
  // You might want to fetch fresh comments from the server
  // or rely on the socket updates which already handle it
}
}