import { useEffect, useState } from 'react';
import { getBooks } from '../services/bookAPI';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BookCard from '../pages/BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error('Failed to load books', err);
      setMessage('Failed to load books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (deletedBookId) => {
    setBooks((prev) => prev.filter((book) => book._id !== deletedBookId));
  };

  // Filter books by title or author (case-insensitive)
  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    return (
      (book.title && book.title.toLowerCase().includes(term)) ||
      (book.author && book.author.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="ml-64 pt-20 p-6 flex-grow">
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h2 className="text-3xl font-bold text-gray-800">📚 Book List</h2>
              {message && <p className="text-red-600 text-sm">{message}</p>}

              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-10">
                No books found. 📭
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    onDeleteSuccess={handleDelete}
                    onUpdateSuccess={fetchBooks}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookList;
