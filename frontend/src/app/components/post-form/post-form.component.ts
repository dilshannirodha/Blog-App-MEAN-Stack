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
  successMessage = '';
  errorMessage = '';

  constructor(private postService: PostService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    if (this.file) formData.append('media', this.file);

    this.postService.createPost(formData).subscribe({
      next: () => {
        this.successMessage = '✅ Post created successfully!';
        this.errorMessage = '';
        this.title = '';
        this.content = '';
        this.file = undefined;

        // Hide message after 3 seconds
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to create post. Please try again.';
        this.successMessage = '';
        console.error(err);

        // Hide error after 3 seconds
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}
