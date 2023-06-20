import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interface/book';

@Injectable({
  providedIn: 'root',
})
export class ReadingListService {
  private baseURL = `http://localhost:8080/api`;

  private readListSubject = new Subject<string[]>();
  public listChanges$ = this.readListSubject.asObservable();

  public readingList: any[] = [];

  constructor(private http: HttpClient) {}

  getReadingList(): Observable<any> {
    return this.http.get<Book[]>(`${this.baseURL}/reading-list`);
  }

  postData(data: Book): Observable<any> {
    return this.http.post<Book>(`${this.baseURL}/reading-list`, data);
  }

  updateBookDetails(data: Book): Observable<any> {
    const index = this.readingList.findIndex((item) => item.id === data.id);
    this.readingList[index] = data;
    this.readListSubject.next(this.readingList);
    return this.http.put<Book>(`${this.baseURL}/reading-list`, data);
  }

  updateBookStatus(updatedBook) {
    this.readingList.map((book) => {
      if (book.id === updatedBook.id) {
        return { ...book, status: updatedBook.status };
      }
      return book;
    });
    this.readListSubject.next(this.readingList);
    return this.http.put<Book>(
      `${this.baseURL}/reading-list/${updatedBook.id}`,
      updatedBook
    );
  }

  removeBookFromList(book) {
    const index = this.readingList.findIndex((item) => item._id === book._id);
    if (index !== -1) {
      this.readingList.splice(index, 1);
    }
    this.readListSubject.next(this.readingList);
    return this.http.delete<Book>(`${this.baseURL}/reading-list`, book.id);
  }

  getFavourites() {
    return this.readingList.filter((book) => book.favourite);
  }

  getBooksBasedOnStatus(status) {
    return this.readingList.filter((book) => book.status === status);
  }

  getBookById(id) {
    return this.http.get<Book>(`${this.baseURL}/reading-list/${id}`);
  }
}
