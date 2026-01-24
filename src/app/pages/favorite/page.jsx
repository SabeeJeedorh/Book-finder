"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Heart, ChevronLeft, X, BookOpen, Calendar, Trash2, Home, Search, Filter, Sparkles, BookmarkCheck, TrendingUp, Award, LayoutGrid, List, Clock, User, Tag, Plus } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("addedAt");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  // Listen for storage changes to sync favorites across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setTimeout(() => {
      setFavorites(savedFavorites);
      setFilteredFavorites(savedFavorites);
      setLoading(false);
    }, 300);
  }, []);

  // Filter and sort favorites when search term or sort changes
  useEffect(() => {
    let result = [...favorites];
    
    if (searchTerm.trim()) {
      result = result.filter(book => 
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.categories && book.categories.some(cat => 
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    switch (sortBy) {
      case "title":
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case "author":
        result.sort((a, b) => (a.author || '').localeCompare(b.author || ''));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "addedAt":
        result.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
    }
    
    setFilteredFavorites(result);
  }, [favorites, searchTerm, sortBy]);

  // Function to add book to favorites (can be imported in Homepage)
  const addToFavorites = (book) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Check if book already exists
    const exists = savedFavorites.some(fav => fav.id === book.id);
    if (exists) {
      showNotification(`"${book.title}" is already in favorites`);
      return;
    }
    
    // Add timestamp for when book was added
    const bookWithTimestamp = {
      ...book,
      addedAt: new Date().toISOString()
    };
    
    const updatedFavorites = [...savedFavorites, bookWithTimestamp];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Update state and dispatch event for cross-tab sync
    setFavorites(updatedFavorites);
    window.dispatchEvent(new Event('favoritesUpdated'));
    showNotification(`Added "${book.title}" to favorites`);
  };

  // Function to remove book from favorites
  const removeFromFavorites = (bookId, title) => {
    const updatedFavorites = favorites.filter(book => book.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
    showNotification(`Removed "${title}" from favorites`);
  };

  // Function to toggle favorite status
  const toggleFavorite = (book) => {
    const isFavorite = favorites.some(fav => fav.id === book.id);
    if (isFavorite) {
      removeFromFavorites(book.id, book.title);
    } else {
      addToFavorites(book);
    }
  };

  const clearAllFavorites = () => {
    if (showDeleteConfirm) {
      setFavorites([]);
      setFilteredFavorites([]);
      localStorage.setItem('favorites', '[]');
      setShowDeleteConfirm(false);
      window.dispatchEvent(new Event('favoritesUpdated'));
      showNotification("All favorites cleared");
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-in font-medium backdrop-blur-lg border border-white/20';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const calculateStats = () => {
    const totalPages = favorites.reduce((sum, book) => sum + (book.pageCount || 0), 0);
    const averageRating = favorites.length > 0 
      ? favorites.reduce((sum, book) => sum + (book.rating || 0), 0) / favorites.length 
      : 0;
    const topGenre = favorites.flatMap(b => b.categories || [])
      .reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});
    const mostCommon = Object.keys(topGenre).sort((a, b) => topGenre[b] - topGenre[a])[0];

    return { totalPages, averageRating, topGenre: mostCommon };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <Heart className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        .animate-pulse-heart {
          animation: pulse-heart 0.5s ease-in-out;
        }
      `}</style>

      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <Link href="/sections/Homepage" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300 group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Back</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
                    <Heart className="w-7 h-7 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    My Collection
                  </h1>
                  <p className="text-sm text-slate-500">
                    {favorites.length} {favorites.length === 1 ? 'book' : 'books'} saved
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {favorites.length > 0 && (
                <>
                  <button
                    onClick={clearAllFavorites}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      showDeleteConfirm 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105' 
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">{showDeleteConfirm ? 'Confirm?' : 'Clear All'}</span>
                  </button>
                  
                  <Link href="/sections/Homepage" className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium">
                    <Home className="w-4 h-4" />
                    <span className="text-sm">Home</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative max-w-md mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/60 shadow-2xl">
                <Heart className="w-24 h-24 text-slate-300 mx-auto mb-4" />
                <div className="absolute top-8 right-8">
                  <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
              </div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Your Collection Awaits
            </h2>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              Start building your personal library by adding books you love and want to read
            </p>
            <Link href="/sections/Homepage" className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <Search className="w-5 h-5" />
              <span>Discover Books</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{favorites.length}</div>
                <div className="text-sm text-slate-500 font-medium">Total Books</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{new Set(favorites.map(b => b.author)).size}</div>
                <div className="text-sm text-slate-500 font-medium">Authors</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}
                </div>
                <div className="text-sm text-slate-500 font-medium">Avg Rating</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1 truncate">
                  {stats.topGenre || 'N/A'}
                </div>
                <div className="text-sm text-slate-500 font-medium">Top Genre</div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/60">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by title, author, or genre..."
                      className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder-slate-400"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm("")} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-slate-700 font-medium"
                    >
                      <option value="addedAt">Recent</option>
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>

                  <div className="flex bg-white border-2 border-slate-200 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid" 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list" 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {(searchTerm || filteredFavorites.length !== favorites.length) && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Showing <span className="font-bold text-blue-600">{filteredFavorites.length}</span> of {favorites.length} books
                  </p>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Favorites Grid/List */}
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60">
                <Search className="w-20 h-20 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-700 mb-2">No books found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search</p>
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all font-medium"
                >
                  Show all books
                </button>
              </div>
            ) : (
              <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}`}>
                {filteredFavorites.map((book, index) => (
                  <div
                    key={book.id}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <div className={`relative ${viewMode === "list" ? "w-32 flex-shrink-0" : "h-72"} overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200`}>
                      {book.thumbnail ? (
                        <img
                          src={book.thumbnail}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-slate-300" />
                        </div>
                      )}
                      
                      <button
                        onClick={() => removeFromFavorites(book.id, book.title)}
                        className="absolute top-3 right-3 bg-white/95 hover:bg-white rounded-xl p-2 shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200 group/btn"
                      >
                        <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover/btn:scale-110 transition-transform" />
                      </button>
                      
                      {book.rating && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-sm">
                          {book.rating}
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-slate-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-slate-500 text-sm truncate">
                            {book.author || "Unknown Author"}
                          </p>
                        </div>
                        <BookmarkCheck className="w-5 h-5 text-blue-500 ml-3 flex-shrink-0" />
                      </div>

                      <div className="space-y-2 text-sm text-slate-600 mb-4">
                        {book.publishedDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                            <span>{new Date(book.publishedDate).getFullYear()}</span>
                          </div>
                        )}
                        
                        {book.pageCount && (
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-slate-400" />
                            <span>{book.pageCount.toLocaleString()} pages</span>
                          </div>
                        )}
                      </div>
                        
                      {book.categories && book.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {book.categories.slice(0, 2).map((category, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
                              {category}
                            </span>
                          ))}
                        </div>
                      )}

                      {book.addedAt && (
                        <div className="pt-4 border-t border-slate-100">
                          <div className="flex items-center text-xs text-slate-400">
                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                            <span>Added {getTimeAgo(book.addedAt)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {favorites.length > 0 && (
        <Link 
          href="/sections/Homepage" 
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 group"
        >
          <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Link>
      )}
    </div>
  );
}