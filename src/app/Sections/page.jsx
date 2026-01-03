"use client"
import Link from 'next/link'
import { useState, useEffect } from "react";
import { Search, Clock, Star, TrendingUp, ChevronLeft, ChevronRight, Menu, User, Bell, MoreHorizontal, X, History, Heart, BookOpen, Calendar, User as UserIcon, Globe, Bookmark, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = require('next/navigation').useRouter();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authorOfWeek, setAuthorOfWeek] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [booksOfYear, setBooksOfYear] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [bookDetailsLoading, setBookDetailsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const handleLogout = () => {
    router.push("/sections/Homepage");
  };

  // Load browsing history and recent searches from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('browsingHistory') || '[]');
    const savedRecentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setBrowsingHistory(savedHistory);
    setRecentSearches(savedRecentSearches);
  }, []);

  // Save browsing history and recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('browsingHistory', JSON.stringify(browsingHistory));
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [browsingHistory, recentSearches]);

  // Add search to browsing history and recent searches
  const addToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return;

    const historyItem = {
      id: Date.now(),
      query: searchTerm,
      timestamp: new Date().toLocaleString(),
      date: new Date().toISOString().split('T')[0]
    };

    // Add to browsing history
    setBrowsingHistory(prev => {
      const filtered = prev.filter(item => item.query.toLowerCase() !== searchTerm.toLowerCase());
      return [historyItem, ...filtered].slice(0, 20);
    });

    // Add to recent searches (limited to last 5 searches)
    // setRecentSearches(prev => {
    //   const filtered = prev.filter(item => item.query.toLowerCase() !== searchTerm.toLowerCase());
    //   return [historyItem, ...filtered].slice(0, 5);
    // });
  };

  // Clear search and results
  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
  };

  // Clear browsing history
  const clearHistory = () => {
    setBrowsingHistory([]);
    setShowHistory(false);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    setShowRecentSearches(false);
  };

  // Delete specific history item
  const deleteHistoryItem = (id) => {
    setBrowsingHistory(prev => prev.filter(item => item.id !== id));
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  // Group history by date
  const groupedHistory = browsingHistory.reduce((groups, item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  // Format date for display
  const formatDate = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (dateString === today) return "Today";
    if (dateString === yesterday) return "Yesterday";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fetch book details
  const fetchBookDetails = async (bookId) => {
    setBookDetailsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      const data = await response.json();
      setSelectedBook(data);
      setShowBookDetails(true);
    } catch (error) {
      console.error('Failed to fetch book details:', error);
    } finally {
      setBookDetailsLoading(false);
    }
  };

  // Close book details modal
  const closeBookDetails = () => {
    setShowBookDetails(false);
    setSelectedBook(null);
  };

  // Mock data for featured books carousel
  const mockFeaturedBooks = [
    {
      id: "feat1",
      title: "Attack of The Planet",
      author: "by Sandra Brown",
      rating: 4.5,
      reviews: "1,250 reviews",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
    },
    {
      id: "feat2",
      title: "BIG MAGIC: Creative Living",
      author: "by Elizabeth Gilbert",
      rating: 4.8,
      reviews: "2,420 reviews",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "bg-gradient-to-br from-yellow-400 to-pink-500",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
    },
    {
      id: "feat3",
      title: "Ten Thousand Skies Above You",
      author: "by Claudia Gray",
      rating: 4.3,
      reviews: "890 reviews",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "bg-gradient-to-br from-blue-400 to-purple-600",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop"
    }
  ];

  // Mock authors of the week
  const mockAuthors = [
    { name: "Sebastian Jeremy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" },
    { name: "Jonathan Doe", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" },
    { name: "Angeline Summer", avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=50&h=50&fit=crop&crop=face" },
    { name: "Noah Jones", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" },
    { name: "Tommy Adam", avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=50&h=50&fit=crop&crop=face" },
    { name: "Ian Cassandra", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" }
  ];

  // Mock popular books by genre
  const allPopularBooks = [
    {
      id: "pop1",
      title: "Act Like It",
      author: "by Lucy Parker",
      rating: 4.2,
      reviews: "1,123 reviews",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
      genre: "Fiction",
      likes: "Samantha William and 2 other friends like this",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: "pop2",
      title: "Alone On The Wall",
      author: "by David Roberts",
      rating: 4.7,
      reviews: "2,340 reviews",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
      genre: "Biography",
      likes: "Kimberly Jones likes this",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: "pop3",
      title: "The Science of Everything",
      author: "by Dr. Sarah Wilson",
      rating: 4.6,
      reviews: "1,876 reviews",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=280&fit=crop",
      genre: "Science",
      likes: "Adam and Kimberly like this",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: "pop4",
      title: "Business Mastery",
      author: "by John Smith",
      rating: 4.4,
      reviews: "967 reviews",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
      genre: "Business",
      likes: "Samantha William and 2 other friends like this",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: "pop5",
      title: "Thinking Deep",
      author: "by Maria Garcia",
      rating: 4.5,
      reviews: "1,456 reviews",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=280&fit=crop",
      genre: "Philosophy",
      likes: "Adam and Kimberly like this",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  // Mock books of the year
  const mockBooksOfYear = [
    {
      id: "year1",
      title: "Big Magic: Creative Living Beyond Fear",
      author: "by Elizabeth Gilbert",
      rating: 4.8,
      reviews: "3,240 reviews",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=120&fit=crop"
    },
    {
      id: "year2",
      title: "The Painter's Daughter",
      author: "by Julie Klassen",
      rating: 4.5,
      reviews: "1,890 reviews",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=80&h=120&fit=crop"
    },
    {
      id: "year3",
      title: "Dark Murder",
      author: "by Helen H.",
      rating: 4.3,
      reviews: "967 reviews",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=120&fit=crop"
    },
    {
      id: "year4",
      title: "Alex Ferguson: My Autobiography",
      author: "by Alex Ferguson",
      rating: 4.6,
      reviews: "2,156 reviews",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=120&fit=crop"
    },
    {
      id: "year5",
      title: "The Devils Playground",
      author: "by Eliza Freed",
      rating: 4.4,
      reviews: "1,423 reviews",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=80&h=120&fit=crop"
    },
    {
      id: "year6",
      title: "INCONCEIVABLE",
      author: "by Ben Elton",
      rating: 4.2,
      reviews: "1,087 reviews",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=120&fit=crop"
    },
    {
      id: "year7",
      title: "FOUR DAYS",
      author: "by Ian Ryan",
      rating: 4.7,
      reviews: "1,834 reviews",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=80&h=120&fit=crop"
    }
  ];

  const genres = ["All Genres", "Business", "Science", "Fiction", "Philosophy", "Biography"];

  useEffect(() => {
    setFeaturedBooks(mockFeaturedBooks);
    setAuthorOfWeek(mockAuthors);
    setPopularBooks(allPopularBooks);
    setBooksOfYear(mockBooksOfYear);

    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockFeaturedBooks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter books by genre
  useEffect(() => {
    if (activeGenre === "All Genres") {
      setPopularBooks(allPopularBooks);
    } else {
      const filtered = allPopularBooks.filter(book => book.genre === activeGenre);
      setPopularBooks(filtered);
    }
  }, [activeGenre]);

  // Search functionality
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    // Add to browsing history and recent searches
    addToHistory(query);

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=8`
      );
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle history item click
  const handleHistoryClick = (historyQuery) => {
    setQuery(historyQuery);
    setShowHistory(false);
    setShowRecentSearches(false);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  // Handle recent search click
  const handleRecentSearchClick = (searchQuery) => {
    setQuery(searchQuery);
    setShowRecentSearches(false);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  // Show homepage content
  const showHomepage = () => {
    setSearchResults([]);
    setQuery("");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  // Book Details Modal Component
  const BookDetailsModal = ({ book, onClose, loading }) => {
    if (loading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading book details...</p>
            </div>
          </div>
        </div>
      );
    }

    if (!book) return null;

    const volumeInfo = book.volumeInfo;
    const saleInfo = book.saleInfo;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Book Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <img
                  src={volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || '/book-placeholder.png'}
                  alt={volumeInfo.title}
                  className="w-48 h-64 object-cover rounded-lg shadow-lg mx-auto"
                />
              </div>

              {/* Book Information */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{volumeInfo.title}</h1>
                <p className="text-xl text-gray-600 mb-4">
                  by {volumeInfo.authors?.join(', ') || 'Unknown Author'}
                </p>

                {/* Rating */}
                {volumeInfo.averageRating && (
                  <div className="flex items-center mb-4">
                    <StarRating rating={volumeInfo.averageRating} />
                    <span className="ml-2 text-gray-600">
                      ({volumeInfo.ratingsCount || 0} ratings)
                    </span>
                  </div>
                )}

                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {volumeInfo.publishedDate && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Published: {new Date(volumeInfo.publishedDate).getFullYear()}</span>
                    </div>
                  )}
                  
                  {volumeInfo.pageCount && (
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{volumeInfo.pageCount} pages</span>
                    </div>
                  )}
                  
                  {volumeInfo.categories && (
                    <div className="flex items-center text-gray-600">
                      <Bookmark className="w-4 h-4 mr-2" />
                      <span>Categories: {volumeInfo.categories.join(', ')}</span>
                    </div>
                  )}
                  
                  {volumeInfo.language && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>Language: {volumeInfo.language.toUpperCase()}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {volumeInfo.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {volumeInfo.description.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                )}

                {/* Additional Information */}
                <div className="space-y-3">
                  {volumeInfo.publisher && (
                    <div>
                      <span className="font-semibold">Publisher: </span>
                      <span className="text-gray-600">{volumeInfo.publisher}</span>
                    </div>
                  )}
                  
                  {volumeInfo.industryIdentifiers && (
                    <div>
                      <span className="font-semibold">ISBN: </span>
                      <span className="text-gray-600">
                        {volumeInfo.industryIdentifiers.map(id => `${id.type}: ${id.identifier}`).join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Buy Links */}
                {saleInfo?.buyLink && (
                  <div className="mt-6">
                    <a
                      href={saleInfo.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
                    >
                      Buy Now
                    </a>
                  </div>
                )}

                {/* Preview Link */}
                {volumeInfo.previewLink && (
                  <div className="mt-4">
                    <a
                      href={volumeInfo.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Preview this book
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-16 py-2 md:py-0">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer mb-2 md:mb-0">
              <Link href="./" className="flex items-center space-x-2 cursor-pointer">
                <motion.div
                  initial={{ rotate: -20, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                  className="p-2 bg-blue-100 rounded-full"
                >
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </motion.div>
                <motion.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.1, color: "#1d4ed8" }}
                  className="text-2xl font-extrabold text-blue-600"
                >
                  Lit
                  <span className="text-pink-500">seek</span>
                </motion.h1>
              </Link>
            </div>

            {/* Search Bar with History and Recent Searches */}
            <div className="w-full md:flex-1 max-w-lg mx-0 md:mx-8 mb-2 md:mb-0 relative">
              <div className="relative">
                {/* History and Recent Buttons */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <History
                    className="text-gray-400 w-8 h-5 cursor-pointer hover:text-gray-600"
                    onClick={() => {
                      setShowHistory(!showHistory);
                      setShowRecentSearches(false);
                      setShowNotifications(false);
                      setShowProfile(false);
                      setShowMenu(false);
                    }}
                  />
                
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Search Book..."
                  className="w-full pl-12 pr-20 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Search and Cancel Icons */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {query && (
                    <X
                      className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600"
                      onClick={clearSearch}
                    />
                  )}
                  <Search
                    className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600"
                    onClick={handleSearch}
                  />
                </div>

                {/* Recent Searches Dropdown */}
                {showRecentSearches && recentSearches.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-red-400 border rounded-lg shadow-lg max-h-96 overflow-y-auto z-20">
                    {/* <div className="p-3 border-b flex justify-between items-center"> */}
                      {/* <span className="font-semibold text-gray-700">Recent Searches</span> */}
                      {/* <button
                        onClick={clearRecentSearches}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Clear All
                      </button> */}
                    {/* </div> */}
                    {recentSearches.map((item) => (
                      <div
                        key={item.id}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center group"
                      >
                        {/* <div
                          onClick={() => handleRecentSearchClick(item.query)}
                          className="flex-1 flex items-center space-x-3"
                        >
                          <RotateCcw className="w-4 h-4 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-800">{item.query}</div>
                            <div className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</div>
                          </div>
                        </div> */}
                        <X
                          className="w-4 h-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteHistoryItem(item.id);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty Recent Searches Message */}
                {/* {showRecentSearches && recentSearches.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg p-4 z-20">
                    <div className="text-center text-gray-500 text-sm">
                      <RotateCcw className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      No recent searches
                    </div>
                  </div>
                )} */}

                {/* History Dropdown */}
                {showHistory && browsingHistory.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-20">
                    <div className="p-3 border-b flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Search History</span>
                      <button
                        onClick={clearHistory}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Clear All
                      </button>
                    </div>

                    {Object.entries(groupedHistory).map(([date, items]) => (
                      <div key={date} className="border-b last:border-b-0">
                        <div className="px-3 py-2 bg-gray-50 text-sm font-medium text-gray-600">
                          {formatDate(date)}
                        </div>
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center group"
                          >
                            <div
                              onClick={() => handleHistoryClick(item.query)}
                              className="flex-1"
                            >
                              <div className="text-sm text-gray-800">{item.query}</div>
                              <div className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</div>
                            </div>
                            <X
                              className="w-4 h-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => deleteHistoryItem(item.id)}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty History Message */}
                {showHistory && browsingHistory.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg p-4 z-20">
                    <div className="text-center text-gray-500 text-sm">
                      <History className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      No search history yet
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Favorites */}
              <div className="relative cursor-pointer" onClick={() => {
                setShowProfile(false);
                setShowMenu(false);
                setShowHistory(false);
                setShowRecentSearches(false);
              }}>


           <Link
                            href="/pages/favorite"
                            className="group relative overflow-hidden"
                        >
                <Heart className="w-7 h-8 text-red-500 fill-current hover:text-red-400 transition-colors md:w-8" />


                        </Link>




              </div>

              {/* Notification Bell */}
              <div className="relative cursor-pointer" onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
                setShowMenu(false);
                setShowHistory(false);
                setShowRecentSearches(false);
              }}>
                <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-3 z-10">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Notifications</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">New book added: <b>Atomic Habits</b></li>
                      <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Your review got 5 likes</li>
                      <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Friend request from Sabee'a</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors" onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                  setShowMenu(false);
                  setShowHistory(false);
                  setShowRecentSearches(false);
                }}>
                  <User className="w-5 h-5 text-white" />
                </div>
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 z-10">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
                    <Link className='text-red-500 text-sm text-left px-4 py-2' onClick={handleLogout}
                      href="./"
                    >Logout</Link>
                  </div>
                )}
              </div>

              {/* Menu */}
              <div className="relative">
                <Menu className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => {
                  setShowMenu(!showMenu);
                  setShowNotifications(false);
                  setShowProfile(false);
                  setShowHistory(false);
                  setShowRecentSearches(false);
                }} />
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2 z-10">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Explore</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Genres</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Back to Home Button (shown only when search results are displayed) */}
        {searchResults.length > 0 && (
          <div className="mb-4">
            <button
              onClick={showHomepage}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Search Results for "{query}"</h2>
              <button
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {searchResults.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {book.volumeInfo.authors?.join(", ")}
                    </p>
                    <button 
                      className="text-blue-600 text-xs hover:underline"
                      onClick={() => fetchBookDetails(book.id)}
                    >
                      More Info →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">Searching for books...</p>
          </div>
        )}

        {/* Homepage Content (only shown when no search results) */}
        {!loading && searchResults.length === 0 && (
          <>
            {/* Featured Books Carousel */}
            <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {featuredBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className={`w-full flex-shrink-0 ${book.color} p-4 sm:p-8 text-white relative`}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
                        <p className="text-lg opacity-90 mb-2">{book.author}</p>
                        <div className="flex items-center mb-4">
                          <StarRating rating={book.rating} />
                          <span className="ml-2 text-sm opacity-80">{book.reviews}</span>
                        </div>
                        <p className="text-sm opacity-90 mb-6 max-w-md">{book.description}</p>
                        <button className="bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                          See The Book
                        </button>
                      </div>
                      <div className="ml-8">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-32 h-44 sm:w-48 sm:h-64 object-cover rounded-lg shadow-2xl mx-auto sm:mx-0"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredBooks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
              {/* Left Sidebar */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-8 mb-4 lg:mb-0">
                {/* Author of the Week */}
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Author of the week</h3>
                  <div className="space-y-3">
                    {authorOfWeek.map((author, index) => (
                      <div key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700 hover:text-gray-900">{author.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Books of the Year */}
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Books of the year</h3>
                  <div className="space-y-4">
                    {booksOfYear.map((book, index) => (
                      <div key={book.id} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 leading-tight hover:text-blue-600 transition-colors">{book.title}</h4>
                          <p className="text-xs text-gray-600">{book.author}</p>
                          <div className="flex items-center mt-1">
                            <StarRating rating={book.rating} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Popular by Genre */}
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Popular by Genre</h3>
                  </div>

                  {/* Genre Tabs */}
                  <div className="flex flex-wrap space-x-2 sm:space-x-6 mb-4 sm:mb-6 border-b">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => setActiveGenre(genre)}
                        className={`pb-2 text-xs sm:text-sm font-medium transition-colors ${activeGenre === genre
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                          }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>

                  {/* Popular Books Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {popularBooks.map((book) => (
                      <div key={book.id} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 hover:bg-gray-50 p-2 sm:p-4 rounded-lg transition-colors">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg shadow-sm mx-auto sm:mx-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1 hover:text-blue-600 cursor-pointer transition-colors">{book.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                          </div>
                          <div className="flex items-center mb-2">
                            <StarRating rating={book.rating} />
                            <span className="ml-2 text-xs text-gray-500">{book.reviews}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">
                            {book.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
                              <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white"></div>
                            </div>
                            <span className="text-xs text-gray-500">{book.likes}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {popularBooks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No books found for "{activeGenre}" genre.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Book Details Modal */}
      {showBookDetails && (
        <BookDetailsModal 
          book={selectedBook} 
          onClose={closeBookDetails} 
          loading={bookDetailsLoading} 
        />
      )}
    </div>
  );
}