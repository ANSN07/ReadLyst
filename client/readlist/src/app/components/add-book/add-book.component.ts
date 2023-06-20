import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ReadingListService } from 'src/app/services/reading-list.service';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readingListService: ReadingListService,
    private fb: FormBuilder
  ) {}
  bookForm: FormGroup;
  book: any = {
    title: '',
    author: '',
    pages: '',
    isbn: '',
    status: '',
  };
  bookId: string;
  bookToEdit: any;
  statusOptions = ['Unread', 'In Progress', 'Finished'];
  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.readingListService.getBookById(this.bookId).subscribe(
        (response: Book) => {
          this.bookToEdit = response;
          this.book = {
            title: this.bookToEdit.title,
            author: this.bookToEdit.author[0],
            pages: +this.bookToEdit.pageCount,
            isbn: this.bookToEdit.isbn,
            status: this.bookToEdit.status,
          };
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: [''],
      pages: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  getISBN(bookIdentifiers) {
    for (let i = 0; i < bookIdentifiers.length; i++) {
      if (bookIdentifiers[i].type === 'ISBN_13') {
        return bookIdentifiers[i].identifier;
      } else return 'Unknown';
    }
    return null;
  }

  onSearchInputFocus() {
    this.router.navigate(['/search']);
  }

  saveBook(bookForm: NgForm) {
    if (bookForm.valid) {
      const book = {
        id: (this.bookToEdit && this.bookToEdit.id) || undefined,
        title: this.book.title,
        author: [this.book.author],
        pageCount: String(this.book.pages),
        isbn: this.book.isbn ? this.book.isbn : undefined,
        status: this.book.status,
      };

      if (this.bookToEdit) {
        this.readingListService.updateBookDetails(book).subscribe(
          (book) => {},
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.readingListService.postData(book).subscribe(
          (book) => {},
          (error) => {
            console.log(error);
          }
        );
      }

      this.router.navigate(['my-books', 'all']);
    }
  }
}
