import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMoreinfoComponent } from './video-moreinfo.component';

describe('VideoMoreinfoComponent', () => {
  let component: VideoMoreinfoComponent;
  let fixture: ComponentFixture<VideoMoreinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMoreinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMoreinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
