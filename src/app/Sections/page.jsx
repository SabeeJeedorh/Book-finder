// pages/index.js
"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion"; 

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setBooks(res.data.items || []);
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 p-6">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        📚 Book Finder App
      </motion.h1>

      <motion.form
        onSubmit={searchBooks}
        className="flex justify-center mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books by title or author..."
          className="w-1/2 p-3 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-r-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Search
        </button>
      </motion.form>

      {loading && (
        <p className="text-center text-lg text-white animate-pulse">
          🔍 Searching for books...
        </p>
      )}

      {error && <p className="text-center text-red-800 font-bold">{error}</p>}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {books.map((book) => {
          const volumeInfo = book.volumeInfo;
          return (
            <motion.div
              key={book.id}
              className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {volumeInfo.imageLinks && (
                <img
                  src={volumeInfo.imageLinks.thumbnail}
                  alt={volumeInfo.title}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">
                  {volumeInfo.title.length > 50
                    ? volumeInfo.title.slice(0, 50) + "..."
                    : volumeInfo.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  {volumeInfo.authors?.join(", ")}
                </p>
                <Link href={`/book/${book.id}`}>
                  <span className="text-yellow-500 font-semibold hover:underline cursor-pointer">
                    More Info →
                  </span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
