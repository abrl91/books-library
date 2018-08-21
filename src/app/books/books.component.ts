import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionBookComponent } from '../action-book/action-book.component';
import { take } from 'rxjs/operators';
import { Book, ActionBookDataInterface, ActionBookDataMode } from '../book';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  private isPopupOpen = false;

  constructor(public bs: BooksService,
    private dialog?: MatDialog) { }

  ngOnInit() {
  }

  addBookButton() {
    this.isPopupOpen = true;

    const data: ActionBookDataInterface = {
      book: {} as Book,
      mode: ActionBookDataMode.Add
    }

    const dialogRef = this.dialog.open(ActionBookComponent, {
      data: data
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(() => this.isPopupOpen = false);
  }

  editBook(book: Book) {
    this.isPopupOpen = true;
    const data: ActionBookDataInterface = {
      book: book,
      mode: ActionBookDataMode.Edit
    }
    const dialogRef = this.dialog.open(ActionBookComponent, {
      data: data
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(() => this.isPopupOpen = false);
  }

  deleteBook(id: number) {
    this.isPopupOpen = true;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.bs.deleteBook(id);
        } else {
          this.isPopupOpen = false;
        }
      });
  }
}
