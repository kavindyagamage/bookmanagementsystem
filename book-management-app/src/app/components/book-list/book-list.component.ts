import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookFormComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  showForm = false;
  isEditing = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('Loading books...');
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log('Books loaded:', this.books);
      },
      error: (error) => {
        console.error('Error loading books:', error);
        alert('Error loading books. Please check if the backend is running on port 7002');
      }
    });
  }

  openAddForm(): void {
    this.selectedBook = {
      id: 0,
      title: '',
      author: '',
      isbn: '',
      publicationDate: new Date()
    };
    this.isEditing = false;
    this.showForm = true;
  }

  openEditForm(book: Book): void {
    this.selectedBook = { ...book };
    this.isEditing = true;
    this.showForm = true;
  }

  saveBook(book: Book): void {
    console.log('Saving book:', book);
    
    if (this.isEditing) {
      // UPDATE EXISTING BOOK
      this.bookService.updateBook(book.id, book).subscribe({
        next: () => {
          console.log('Book updated successfully');
          this.loadBooks();  // IMPORTANT: Reload the list
          this.cancelForm();
          alert('Book updated successfully!');
        },
        error: (error) => {
          console.error('Error updating book:', error);
          alert('Error updating book. Check console for details.');
        }
      });
    } else {
      // ADD NEW BOOK
      this.bookService.addBook(book).subscribe({
        next: (response) => {
          console.log('Book added successfully:', response);
          this.loadBooks();  // IMPORTANT: Reload the list
          this.cancelForm();
          alert('Book added successfully!');
        },
        error: (error) => {
          console.error('Error adding book:', error);
          alert('Error adding book. Check console for details.');
        }
      });
    }
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          console.log('Book deleted successfully');
          this.loadBooks();  // IMPORTANT: Reload the list
          alert('Book deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          alert('Error deleting book. Check console for details.');
        }
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.selectedBook = null;
    this.isEditing = false;
  }
}