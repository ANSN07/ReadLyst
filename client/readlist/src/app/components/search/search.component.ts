import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingListService } from 'src/app/services/reading-list.service';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(
    private router: Router,
    private googleApiService: GoogleApiService,
    private readingListService: ReadingListService
  ) {}
  search: string;
  searchResults;
  book: Book;

  toAddBookPage() {
    this.router.navigate(['/add-book']);
  }

  onSearchItemClick(book) {
    this.book = {
      title: book.volumeInfo.title ? book.volumeInfo.title : 'Unknown',
      author: book.volumeInfo.authors ? book.volumeInfo.authors : ['Unknown'],
      pageCount: book.volumeInfo.pageCount
        ? String(book.volumeInfo.pageCount)
        : '0',
      status: 'Unread',
      isbn: this.getISBN(book.volumeInfo.industryIdentifiers),
    };
    this.readingListService.postData(this.book).subscribe(
      (book) => {},
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/my-books', 'all']);
  }

  getISBN(bookIdentifiers) {
    for (let i = 0; i < bookIdentifiers.length; i++) {
      if (bookIdentifiers[i].type === 'ISBN_13') {
        return bookIdentifiers[i].identifier;
      } else return 'Unknown';
    }
    return null;
  }

  public searchBooks(): void {
    this.googleApiService.getBooks(this.search).subscribe(
      (response) => {
        this.searchResults = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
