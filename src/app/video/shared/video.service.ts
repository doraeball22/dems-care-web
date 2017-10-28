import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Video } from './video';

@Injectable()
export class VideoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  
    constructor(private http: Http) { }
  
    getVideos(): Observable<Video[]>{
      return this.http
              .get(`api/videos`, {headers: this.headers})
              .map(response => response.json().videos as Video[]) 
    }
  
    getOneVideo(id: string): Observable<Video> {
      return this.http
        .get(`api/videos/${id}`, {headers: this.headers})
        .map((res: Response) => res.json().video as Video)
    }
  
    createVideo(video: Video): Observable<Video> {
      return this.http
        .post(`api/videos`, video, {headers: this.headers})
        .map((res: Response) => res.json().video as Video);
    }
  
    updateVideo(id: string, video: Video): Observable<Video> {
  
      return this.http
        .patch(`api/videos/${id}/edit`, video, {headers: this.headers})
        .map((res: Response) => res.json().video as Video);
    }
  
    deleteVideo(id: string): Promise<void> {
      return this.http.delete(`api/videos/${id}`, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
  
    search(term: string): Observable<Video[]> {
      return this.http
                 .get(`api/videos/search?title=${term}`, {headers: this.headers})
                 .map((res: Response) => res.json().videos as Video[])
    }
  
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }


}
