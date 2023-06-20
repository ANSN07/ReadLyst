import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interface/book';
import { ReadingListService } from 'src/app/services/reading-list.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css'],
})
export class MyBooksComponent implements OnInit {
  constructor(
    private readingListService: ReadingListService,
    private activatedRoute: ActivatedRoute
  ) {}

  readingList: any[] = [];
  status: string;
  tabLabel: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const category = params['category'];
      if (category == 'in-progress') {
        this.status = 'In Progress';
        this.getBooksBasedOnStatus(this.status);
        this.tabLabel = 'Currently Reading';
      } else if (category == 'finished') {
        this.status = 'Finished';
        this.getBooksBasedOnStatus(this.status);
        this.tabLabel = 'Finished Books';
      } else if (category == 'favourites') {
        this.status = 'favourite';
        this.getFavourites();
        this.tabLabel = 'Favourite Books';
      } else {
        this.status = '';
        this.getAllBooks();
        this.tabLabel = 'All Books';
      }
    });

    this.readingListService.listChanges$.subscribe((array) => {
      if (this.status == 'favourite') this.getFavourites();
      else if (this.status) {
        this.getBooksBasedOnStatus(this.status);
      } else {
        this.readingList = array;
      }
    });
  }

  getAllBooks() {
    this.readingListService.getReadingList().subscribe(
      (response: Book[]) => {
        this.readingList = response;
        this.readingListService.readingList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFavourites() {
    this.readingList = this.readingListService.getFavourites();
  }

  getBooksBasedOnStatus(status) {
    this.readingList = this.readingListService.getBooksBasedOnStatus(status);
  }
}
