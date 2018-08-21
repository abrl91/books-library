export interface Book {
    id: number,
    title: string,
    author: string,
    date: string,
    image?: string
}

export interface ActionBookDataInterface {
    book: Book;
    mode: string;
}

export enum ActionBookDataMode {
    Add = 'Add',
    Edit = 'Edit'
}