import { Routes, CanActivate, ActivatedRoute } from '@angular/router';

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

// Videos
import { VideoComponent } from './video/video.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { VideoFormComponent } from './video/video-form/video-form.component';
import { VideoMoreinfoComponent } from './video/video-moreinfo/video-moreinfo.component';

// Books
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookMoreinfoComponent } from './book/book-moreinfo/book-moreinfo.component';

// Quizs
import { QuizComponent } from './quiz/quiz.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizFormComponent } from './quiz/quiz-form/quiz-form.component';
import { QuizMoreinfoComponent } from './quiz/quiz-moreinfo/quiz-moreinfo.component';

/** END DEMs care component and service **/

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

    { 
      path: 'videos',
      component: VideoComponent,
      children: [
          {
            path: '', 
            component: VideoListComponent
          },
          {
            path: 'new', 
            component: VideoFormComponent,
            data: { formType: 'new' }
          },
          {
            path: ':id/edit',
            component: VideoFormComponent,
            data: { formType: 'edit' }
          },
          {
            path: ':id',
            component: VideoMoreinfoComponent
          }            
        ]
    },

  { 
    path: 'books',
    component: BookComponent,
    children: [
        {
          path: '', 
          component: BookListComponent
        },
        {
          path: 'new', 
          component: BookFormComponent,
          data: { formType: 'new' }
        },
        {
          path: ':id/edit',
          component: BookFormComponent,
          data: { formType: 'edit' }
        },
        {
          path: ':id',
          component: BookMoreinfoComponent
        }            
      ]
  },

    { path: 'quizs', component: QuizComponent },

    { path: '**', component: PageNotFoundComponent }
    
  ];