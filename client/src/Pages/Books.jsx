import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const categories = ['All', 'Novel', 'Business', 'Science', 'History','Fiction','Others'];

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/books`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setBooks(data || []);
      } catch (err) {
        setError(true);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesCategory =
        selectedCategory === 'All' || book.category === selectedCategory;
      const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredBooks(filtered);
  }, [books, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-white p-6 ">
      {/* Search Input */}
      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-[8px] border font-medium ${selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Cards */}
      <div className="max-w-6xl mx-auto px-2 grid gap-7 place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500">Failed to fetch books.</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No books found.</p>
        )}
      </div>

    </div>
  );
}
