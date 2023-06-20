import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingListService } from 'src/app/services/reading-list.service';

@Component({
  selector: 'app-overview-home',
  templateUrl: './overview-home.component.html',
  styleUrls: ['./overview-home.component.css'],
})
export class OverviewHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private readingListService: ReadingListService
  ) {}

  cards: any[] = [
    {
      icon: 'library_books',
      title: 'To Read',
      content:
        'A section where you can keep track of books you plan to read in the future.',
      status: 'Unread',
      bookCount: 0,
    },
    {
      icon: 'visibility',
      title: 'Reading',
      content:
        'A section dedicated to books you are currently reading or actively in progress.',
      status: 'In Progress',
      bookCount: 0,
    },
    {
      icon: 'check_circle',
      title: 'Read',
      content:
        'A collection of books you have already read, serving as a personal reading history or library.',
      status: 'Finished',
      bookCount: 0,
    },
  ];

  isHovered: boolean[] = this.cards.map(() => false);

  ngOnInit() {
    this.cards.map((card) => {
      card.bookCount = this.readingListService.getBooksBasedOnStatus(
        card.status
      ).length;
    });
  }

  setHovered(index: number, hovered: boolean): void {
    this.isHovered[index] = hovered;
  }

  toAddBookPage() {
    this.router.navigate(['/add-book']);
  }
}
