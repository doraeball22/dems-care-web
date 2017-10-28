import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';

// Home
import { HomeComponent } from './home/home.component';
// Other...
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/** DEMs care component and service**/
// Articles
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleFormComponent } from './article/article-form/article-form.component';
import { ArticleMoreinfoComponent } from './article/article-moreinfo/article-moreinfo.component';
import { ArticleService } from './article/shared/article.service';

// Videos
import { VideoComponent } from './video/video.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { VideoFormComponent } from './video/video-form/video-form.component';
import { VideoMoreinfoComponent } from './video/video-moreinfo/video-moreinfo.component';
import { VideoService } from './video/shared/video.service';

// Books
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookMoreinfoComponent } from './book/book-moreinfo/book-moreinfo.component';
import { BookService } from './book/shared/book.service';

// Quizs
import { QuizComponent } from './quiz/quiz.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizFormComponent } from './quiz/quiz-form/quiz-form.component';
import { QuizMoreinfoComponent } from './quiz/quiz-moreinfo/quiz-moreinfo.component';

/** END DEMs care component and service **/


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ArticleComponent,
    ArticleFormComponent,
    ArticleListComponent,
    ArticleMoreinfoComponent,
    BookComponent,
    BookListComponent,
    BookFormComponent,
    BookMoreinfoComponent,
    VideoComponent,
    VideoMoreinfoComponent,
    VideoListComponent,
    VideoFormComponent,
    QuizComponent,
    QuizFormComponent,
    QuizListComponent,
    QuizMoreinfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ArticleService,
    VideoService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
