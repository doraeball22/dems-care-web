import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/Rx';

import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  form: FormGroup;
  formType: 'new' | 'edit';
  submitBtnTxt: 'Create' | 'Update';  
  article: Article;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.setFormType();
    this.buidForm();
    this.getThisArticle();
    this.setSubmitBtnTxt();

    this.form
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(() => this.onValueChanged());

    this.onValueChanged();
  }

  buidForm() {
    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        bodyUrl: ['', Validators.required],
        imageUrl: ['', Validators.required],
        author: ['', Validators.required]
      }
    ); 
  }

  onValueChanged() {
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

  formErrors = {
    title: "",
    bodyUrl: "",
    imageUrl: "",
    author: ""
  }

  validationMessages = {
    title: {
      required: "ตั้งชื่อบทความของคุณ"
    },
    bodyUrl: {
      required: "ใส่ลิ้ง url เนื้อหาของบทความ สามารถใส่ลิ้งของเว็บใด หรือเป็นลิ้ง pdf ก็ได้"
    },
    imageUrl: {
      required: "ใส่ลิ้ง url รูปภาพประกอบบทความ"
    },
    author: {
      required: "ใส่ชื่อผู้แต่งบทความที่คุณนำมา"
    }
  }

  onSubmit(event) {
    event.preventDefault();
    // console.log(this.form.value);
    // console.log(this.form.get('body'));
    this.formType === 'new'? this.createArticle() : this.updateArticle();
  }

  private setFormType() {
    this.formType  = this.route.snapshot.data.formType;
  }

  private setSubmitBtnTxt() {
    this.submitBtnTxt = this.formType === 'new'? 'Create' : 'Update';
  }

  createArticle() {
    this.articleService
      .createArticle(this.form.value)
      .subscribe(({ _id }: Article) => this.router.navigate(['/articles']));
  }

  updateArticle() {
    const { id } = this.route.snapshot.params;
    this.articleService
      .updateArticle(id, this.form.value)
      .subscribe(({ _id }: Article) => this.router.navigate(['/articles']));
  }

  getThisArticle() {
    if(this.formType === 'new') return;

    const { id } = this.route.snapshot.params;

    this.articleService
    .getOneArticle(id)
    .subscribe(({ _id, title, bodyUrl, author, imageUrl }: Article) => {
      this.form.setValue({ title, bodyUrl, author, imageUrl });
    });
  }


}
