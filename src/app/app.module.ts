import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

// DEMs care component
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { BookComponent } from './book/book.component';
import { VideoComponent } from './video/video.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { ArticleFormComponent } from './article/article-form/article-form.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// DEMs care service
import { ArticleService } from './article/article.service';
import { ArticleMoreinfoComponent } from './article/article-moreinfo/article-moreinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    BookComponent,
    VideoComponent,
    QuizComponent,
    HomeComponent,
    ArticleFormComponent,
    ArticleListComponent,
    PageNotFoundComponent,
    ArticleMoreinfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
