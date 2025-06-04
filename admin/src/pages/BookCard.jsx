// src/pages/BookCard.jsx
import React, { useState } from 'react';
import { Pencil, Trash2, Save, X } from 'lucide-react';

const BookCard = ({ book, onDeleteSuccess, onUpdateSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({ ...book });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('adminToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedBook),
      });

      if (res.ok) {
        setIsEditing(false);
        onUpdateSuccess();
      } else {
        console.error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/${book._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        onDeleteSuccess(book._id);
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleCancel = () => {
    setEditedBook({ ...book });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center pt-4">
        <img
          src={book.image || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={book.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {!isEditing ? (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={book.title}>
              {book.title}
            </h3>
            <p className="text-sm text-blue-600 truncate mb-1" title={book.category}>
              {book.category || 'No category'}
            </p>
            <p className="text-sm text-gray-700 line-clamp-3 mb-2" title={book.description}>
              {book.description || 'No description'}
            </p>
            <p className="text-sm text-gray-800 mb-1">
              <strong>Author:</strong> {book.author || 'Unknown'}
            </p>
            <p className="text-green-700 font-bold text-md mb-3">₹{book.price}</p>

            <div className="mt-auto flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-1"
              >
                <Pencil size={18} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-1"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              name="title"
              value={editedBook.title}
              onChange={handleChange}
              className="mb-2 p-2 border rounded-lg text-sm"
              placeholder="Title"
            />
            <input
              name="category"
              value={editedBook.category}
              onChange={handleChange}
              className="mb-2 p-2 border rounded-lg text-sm"
              placeholder="Category"
            />
            <textarea
              name="description"
              value={editedBook.description}
              onChange={handleChange}
              className="mb-2 p-2 border rounded-lg text-sm"
              rows="2"
              placeholder="Description"
            />
            <input
              name="author"
              value={editedBook.author}
              onChange={handleChange}
              className="mb-2 p-2 border rounded-lg text-sm"
              placeholder="Author"
            />
            <input
              name="price"
              type="number"
              value={editedBook.price}
              onChange={handleChange}
              className="mb-2 p-2 border rounded-lg text-sm"
              placeholder="Price"
            />

            <div className="mt-auto flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-1"
              >
                <Save size={18} /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center gap-1"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
