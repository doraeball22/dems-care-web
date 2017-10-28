import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMoreinfoComponent } from './quiz-moreinfo.component';

describe('QuizMoreinfoComponent', () => {
  let component: QuizMoreinfoComponent;
  let fixture: ComponentFixture<QuizMoreinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizMoreinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMoreinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
