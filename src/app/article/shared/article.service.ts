import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Article } from './article';

@Injectable()
export class ArticleService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getArticles(): Observable<Article[]>{
    return this.http
            .get(`api/articles`, {headers: this.headers})
            .map(response => response.json().articles as Article[]) 
  }

  getOneArticle(id: string): Observable<Article> {
    return this.http
      .get(`api/articles/${id}`, {headers: this.headers})
      .map((res: Response) => res.json().article as Article)
  }

  createArticle(article: Article): Observable<Article> {
    return this.http
      .post(`api/articles`, article, {headers: this.headers})
      .map((res: Response) => res.json().article as Article);
  }

  updateArticle(id: string, article: Article): Observable<Article> {

    return this.http
      .patch(`api/articles/${id}/edit`, article, {headers: this.headers})
      .map((res: Response) => res.json().article as Article);
  }

  deleteArticle(id: string): Promise<void> {
    return this.http.delete(`api/articles/${id}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  search(term: string): Observable<Article[]> {
    return this.http
               .get(`api/articles/search?title=${term}`, {headers: this.headers})
               .map((res: Response) => res.json().articles as Article[])
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

  