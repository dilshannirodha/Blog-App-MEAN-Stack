import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment!: any;
  @Input() postId!: string;
  @Input() isReply: boolean = false;
  @Output() updated = new EventEmitter();
  replyText = '';
@Input() currentUserId!: string;

  constructor(private postService: PostService, private socketService: SocketService) {}

  ngOnInit() {
    // Listen for likes on this comment
    this.socketService.on('likeComment', (data) => {
      if (data.commentId === this.comment._id) {
        this.comment.likes = data.likes;
      }
    });

    // Listen for new replies to this comment
    this.socketService.on('newReply', (data) => {
      if (data.parentCommentId === this.comment._id) {
        this.comment.replies = this.comment.replies || [];
        this.comment.replies.push(data.reply);
      }
    });

    // Listen for deletion of this comment or its replies
    this.socketService.on('deleteComment', (id) => {
      if (this.comment._id === id) {
        // If this comment was deleted, notify parent
        this.updated.emit();
      } else {
        // If a reply was deleted, filter it out
        this.comment.replies = this.comment.replies?.filter((r: any) => r._id !== id);
      }
    });
  }

  ngOnDestroy() {
    this.socketService.off('likeComment');
    this.socketService.off('newReply');
    this.socketService.off('deleteComment');
  }

  like() {
    this.postService.likeComment(this.postId, this.comment._id).subscribe({
      next: () => {
        // The socket event will update the likes
      },
      error: (err) => console.error('Failed to like comment:', err)
    });
  }

  reply() {
    if (!this.replyText.trim()) return;

    this.postService.replyToComment(this.postId, this.comment._id, this.replyText)
      .subscribe({
        next: () => {
          this.replyText = '';
          // The socket event will add the reply
        },
        error: (err) => console.error('Failed to add reply:', err)
      });
  }

  delete() {
    this.postService.deleteComment(this.postId, this.comment._id).subscribe({
      next: () => {
        // The socket event will trigger the deletion
      },
      error: (err) => console.error('Failed to delete comment:', err)
    });
  }
}