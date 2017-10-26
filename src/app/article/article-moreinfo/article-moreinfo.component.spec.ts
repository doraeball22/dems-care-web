import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMoreinfoComponent } from './article-moreinfo.component';

describe('ArticleMoreinfoComponent', () => {
  let component: ArticleMoreinfoComponent;
  let fixture: ComponentFixture<ArticleMoreinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMoreinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMoreinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
