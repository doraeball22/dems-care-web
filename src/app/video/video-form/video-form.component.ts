import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { VideoService } from '../shared/video.service';
import { Video } from '../shared/video';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {

  form: FormGroup;
  formType: 'new' | 'edit';
  submitBtnTxt: 'Create' | 'Update';  
  video: Video;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private videoService: VideoService) { }

  ngOnInit() {
    this.setFormType();
    this.buidForm();
    this.getThisVideo();
    this.setSubmitBtnTxt();

    this.form
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(() => this.onValueChanged());

    this.onValueChanged();
  }

  private buidForm() {
    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        bodyUrl: ['', Validators.required],
        imageUrl: ['', Validators.required],
        author: ['', Validators.required]
      }
    ); 
  }

  private onValueChanged() {
    if(!this.form) return;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.form.get(field);

      if (control  && !control.valid) {
        const messages = this.validationMessages[field];

        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  private formErrors = {
    title: "",
    bodyUrl: "",
    imageUrl: "",
    author: ""
  }

  private validationMessages = {
    title: {
      required: "ตั้งชื่อวิดีโอของคุณ"
    },
    bodyUrl: {
      required: "ใส่ลิ้ง url เนื้อหาของวิดีโอ สามารถใส่ลิ้งของเว็บใด หรือเป็นลิ้ง pdf ก็ได้"
    },
    imageUrl: {
      required: "ใส่ลิ้ง url รูปภาพประกอบวิดีโอ"
    },
    author: {
      required: "ใส่ชื่อผู้แต่งวิดีโอที่คุณนำมา"
    }
  }

  private onSubmit(event) {
    event.preventDefault();
    // console.log(this.form.value);
    // console.log(this.form.get('body'));
    this.formType === 'new'? this.createVideo() : this.updateVideo();
  }

  private setFormType() {
    this.formType  = this.route.snapshot.data.formType;
  }

  private setSubmitBtnTxt() {
    this.submitBtnTxt = this.formType === 'new'? 'Create' : 'Update';
  }

  private createVideo() {
    this.videoService
      .createVideo(this.form.value)
      .subscribe(({ _id }: Video) => this.router.navigate(['/videos']));
  }

  private updateVideo() {
    const { id } = this.route.snapshot.params;
    this.videoService
      .updateVideo(id, this.form.value)
      .subscribe(({ _id }: Video) => this.router.navigate(['/videos']));
  }

  private getThisVideo() {
    if(this.formType === 'new') return;

    const { id } = this.route.snapshot.params;

    this.videoService
    .getOneVideo(id)
    .subscribe(({ _id, title, bodyUrl, author, imageUrl }: Video) => {
      this.form.setValue({ title, bodyUrl, author, imageUrl });
    });
  }

}
