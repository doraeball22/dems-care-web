import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/Rx';

import { ArticleService } from '../article.service'

import { Article } from '../article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[];

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService
        .getArticles()
        .subscribe(articles => this.articles = articles);
  }

  onDeleteArticle(article: Article): void {
    this.articleService
      .deleteArticle(article._id)
      .then(() => {
        this.router.navigate(['/articles'])
      });
  }

}
