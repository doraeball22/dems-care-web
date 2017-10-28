import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';
// import 'rxjs/Rx';

import { VideoService } from '../shared/video.service'
import { Video } from '../shared/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  videos = new BehaviorSubject<Video[]>([]);
  private searchTerms = new Subject<string>();

  constructor(private videoService: VideoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subscribeToParams();
    this.handleSearchTerm();
  }  

  private getVideos() {
    this.videoService
        .getVideos()
        .subscribe((videos: Video[]) => this.videos.next(videos));
  }

  private onDeleteVideo(video: Video): void {
    this.videoService
      .deleteVideo(video._id)
      .then(() => {
        this.getVideos();
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
        (query: string) => this.videoService
          .search(query)
      )
      .subscribe((videos: Video[]) => this.videos.next(videos));
  }  

  private subscribeToParams() {
    this.route.queryParams.subscribe(
      ({title}) => this.getVideos()
    );
  }

}
