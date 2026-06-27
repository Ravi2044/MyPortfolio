import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Blog, BlogService } from '../blog.service';



@Component({
  standalone: true,
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (res) => {
        this.blogs = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
        this.loading = false;
      }
    });
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.blogs = this.blogs.filter(b => b.id !== id);
      });
    }
  }
}
 