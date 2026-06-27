import { Component } from '@angular/core';
import { Blog, BlogService } from '../blog.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-blog-add',
  standalone:true,
  imports: [FormsModule,NgIf,CommonModule],
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.css'
})
export class BlogAddComponent {
  blog: Blog = { title: '', author: '', content: '' };
  message = '';

  constructor(private blogService: BlogService) {}

  onSubmit() {
    if (!this.blog.title || !this.blog.author || !this.blog.content) {
      this.message = 'All fields are required!';
      return;
    }

    this.blogService.addBlog(this.blog).subscribe({
      next: (res) => {
        this.message = 'Blog added successfully!';
        this.blog = { title: '', author: '', content: '' };
      },
      error: (err) => {
        console.error('Error adding blog:', err);
        this.message = 'Error while adding blog.';
      }
    });
  }
}
