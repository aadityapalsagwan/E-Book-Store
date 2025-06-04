import { useState } from 'react';
import { addBook } from '../services/bookAPI';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const AddBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (image) formData.append('image', image);

      await addBook(formData);
      setMessage('✅ Book added successfully!');
      setForm({ title: '', author: '', price: '', description: '', category: '' });
      setImage(null);
      setPreview(null);
    } catch (err) {
      setMessage('❌ Error adding book.');
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 bg-gray-50 min-h-screen flex items-center justify-center m-[55px]">
          <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📘 Add New Book</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Image Upload */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Upload Book Cover
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 h-40 object-cover rounded-lg shadow"
                  />
                )}
              </div>

              {/* Book Title */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">📖 Book Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., The Alchemist"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">✍️ Author</label>
                <input
                  type="text"
                  name="author"
                  placeholder="e.g., Paulo Coelho"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">📂 Category</label>
                <select
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Novel">Novel</option>
                  <option value="NCERT">Science</option>
                  <option value="NCERT">Fiction</option>
                  <option value="Business">Business Book</option>
                  <option value="Business">History</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">📝 Description</label>
                <textarea
                  name="description"
                  placeholder="Short description about the book"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Price */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">💰 Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g., 399"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
              >
                ➕ Add Book
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddBook;
