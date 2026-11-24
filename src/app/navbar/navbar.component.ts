import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  activeSection = 'home';
  private sectionObserver?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const sections = document.querySelectorAll<HTMLElement>('.page-section[id]');

    this.ngZone.runOutsideAngular(() => {
      this.sectionObserver = new IntersectionObserver(
        entries => {
          const visibleSection = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (visibleSection) {
            this.ngZone.run(() => {
              this.activeSection = visibleSection.target.id;
            });
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: [0, 0.1, 0.25]
        }
      );

      sections.forEach(section => this.sectionObserver?.observe(section));
    });
  }

  setActiveSection(section: string) {
    this.activeSection = section;

    if (isPlatformBrowser(this.platformId)) {
      const menu = document.getElementById('navbarNav');
      const toggle = document.querySelector<HTMLButtonElement>('.navbar-toggler');

      if (menu?.classList.contains('show') && toggle && getComputedStyle(toggle).display !== 'none') {
        toggle.click();
      }
    }
  }

  ngOnDestroy() {
    this.sectionObserver?.disconnect();
  }

}
