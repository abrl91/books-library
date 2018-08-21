import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BooksService } from '../books.service';
import { ActionBookDataInterface, ActionBookDataMode } from '../book';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-action-book',
  templateUrl: './action-book.component.html',
  styleUrls: ['./action-book.component.css']

})
export class ActionBookComponent implements OnInit {

  public addBookForm: FormGroup;
  private readonly images: Array<string> = [
    '../assets/images/male-code.jpg',
    '../assets/images/girl-code.jpg',
    '../assets/images/code.jpg',
    '../assets/images/code-love.jpg',
    '../assets/images/geek.jpg',
    '../assets/images/banana.jpg'
  ];

  constructor(private formBuilder: FormBuilder,
    private bs: BooksService,
    private dialogRef: MatDialogRef<ActionBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionBookDataInterface,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    const titleValidation = (control: AbstractControl): any => {
      if (control && control.value) {
        const valueLower = control.value.toLowerCase();
        const exsit = this.bs.booksList.some(el => el.title.toLowerCase() == valueLower);
        if (exsit) {
          const temp = this.data.book.title;
          return (temp && temp.toLowerCase() === valueLower)
            ? null : { alreadyTaken: true };
        } else return null;
      } else return null;
    }

    this.addBookForm = this.formBuilder.group({
      id: [this.data.book.id],
      title: [this.data.book.title, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), titleValidation]],
      author: [this.data.book.author, Validators.required],
      date: [this.data.book.date, Validators.required],
      image: [this.data.book.image],
    });
  }


  onSubmit() {
    if (this.addBookForm.valid) {
      if (this.data.mode == ActionBookDataMode.Add) {
        const random = Math.floor(Math.random() * 6);
        this.addBookForm.value.image = this.images[random]
        this.bs.addBook(this.addBookForm.value);
      } else if (this.data.mode == ActionBookDataMode.Edit) {
        this.bs.editBook(this.addBookForm.value);
      }
      this.dialogRef.close();
    }
  }

  get title() {
    return this.addBookForm.get('title');
  }

  get author() {
    return this.addBookForm.get('author');
  }

  get date() {
    return this.addBookForm.get('date');
  }
}



