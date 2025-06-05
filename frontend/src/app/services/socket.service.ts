import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly apiUrl = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.apiUrl);
  }

  on(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
  }

  off(eventName: string) {
    this.socket.off(eventName);
  }

  emit(eventName: string, data?: any) {
    this.socket.emit(eventName, data);
  }

  // Not needed since we're using direct socket.on in components
  // but kept for backward compatibility
  notifyNewComment(comment: any) {
    this.emit('newComment', comment);
  }

  notifyDeletedComment(commentId: string) {
    this.emit('deleteComment', commentId);
  }

  notifyLikedComment(commentId: string, likes: string[]) {
    this.emit('likeComment', { commentId, likes });
  }

  notifyNewReply(reply: any, parentCommentId: string) {
    this.emit('newReply', { reply, parentCommentId });
  }
}