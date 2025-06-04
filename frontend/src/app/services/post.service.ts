import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private API = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPosts(): Observable<any> {
    return this.http.get(this.API, { headers: this.getAuthHeaders() });
  }

  createPost(postData: FormData): Observable<any> {
    return this.http.post(this.API, postData, { headers: this.getAuthHeaders() });
  }

  likePost(id: string): Observable<any> {
    return this.http.put(`${this.API}/like/${id}`, {}, { headers: this.getAuthHeaders() });
  }

  dislikePost(id: string): Observable<any> {
    return this.http.put(`${this.API}/dislike/${id}`, {}, { headers: this.getAuthHeaders() });
  }

  addComment(postId: string, text: string): Observable<any> {
    
    return this.http.post(
      `${this.API}/${postId}/comment`,
      { text },
      { headers: this.getAuthHeaders() }
    );
  }

  replyToComment(postId: string, commentId: string, text: string): Observable<any> {
    return this.http.post(
      `${this.API}/${postId}/comment/${commentId}/reply`,
      { text },
      { headers: this.getAuthHeaders() }
    );
  }

  likeComment(postId: string, commentId: string): Observable<any> {
    return this.http.put(
      `${this.API}/${postId}/comment/${commentId}/like`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.http.delete(`${this.API}/${postId}/comment/${commentId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
