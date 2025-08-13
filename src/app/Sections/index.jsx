// pages/index.js
import { useState } from "react"; 
// This lets our app remember things, like a notepad for storing what the user types or sees.

import axios from "axios"; 
// This is like a helper that can go to a website and bring back information.

import Link from "next/link"; 
// This lets us make clickable links that take us to another page in our app.

export default function Home() { 
  // This is our main function for the Home page.
  
  const [query, setQuery] = useState("");
  // "query" is what the user types in the search box.
  // "setQuery" is a magic pen we use to change it.
  // At first, it's just an empty string "".

  const [books, setBooks] = useState([]);
  // "books" will store the list of books we find.
  // It starts as an empty list [].

  const [loading, setLoading] = useState(false);
  // "loading" is like a flag that says "We are still looking for books..."
  // At first, it's false (not looking yet).

  const [error, setError] = useState("");
  // "error" will hold any message if something goes wrong.

  const searchBooks = async (e) => { 
    // This is our magic search function.
    // "async" means it can wait for the internet to give us data.

    e.preventDefault(); 
    // This stops the page from refreshing when we click search.

    if (!query) return; 
    // If the search box is empty, just stop and do nothing.

    setLoading(true); 
    // Tell the app: "We are now looking for books."

    setError(""); 
    // Clear any old error messages.

    try { 
      // Try to do this:
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      // Ask the Google Books website for books that match what the user typed.
      // Wait for the answer and put it in "res".

      setBooks(res.data.items || []);
      // Save the list of books we got.
      // If there are no books, use an empty list instead.

    } catch (err) { 
      // If something goes wrong:
      setError("Failed to fetch books. Please try again.");
      // Show this error message.

    } finally { 
      // Whether it works or fails:
      setLoading(false);
      // Stop the "loading" flag.
    }
  };

  return ( 
    // This is what we want to show on the screen.
    <div className="min-h-screen bg-red-500 p-6">
      {/* A big red background with some space inside (padding). */}
      
      <h1 className="text-3xl font-bold text-center mb-6">Book Finder App</h1>
      {/* Big title text in the middle of the page. */}

      <form onSubmit={searchBooks} className="flex justify-center mb-6">
        {/* A search box and button in a row, centered. */}

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books by title or author..."
          className="w-1/2 p-2 border rounded-l"
        />
        {/* The box where you type what you’re looking for.
            It changes "query" every time you type. */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
        {/* A blue button that says "Search".
            When clicked, it runs the searchBooks function. */}
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {/* If loading is true, show "Loading..." in the middle. */}

      {error && <p className="text-center text-red-500">{error}</p>}
      {/* If there’s an error, show it in red text. */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* A grid layout for the book results. 
            Changes how many columns there are depending on screen size. */}

        {books.map((book) => { 
          // For every book we found, do this:
          const volumeInfo = book.volumeInfo;
          // "volumeInfo" is like the book's details.

          return (
            <div key={book.id} className="bg-white shadow rounded p-4">
              {/* A white box with rounded corners for each book. */}

              {volumeInfo.imageLinks && (
                <img
                  src={volumeInfo.imageLinks.thumbnail}
                  alt={volumeInfo.title}
                  className="mb-4 w-full h-60 object-cover"
                />
              )}
              {/* If the book has a picture, show it. */}

              <h2 className="font-bold text-lg mb-2">
                {volumeInfo.title.length > 50
                  ? volumeInfo.title.slice(0, 50) + "..."
                  : volumeInfo.title}
              </h2>
              {/* Show the book title.
                  If it’s too long (more than 50 letters), cut it and add "...". */}

              <p className="text-sm mb-2">{volumeInfo.authors?.join(", ")}</p>
              {/* Show the author(s) names, separated by commas. */}

              <Link href={`/book/${book.id}`}>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  More Info
                </span>
              </Link>
              {/* A clickable "More Info" link that takes you to the book’s page. */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
