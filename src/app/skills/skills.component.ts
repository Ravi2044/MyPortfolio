import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  selectedCategory = 'All';

  categories = ['All', 'Backend', 'Database', 'Cloud', 'Frontend'];

  skills = [
    { title: 'C# & .NET Core', description: 'Expertise in building scalable, enterprise-grade backend systems and APIs.', icon: 'bi bi-microsoft', category: 'Backend' },
    { title: 'SQL Server & EF Core', description: 'Robust database design, optimization, and ORM integration.', icon: 'bi bi-database', category: 'Database' },
    { title: 'Azure Cloud', description: 'Deploying and managing scalable applications using Azure services.', icon: 'bi bi-cloud-arrow-up', category: 'Cloud' },
    { title: 'Angular', description: 'Developing powerful full-stack SPAs with modern architecture.', icon: 'fa-brands fa-angular', category: 'Frontend' },
    { title: 'Microservices & APIs', description: 'Designing RESTful and serverless architectures for seamless integration.', icon: 'bi bi-server', category: 'Backend' },
    { title: 'CI/CD & DevOps', description: 'Automated testing, GitHub Actions, and streamlined deployment pipelines.', icon: 'fa-brands fa-git-alt', category: 'Cloud' }
  ];

  get filteredSkills() {
    if (this.selectedCategory === 'All') {
      return this.skills;
    }
    return this.skills.filter(s => s.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
