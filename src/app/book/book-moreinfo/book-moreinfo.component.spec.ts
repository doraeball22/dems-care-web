import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMoreinfoComponent } from './book-moreinfo.component';

describe('BookMoreinfoComponent', () => {
  let component: BookMoreinfoComponent;
  let fixture: ComponentFixture<BookMoreinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMoreinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMoreinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
