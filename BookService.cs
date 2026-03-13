using BookManagementAPI.Models;

namespace BookManagementAPI.Services
{
    public class BookService
    {
        private readonly List<Book> _books = new List<Book>();
        private int _nextId = 1;

        public BookService()
        {
            // Add some sample books for testing
            _books.Add(new Book
            {
                Id = _nextId++,
                Title = "The Great Gatsby",
                Author = "F. Scott Fitzgerald",
                ISBN = "978-0743273565",
                PublicationDate = new DateTime(1925, 4, 10)
            });

            _books.Add(new Book
            {
                Id = _nextId++,
                Title = "To Kill a Mockingbird",
                Author = "Harper Lee",
                ISBN = "978-0061120084",
                PublicationDate = new DateTime(1960, 7, 11)
            });
        }

        // Get all books
        public List<Book> GetAllBooks()
        {
            return _books.ToList();
        }

        // Get a single book by id
        public Book? GetBookById(int id)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }

        // Add a new book
        public Book AddBook(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return book;
        }

        // Update an existing book
        public bool UpdateBook(int id, Book updatedBook)
        {
            var existingBook = _books.FirstOrDefault(b => b.Id == id);
            if (existingBook == null)
                return false;

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.PublicationDate = updatedBook.PublicationDate;

            return true;
        }

        // Delete a book
        public bool DeleteBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return false;

            _books.Remove(book);
            return true;
        }
    }
}