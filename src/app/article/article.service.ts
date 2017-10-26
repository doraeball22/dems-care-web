import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Article } from './article';

@Injectable()
export class ArticleService {

  private headers = new Headers({'Content-Type': 'application/json'});
  // private url = `https://boncoding.xyz`;  // URL to web api
  private url = `http://localhost:3000`;

  constructor(private http: Http) { }

  getArticles(): Observable<Article[]>{
    return this.http
            .get(`${this.url}/api/articles`, {headers: this.headers})
            .map(response => response.json().articles as Article[]) 
  }

  getOneArticle(id: string): Observable<Article> {
    return this.http
      .get(`${this.url}/api/articles/${id}`, {headers: this.headers})
      .map((res: Response) => res.json().article as Article)
  }

  createArticle(article: Article): Observable<Article> {
    return this.http
      .post(`${this.url}/api/articles`, article, {headers: this.headers})
      .map((res: Response) => res.json().article as Article);
  }

  updateArticle(id: string, article: Article): Observable<Article> {

    return this.http
      .patch(`${this.url}/api/articles/${id}/edit`, article, {headers: this.headers})
      .map((res: Response) => res.json().article as Article);
  }

  search(term: string): Observable<Article[]> {
    return this.http
               .get(`${this.url}/api/articles/?title=${term}`)
               .map(response => response.json().data as Article[]);
  }

  deleteArticle(id: string): Promise<void> {
    return this.http.delete(`${this.url}/api/articles/${id}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}


    // getArticles(): Promise<Article[]> {
    
  //   return this.http
  //              .get(this.articlesUrl)
  //              .toPromise()
  //              .then(response => response.json().articles as Article[])
  //              .catch(this.handleError);
  // }

  // create(article: Article): Promise<Article> {
  //   return this.http
  //     .post(this.articlesUrl, JSON.stringify({
  //       name: name})
  //       , {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data as Article)
  //     .catch(this.handleError);
  // }
  