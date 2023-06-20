import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReadingListService } from 'src/app/services/reading-list.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent {
  @Input() books: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private readingListService: ReadingListService
  ) {}

  buttonText = ['Set as In Progress', 'Finish Reading', 'Mark as Unread'];
  snackBarMessages = {
    'In Progress': "You've started reading this book!",
    Finished: "You've finished reading the book!",
    Unread: 'Book progress reset to zero!',
  };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    setTimeout(() => {
      this.snackBar.dismiss();
    }, 2000);
  }

  toAddBookPage() {
    this.router.navigate(['/add-book']);
  }

  handleFavourites(book) {
    if (!book.hasOwnProperty('favourite')) {
      book.favourite = true;
    } else {
      book.favourite = !book.favourite;
    }
    this.readingListService.updateBookDetails(book);
  }

  getBadgeText(book) {
    return [book.status, `${book.pageCount} Pages`, `${book.isbn} ISBN`];
  }

  updateBookStatus(book, status) {
    book.status = status;
    this.readingListService.updateBookStatus(book);
    this.openSnackBar(this.snackBarMessages[status], 'Close');
  }

  getISBN(bookIdentifiers) {
    for (let i = 0; i < bookIdentifiers.length; i++) {
      if (bookIdentifiers[i].type === 'ISBN_13') {
        return bookIdentifiers[i].identifier;
      } else return 'Unknown';
    }
    return null;
  }

  removeBookFromList(book) {
    this.readingListService.removeBookFromList(book).subscribe(() => {});
  }

  editBook(book) {
    this.router.navigate(['edit-book', book.id]);
  }
}
