import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';
// import 'rxjs/Rx';

import { ArticleService } from '../shared/article.service'
import { Article } from '../shared/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles = new BehaviorSubject<Article[]>([]);
  // articles: Observable<Article[]>;
  private searchTerms = new Subject<string>();

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // this.getArticles();
    this.subscribeToParams();
    this.handleSearchTerm();

    // this.articles = this.searchTerms
    // .debounceTime(300)        // wait 300ms after each keystroke before considering the term
    // .distinctUntilChanged()   // ignore if next search term is same as previous
    // .switchMap(term => term   // switch to new observable each time the term changes
    //   // return the http search observable
    //   ? this.articleService.search(term)
    //   // or the observable of empty heroes if there was no search term
    //   : Observable.of<Article[]>([]))
    // .catch(error => {
    //   // TODO: add real error handling
    //   console.log(error);
    //   return Observable.of<Article[]>([]);
    // });
  }  

  private getArticles() {
    this.articleService
        .getArticles()
        .subscribe((articles: Article[]) => this.articles.next(articles));
  }

  private onDeleteArticle(article: Article): void {
    this.articleService
      .deleteArticle(article._id)
      .then(() => {
        this.getArticles();
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
        (query: string) => this.articleService
          .search(query)
      )
      .subscribe((articles: Article[]) => this.articles.next(articles));
  }  

  private subscribeToParams() {
    this.route.queryParams.subscribe(
      ({title}) => this.getArticles()
    );
  }

}
