import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectComponent } from '../project/project.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    AboutComponent,
    SkillsComponent,
    ProjectComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  words: string[] = ['Software Developer', 'Frontend Developer', '.NET Developer'];
  currentWordIndex = 0;
  displayedText = '';
  isDeleting = false;
  typingSpeed = 100;
  typingTimeout: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.type();
    }
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  type() {
    const currentWord = this.words[this.currentWordIndex];
    if (this.isDeleting) {
      this.displayedText = currentWord.substring(0, this.displayedText.length - 1);
      this.typingSpeed = 50;
    } else {
      this.displayedText = currentWord.substring(0, this.displayedText.length + 1);
      this.typingSpeed = 100;
    }

    if (!this.isDeleting && this.displayedText === currentWord) {
      this.typingSpeed = 1500; // Pause at full word
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayedText === '') {
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      this.typingSpeed = 500; // Pause before typing next word
    }

    this.typingTimeout = setTimeout(() => this.type(), this.typingSpeed);
  }
}
