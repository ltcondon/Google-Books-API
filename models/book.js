const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: [String],
  description: String,
  publishedDate: String,
  googleBookId: String,
  thumbnail: String,
  link: String,
  pageCount: String,
  subtitle: String

});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
