import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private router: Router) {}

  cards: any[] = [
    {
      icon: 'bookmark',
      title: 'Personalized Reading Progress',
      content:
        "Keep track of the books you've read, are currently reading, or plan to read.",
    },
    {
      icon: 'list',
      title: 'Interactive Reading List',
      content:
        'Create a virtual bookshelf to showcase your reading collection.',
    },
    {
      icon: 'analytics',
      title: 'Reading Statistics',
      content:
        'Track your reading speed, average reading time, and number of books read to understand your reading habits better.',
    },
  ];
  users: any[] = [
    {
      name: 'Emily Davis',
      rating: 3,
      text: "Thanks to ReadLyst, I've been able to read more books than ever before and discover new authors.",
    },
    {
      name: 'John Smith',
      rating: 5,
      text: ' I absolutely love the ReadLyst application! It has made managing my reading list so much easier.',
    },
    {
      name: 'Anna Johnson',
      rating: 4,
      text: 'The user-friendly interface and smooth functionality make it a joy to use. Highly recommended!',
    },
  ];
  socialMediaIcons = [
    { class: 'bi bi-facebook', link: 'https://www.facebook.com/' },
    { class: 'bi bi-twitter', link: 'https://www.twitter.com/' },
    { class: 'bi bi-linkedin', link: 'https://www.linkedin.com/' },
    { class: 'bi bi-instagram', link: 'https://www.instagram.com/' },
  ];
  isHovered: boolean[] = this.cards.map(() => false);

  setHovered(index: number, hovered: boolean): void {
    this.isHovered[index] = hovered;
  }

  counter(n: number): Array<number> {
    return Array(n);
  }

  onButtonClick(): void {
    this.router.navigate(['/spinner']);
  }
}
