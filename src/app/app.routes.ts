import { Routes, CanActivate, ActivatedRoute } from '@angular/router';

// DEMS care component
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { BookComponent } from './book/book.component';
import { VideoComponent } from './video/video.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ArticleFormComponent } from './article/article-form/article-form.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleMoreinfoComponent } from './article/article-moreinfo/article-moreinfo.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },

    { 
        path: 'articles',
        component: ArticleComponent,
        children: [
            {
              path: '', 
              component: ArticleListComponent
            },
            {
              path: 'new', 
              component: ArticleFormComponent,
              data: { formType: 'new' }
            },
            {
              path: ':id/edit',
              component: ArticleFormComponent,
              data: { formType: 'edit' }
            },
            {
              path: ':id',
              component: ArticleMoreinfoComponent
            }            
          ]
    },

    { path: 'videos', component: VideoComponent },

    { path: 'books', component: BookComponent },

    { path: 'quizs', component: QuizComponent },

    { path: '**', component: PageNotFoundComponent }
  ];