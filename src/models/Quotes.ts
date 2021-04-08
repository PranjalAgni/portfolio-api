import mongoose from "mongoose";

interface IQuotes extends mongoose.Document {
  content: string;
  author: string;
  authorSlug: string;
  tags: string[];
  length: number;
}

const QuoteSchema = new mongoose.Schema({
  // The quotation text
  content: { type: String, required: true },
  // The full display name of the quote's author
  author: { type: String, required: true },
  // The author `slug` is a unique ID derived from the author's name.
  authorSlug: { type: String, required: true },
  // An array of tags for this quote
  tags: { type: [String], required: true },
  // The length of the quote (total number of characters)
  length: { type: Number, required: true }
});

const Quotes = mongoose.model<IQuotes>("Quote", QuoteSchema);

export default Quotes;
