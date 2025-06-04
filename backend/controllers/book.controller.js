const Book = require('../models/Book');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

// Multer config: store file in memory as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image buffer to Cloudinary using stream
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'book_images' }, // optional Cloudinary folder
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer); // pass buffer into stream
  });
};

exports.upload = upload; // exported to use in route

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, price, description, category } = req.body;

    let imageUrl = '';

    if (req.file) {
      const uploadResult = await streamUpload(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    } else {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const book = await Book.create({
      title,
      author,
      price,
      description,
      category,
      image: imageUrl,
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};


exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('reviews');

    const booksWithRatings = books.map(book => {
      const totalRatings = book.reviews.length;
      const avgRating = totalRatings > 0
        ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
        : 0;

      const bookObj = book.toObject();
      return {
        ...bookObj,
        avgRating: avgRating.toFixed(1),
        totalRatings,
      };
    });

    res.status(200).json(booksWithRatings);
  } catch (err) {
    next(err);
  }
};


exports.addReview = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { user, comment, rating } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.reviews.push({ user, comment, rating });
    await book.save();
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

// ✅ Update book by ID
exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};

// ✅ Delete book by ID
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
};


// ✅ Get a single book by ID including reviews and reviewer name
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id)
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'name' }
      });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};
