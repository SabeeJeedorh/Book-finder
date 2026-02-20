"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Heart, ChevronLeft, X, BookOpen, Calendar, Trash2, Home, Search, Sparkles, BookmarkCheck, TrendingUp, Award, LayoutGrid, List, Clock, User, Tag, Star } from "lucide-react";

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

  const removeFromFavorites = (bookId, title) => {
    const updatedFavorites = favorites.filter(book => book.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
    showNotification(`Removed "${title}" from favorites`);
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
    notification.className = 'fixed top-4 left-4 right-4 sm:left-auto sm:right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl z-50 animate-slide-in font-medium backdrop-blur-lg border border-white/20 text-sm sm:text-base';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50/80 to-white flex items-center justify-center p-4">
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50">
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
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

      {/* Decorative background elements - red theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-red-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header - Red theme */}
      <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-red-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-0 sm:h-20 gap-3 sm:gap-0">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Link href="../Sections" className="flex items-center space-x-1 sm:space-x-2 text-red-700 hover:text-red-600 transition-all duration-300 group">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold text-sm sm:text-base">Back</span>
              </Link>
              
              <div className="flex items-center space-x-2 sm:hidden">
                <div className="bg-red-100 p-2 rounded-xl">
                  <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                </div>
                <h1 className="text-lg font-bold text-red-800">
                  My Collection
                </h1>
              </div>
            </div>
            
            <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end space-x-2 sm:space-x-3">
              {/* Desktop header */}
              <div className="hidden sm:flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-2xl blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-red-600 to-red-500 p-3 rounded-2xl">
                      <Heart className="w-7 h-7 text-white fill-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-red-800">
                      My Collection
                    </h1>
                    <p className="text-xs sm:text-sm text-red-600/70">
                      {favorites.length} {favorites.length === 1 ? 'book' : 'books'} saved
                    </p>
                  </div>
                </div>
              </div>
              
              {favorites.length > 0 && (
                <>
                  <button
                    onClick={clearAllFavorites}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-200 ${
                      showDeleteConfirm 
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg scale-105' 
                        : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{showDeleteConfirm ? 'Confirm?' : 'Clear All'}</span>
                  </button>
                  
                  <Link href="/sections/Homepage" className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2.5 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium">
                    <Home className="w-4 h-4" />
                    <span className="text-sm">Home</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile book count */}
          {favorites.length > 0 && (
            <div className="sm:hidden pb-2 text-xs text-red-600/70 border-t border-red-100 pt-2 mt-1">
              {favorites.length} {favorites.length === 1 ? 'book' : 'books'} saved
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        {favorites.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="relative max-w-md mx-auto mb-6 sm:mb-8 px-4">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur-3xl opacity-20"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-red-100 shadow-xl">
                <Heart className="w-16 h-16 sm:w-24 sm:h-24 text-red-200 mx-auto mb-4" />
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
                  <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-red-400 animate-pulse" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-red-800 mb-3 sm:mb-4 px-4">
              Your Collection Awaits
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-red-600/70 mb-6 sm:mb-8 max-w-md mx-auto px-4 leading-relaxed">
              Start building your personal library by adding books you love and want to read
            </p>
            <Link href="../Sections" className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Discover Books</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-8">
            {/* Stats Cards - Red theme */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:border-red-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg sm:rounded-xl">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800 mb-0.5 sm:mb-1">{favorites.length}</div>
                <div className="text-xs sm:text-sm text-red-600/70 font-medium">Total Books</div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:border-red-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg sm:rounded-xl">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800 mb-0.5 sm:mb-1">{new Set(favorites.map(b => b.author)).size}</div>
                <div className="text-xs sm:text-sm text-red-600/70 font-medium">Authors</div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:border-red-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg sm:rounded-xl">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800 mb-0.5 sm:mb-1">
                  {stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}
                </div>
                <div className="text-xs sm:text-sm text-red-600/70 font-medium">Avg Rating</div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:border-red-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg sm:rounded-xl">
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                <div className="text-sm sm:text-xl lg:text-2xl font-bold text-red-800 mb-0.5 sm:mb-1 truncate">
                  {stats.topGenre || 'N/A'}
                </div>
                <div className="text-xs sm:text-sm text-red-600/70 font-medium">Top Genre</div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-red-100">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by title, author, or genre..."
                      className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3.5 bg-white border-2 border-red-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base text-red-800 placeholder-red-300"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm("")} 
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 lg:flex-none">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border-2 border-red-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer text-sm sm:text-base text-red-800 font-medium"
                    >
                      <option value="addedAt">Recent</option>
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>

                  <div className="flex bg-white border-2 border-red-200 rounded-lg sm:rounded-xl p-0.5 sm:p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                        viewMode === "grid" 
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md' 
                          : 'text-red-400 hover:text-red-600'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                        viewMode === "list" 
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md' 
                          : 'text-red-400 hover:text-red-600'
                      }`}
                    >
                      <List className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {(searchTerm || filteredFavorites.length !== favorites.length) && (
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <p className="text-xs sm:text-sm text-red-600/70">
                    Showing <span className="font-bold text-red-600">{filteredFavorites.length}</span> of {favorites.length} books
                  </p>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Favorites Grid/List - Red theme */}
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-12 sm:py-16 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-red-100 px-4">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-red-200 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-800 mb-2">No books found</h3>
                <p className="text-sm sm:text-base text-red-600/70 mb-4 sm:mb-6">Try adjusting your search</p>
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-xl transition-all font-medium text-sm sm:text-base"
                >
                  Show all books
                </button>
              </div>
            ) : (
              <div className={`${viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6" 
                : "flex flex-col gap-3 sm:gap-4"
              }`}>
                {filteredFavorites.map((book, index) => (
                  <div
                    key={book.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-red-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group ${
                      viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                    }`}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <div className={`relative ${
                      viewMode === "list" 
                        ? "w-full sm:w-28 lg:w-32 h-40 sm:h-28 lg:h-32 flex-shrink-0" 
                        : "w-full h-48 sm:h-56 lg:h-64 xl:h-72"
                    } overflow-hidden bg-gradient-to-br from-red-50 to-orange-50`}>
                      {book.thumbnail ? (
                        <img
                          src={book.thumbnail}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-red-200" />
                        </div>
                      )}
                      
                      <button
                        onClick={() => removeFromFavorites(book.id, book.title)}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/95 hover:bg-red-50 rounded-lg sm:rounded-xl p-1.5 sm:p-2 shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200 group/btn"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 fill-red-600 group-hover/btn:scale-110 transition-transform" />
                      </button>
                      
                      {book.rating && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          {book.rating}
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-3 sm:p-4 lg:p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm sm:text-base lg:text-lg text-red-800 line-clamp-2 mb-0.5 sm:mb-1 group-hover:text-red-600 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-red-600/70 truncate">
                            {book.author || "Unknown Author"}
                          </p>
                        </div>
                        <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 ml-2 flex-shrink-0" />
                      </div>

                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-red-600/70 mb-3 sm:mb-4">
                        {book.publishedDate && (
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-red-400" />
                            <span>{new Date(book.publishedDate).getFullYear()}</span>
                          </div>
                        )}
                        
                        {book.pageCount && (
                          <div className="flex items-center">
                            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-red-400" />
                            <span>{book.pageCount.toLocaleString()} pages</span>
                          </div>
                        )}
                      </div>
                        
                      {book.categories && book.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {book.categories.slice(0, 2).map((category, idx) => (
                            <span key={idx} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-50 text-red-700 rounded-md sm:rounded-lg text-xs font-medium border border-red-100">
                              {category.length > 15 ? `${category.slice(0, 15)}...` : category}
                            </span>
                          ))}
                          {book.categories.length > 2 && (
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-50 text-red-600 rounded-md sm:rounded-lg text-xs font-medium border border-red-100">
                              +{book.categories.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {book.addedAt && (
                        <div className="pt-2 sm:pt-3 lg:pt-4 border-t border-red-100">
                          <div className="flex items-center text-xs text-red-400">
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
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

      {/* Floating Action Button - Red theme */}
      {favorites.length > 0 && (
        <Link 
          href="/sections/Homepage" 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 group"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform" />
        </Link>
      )}
    </div>
  );
}