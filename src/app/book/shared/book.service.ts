import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Book } from './book';

@Injectable()
export class BookService {

  private headers = new Headers({'Content-Type': 'application/json'});
  
    constructor(private http: Http) { }
  
    getBooks(): Observable<Book[]>{
      return this.http
              .get(`api/books`, {headers: this.headers})
              .map(response => response.json().books as Book[]) 
    }
  
    getOneBook(id: string): Observable<Book> {
      return this.http
        .get(`api/books/${id}`, {headers: this.headers})
        .map((res: Response) => res.json().book as Book)
    }
  
    createBook(book: Book): Observable<Book> {
      return this.http
        .post(`api/books`, book, {headers: this.headers})
        .map((res: Response) => res.json().book as Book);
    }
  
    updateBook(id: string, book: Book): Observable<Book> {
  
      return this.http
        .patch(`api/books/${id}/edit`, book, {headers: this.headers})
        .map((res: Response) => res.json().book as Book);
    }
  
    deleteBook(id: string): Promise<void> {
      return this.http.delete(`api/books/${id}`, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
  
    search(term: string): Observable<Book[]> {
      return this.http
                 .get(`api/books/search?title=${term}`, {headers: this.headers})
                 .map((res: Response) => res.json().books as Book[])
    }
  
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}
