import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // IMPORTANT: Add these imports
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book: Book | null = null;
  @Input() isEditing = false;
  @Output() save = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  bookForm: FormGroup;

  // Add these getter methods
  get titleControl() { return this.bookForm.get('title'); }
  get authorControl() { return this.bookForm.get('author'); }
  get isbnControl() { return this.bookForm.get('isbn'); }
  get publicationDateControl() { return this.bookForm.get('publicationDate'); }

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9-]+$')]],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.book) {
      let formattedDate = '';
      if (this.book.publicationDate) {
        const date = new Date(this.book.publicationDate);
        formattedDate = date.toISOString().split('T')[0];
      }

      this.bookForm.patchValue({
        id: this.book.id,
        title: this.book.title,
        author: this.book.author,
        isbn: this.book.isbn,
        publicationDate: formattedDate
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;
      const book: Book = {
        id: formValue.id,
        title: formValue.title,
        author: formValue.author,
        isbn: formValue.isbn,
        publicationDate: new Date(formValue.publicationDate)
      };
      this.save.emit(book);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}