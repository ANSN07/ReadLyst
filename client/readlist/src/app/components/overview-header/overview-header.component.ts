import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.css'],
})
export class OverviewHeaderComponent {
  socialMediaIcons = [
    { class: 'bi bi-facebook', link: 'https://www.facebook.com/' },
    { class: 'bi bi-twitter', link: 'https://www.twitter.com/' },
    { class: 'bi bi-linkedin', link: 'https://www.linkedin.com/' },
    { class: 'bi bi-instagram', link: 'https://www.instagram.com/' },
  ];
}
