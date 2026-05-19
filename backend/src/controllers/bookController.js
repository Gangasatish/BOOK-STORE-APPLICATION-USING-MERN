import Book from '../models/bookModel.js';
import User from '../models/userModel.js';
import { parsePagination } from '../utils/query.js';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res, next) => {
    try {
        const usePagination = req.query.paginate === 'true' || req.query.page || req.query.limit;
        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category ? { category: req.query.category } : {};

        const filter = { ...keyword, ...category };

        if (usePagination) {
            const { page, limit, skip } = parsePagination(req.query);
            const [total, books] = await Promise.all([
                Book.countDocuments(filter),
                Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            ]);

            res.json({
                items: books,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit),
                },
            });
            return;
        }

        const books = await Book.find(filter).sort({ createdAt: -1 }).lean();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).lean();

        if (book) {
            res.json(book);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res, next) => {
    try {
        const {
            title,
            author,
            price,
            description,
            image,
            category,
            countInStock,
        } = req.body;

        const book = new Book({
            title: title || 'Sample Book',
            author: author || 'Sample Author',
            price: price ?? 0,
            user: req.user._id,
            image: image || '/images/sample.jpg',
            category: category || 'Sample Category',
            countInStock: countInStock ?? 0,
            numReviews: 0,
            description: description || 'Sample description',
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res, next) => {
    try {
        const { title, author, price, description, image, category, countInStock } =
            req.body;

        const book = await Book.findById(req.params.id);

        if (book) {
            book.title = title;
            book.author = author;
            book.price = price;
            book.description = description;
            book.image = image;
            book.category = category;
            book.countInStock = countInStock;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        const book = await Book.findById(req.params.id);

        if (book) {
            const alreadyReviewed = book.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Book already reviewed');
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            book.reviews.push(review);
            book.numReviews = book.reviews.length;
            book.rating =
                book.reviews.reduce((acc, item) => item.rating + acc, 0) /
                book.reviews.length;

            await book.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        next(error);
    }
};

import booksData from '../data/books.js';

// @desc    Seed books safely
// @route   POST /api/books/seed
// @access  Public (temporary)
const seedBooksData = async (req, res, next) => {
    try {
        // Find admin user
        const adminUser = await User.findOne({ role: 'admin' });
        const adminId = adminUser ? adminUser._id : null;

        // Get existing book titles
        const existingBooks = await Book.find({});
        const existingTitles = existingBooks.map(b => b.title);

        const newBooks = booksData.filter(b => !existingTitles.includes(b.title)).map(book => {
            return { ...book, user: adminId };
        });

        if (newBooks.length > 0) {
            await Book.insertMany(newBooks);
            res.json({ message: `Successfully added ${newBooks.length} new books.`, inserted: newBooks.length });
        } else {
            res.json({ message: 'No new books to add, all 30 are already present.' });
        }
    } catch (error) {
        next(error);
    }
};

export {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    createBookReview,
    seedBooksData,
};
