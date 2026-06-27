import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [NgFor],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  products = [
    { title: '.NET Core Clean Architecture', description: 'A premium boilerplate for building enterprise APIs efficiently.', price: '$49', badge: 'Digital Product', image: 'assets/images/home-right.webp', link: '#' },
    { title: 'Fullstack Angular + .NET Template', description: 'Production-ready dashboard with authentication out-of-the-box.', price: '$79', badge: 'Digital Product', image: 'assets/images/home-right.webp', link: '#' },
    { title: 'Custom REST API Development', description: 'High-performance APIs tailored to your application requirements.', price: 'Hire Me', badge: 'Freelance Service', image: 'assets/images/about-us.webp', link: '/contact' }
  ];

}
