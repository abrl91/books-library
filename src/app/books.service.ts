import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "./book";
import { Observable, config } from "rxjs";
import { take } from 'rxjs/operators';

@Injectable()
export class BooksService {
    private readonly books_data: string = "../assets/data/books.json";
    public booksList: Array<Book> = [];
    private idCounter: number = 7;

    constructor(private http: HttpClient) {
        this.getBooksFromApi()
            .pipe(take(1))
            .subscribe(data => this.booksList = data);
    }

    getBooksFromApi(): Observable<Book[]> {
        return this.http.get<Book[]>(this.books_data);
    }

    addBook(book: Book) {
        book.id = this.idCounter;
        ++this.idCounter;
        this.booksList.push(book);
    }

    editBook(book: Book) {
        const index = this.booksList.findIndex(eb => eb.id === book.id);
        if (index != -1)
            this.booksList[index] = book;
    }

    deleteBook(id: number) {
        this.booksList = this.booksList.filter(el => el.id !== id);
    }

}
