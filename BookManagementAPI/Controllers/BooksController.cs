using Microsoft.AspNetCore.Mvc;
using BookManagementAPI.Models;
using BookManagementAPI.Services;

namespace BookManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        // GET: api/books
        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = _bookService.GetAllBooks();
            Console.WriteLine($"GET all books: returning {books.Count} books"); // Add logging
            return Ok(books);
        }

        // GET: api/books/5
        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _bookService.GetBookById(id);
            if (book == null)
                return NotFound($"Book with ID {id} not found");
            
            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public IActionResult CreateBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdBook = _bookService.AddBook(book);
            Console.WriteLine($"POST new book: Created book with ID {createdBook.Id}"); // Add logging
            return CreatedAtAction(nameof(GetBookById), new { id = createdBook.Id }, createdBook);
        }

        // PUT: api/books/5
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = _bookService.UpdateBook(id, book);
            if (!updated)
                return NotFound($"Book with ID {id} not found");

            Console.WriteLine($"PUT update book: Updated book with ID {id}"); // Add logging
            return NoContent();
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var deleted = _bookService.DeleteBook(id);
            if (!deleted)
                return NotFound($"Book with ID {id} not found");

            Console.WriteLine($"DELETE book: Deleted book with ID {id}"); // Add logging
            return NoContent();
        }
    }
}