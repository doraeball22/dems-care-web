import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { BookService } from '../shared/book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  form: FormGroup;
  formType: 'new' | 'edit';
  submitBtnTxt: 'Create' | 'Update';  
  book: Book;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) { }

  ngOnInit() {
    this.setFormType();
    this.buidForm();
    this.getThisBook();
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
      required: "ตั้งชื่อหนังสือของคุณ"
    },
    bodyUrl: {
      required: "ใส่ลิ้ง url เนื้อหาของหนังสือ สามารถใส่ลิ้งของเว็บใด หรือเป็นลิ้ง pdf ก็ได้"
    },
    imageUrl: {
      required: "ใส่ลิ้ง url รูปภาพประกอบหนังสือ"
    },
    author: {
      required: "ใส่ชื่อผู้แต่งหนังสือที่คุณนำมา"
    }
  }

  private onSubmit(event) {
    event.preventDefault();
    // console.log(this.form.value);
    // console.log(this.form.get('body'));
    this.formType === 'new'? this.createBook() : this.updateBook();
  }

  private setFormType() {
    this.formType  = this.route.snapshot.data.formType;
  }

  private setSubmitBtnTxt() {
    this.submitBtnTxt = this.formType === 'new'? 'Create' : 'Update';
  }

  private createBook() {
    this.bookService
      .createBook(this.form.value)
      .subscribe(({ _id }: Book) => this.router.navigate(['/books']));
  }

  private updateBook() {
    const { id } = this.route.snapshot.params;
    this.bookService
      .updateBook(id, this.form.value)
      .subscribe(({ _id }: Book) => this.router.navigate(['/books']));
  }

  private getThisBook() {
    if(this.formType === 'new') return;

    const { id } = this.route.snapshot.params;

    this.bookService
    .getOneBook(id)
    .subscribe(({ _id, title, bodyUrl, author, imageUrl }: Book) => {
      this.form.setValue({ title, bodyUrl, author, imageUrl });
    });
  }

}
