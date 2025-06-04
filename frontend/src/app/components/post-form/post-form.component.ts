import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html'
})
export class PostFormComponent {
  title = '';
  content = '';
  file?: File;

  constructor(private postService: PostService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    if (this.file) formData.append('media', this.file);

    this.postService.createPost(formData).subscribe();
  }
}
