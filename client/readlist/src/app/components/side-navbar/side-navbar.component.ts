import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navItems = [
    {
      icon: 'bi bi-book px-1',
      route: 'my-books/all',
      text: 'My Books',
    },
    {
      icon: 'bi bi-eye px-1',
      route: 'my-books/in-progress',
      text: 'In Progress',
    },
    {
      icon: 'bi bi-check-circle px-1',
      route: 'my-books/finished',
      text: 'Finished',
    },
    {
      icon: 'bi bi-heart-fill px-1',
      route: 'my-books/favourites',
      text: 'Favourites',
    },
    {
      icon: 'bi bi-plus-circle-fill px-1',
      route: 'add-book',
      text: 'Add Book',
    },
    {
      icon: 'bi bi-search px-1',
      route: 'search',
      text: 'Search',
    },
  ];

  navigate(url) {
    this.router.navigateByUrl(url);
  }

  isActive(route: string): boolean {
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    return currentUrl == route;
  }
}
