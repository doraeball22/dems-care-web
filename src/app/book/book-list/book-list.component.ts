import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';
// import 'rxjs/Rx';

import { BookService } from '../shared/book.service'
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books = new BehaviorSubject<Book[]>([]);
  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subscribeToParams();
    this.handleSearchTerm();
  }  

  private getBooks() {
    this.bookService
        .getBooks()
        .subscribe((books: Book[]) => this.books.next(books));
  }

  private onDeleteBook(book: Book): void {
    this.bookService
      .deleteBook(book._id)
      .then(() => {
        this.getBooks();
      });
  }

  private search(term: string): void {
    this.searchTerms.next(term);
  }

  private handleSearchTerm() {
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(
        (query: string) => this.bookService
          .search(query)
      )
      .subscribe((books: Book[]) => this.books.next(books));
  }  

  private subscribeToParams() {
    this.route.queryParams.subscribe(
      ({title}) => this.getBooks()
    );
  }

}
