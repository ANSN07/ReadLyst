import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  private apiKey = 'AIzaSyAhKUHcjMNLPlHUzJ2SPLLT9zFQ6WtLFEY';

  constructor(private http: HttpClient) {}

  public getBooks(searchQuery): Observable<any> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
