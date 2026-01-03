// // "use client"
// // import { useState, useEffect } from "react";
// // import Link from 'next/link';  // For Next.js 13+ App Routerimport { Heart, ChevronLeft, Star, X, BookOpen, Calendar, Bookmark, Trash2, Home } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";

// // export default function FavoritesPage() {
// //   const [favorites, setFavorites] = useState([]);
// //   const [filteredFavorites, setFilteredFavorites] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [sortBy, setSortBy] = useState("addedAt");
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

// //   // Load favorites from localStorage on component mount
// //   useEffect(() => {
// //     const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
// //     setFavorites(savedFavorites);
// //     setFilteredFavorites(savedFavorites);
// //   }, []);

// //   // Filter and sort favorites when search term or sort changes
// //   useEffect(() => {
// //     let result = [...favorites];
    
// //     // Filter by search term
// //     if (searchTerm.trim()) {
// //       result = result.filter(book => 
// //         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         (book.categories && book.categories.some(cat => 
// //           cat.toLowerCase().includes(searchTerm.toLowerCase())
// //         ))
// //       );
// //     }
    
// //     // Sort results
// //     switch (sortBy) {
// //       case "title":
// //         result.sort((a, b) => a.title.localeCompare(b.title));
// //         break;
// //       case "author":
// //         result.sort((a, b) => a.author.localeCompare(b.author));
// //         break;
// //       case "rating":
// //         result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
// //         break;
// //       case "addedAt":
// //         result.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
// //         break;
// //       default:
// //         break;
// //     }
    
// //     setFilteredFavorites(result);
// //   }, [favorites, searchTerm, sortBy]);

// //   // Remove from favorites
// //   const removeFromFavorites = (bookId) => {
// //     const updatedFavorites = favorites.filter(book => book.id !== bookId);
// //     setFavorites(updatedFavorites);
// //     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
// //   };

// //   // Clear all favorites with confirmation
// //   const clearAllFavorites = () => {
// //     if (showDeleteConfirm) {
// //       setFavorites([]);
// //       setFilteredFavorites([]);
// //       localStorage.setItem('favorites', '[]');
// //       setShowDeleteConfirm(false);
// //     } else {
// //       setShowDeleteConfirm(true);
// //       setTimeout(() => setShowDeleteConfirm(false), 3000);
// //     }
// //   };

// //   const StarRating = ({ rating }) => {
// //     return (
// //       <div className="flex items-center">
// //         {[1, 2, 3, 4, 5].map((star) => (
// //           <Star
// //             key={star}
// //             className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
// //           />
// //         ))}
// //         {rating && <span className="ml-1 text-sm text-gray-600">{rating}</span>}
// //       </div>
// //     );
// //   };

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(yesterday.getDate() - 1);
    
// //     if (date.toDateString() === today.toDateString()) {
// //       return "Today";
// //     } else if (date.toDateString() === yesterday.toDateString()) {
// //       return "Yesterday";
// //     } else {
// //       return date.toLocaleDateString('en-US', {
// //         month: 'short',
// //         day: 'numeric',
// //         year: 'numeric'
// //       });
// //     }
// //   };
// // link
// //   const getTimeAgo = (dateString) => {
// //     const date = new Date(dateString);
// //     const now = new Date();
// //     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
// //     if (diffInHours < 24) {
// //       return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
// //     } else {
// //       const diffInDays = Math.floor(diffInHours / 24);
// //       return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm border-b sticky top-0 z-10">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             <div className="flex items-center space-x-4">
// //               <Link 
// //                 href="./Sections/page.jsx" 
// //                 className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors group"
// //               >
// //                 <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
// //                 <span>Back to Home</span>
// //               </Link>
// //               <div className="flex items-center space-x-3">
// //                 <Heart className="w-8 h-8 text-red-500 fill-current" />
// //                 <h1 className="text-2xl font-bold text-gray-800">My Favorites</h1>
// //                 {favorites.length > 0 && (
// //                   <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
// //                     {favorites.length} {favorites.length === 1 ? 'book' : 'books'}
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
            
// //             <div className="flex items-center space-x-4">
// //               {favorites.length > 0 && (
// //                 <>
// //                   <button
// //                     onClick={clearAllFavorites}
// //                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
// //                       showDeleteConfirm 
// //                         ? 'bg-red-100 text-red-600 hover:bg-red-200' 
// //                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
// //                     }`}
// //                   >
// //                     {showDeleteConfirm ? (
// //                       <>
// //                         <span>Click again to confirm</span>
// //                         <Trash2 className="w-4 h-4" />
// //                       </>
// //                     ) : (
// //                       <>
// //                         <Trash2 className="w-4 h-4" />
// //                         <span>Clear All</span>
// //                       </>
// //                     )}
// //                   </button>
                  
// //                   <Link
// //                     href="/"
// //                     className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //                   >
// //                     <Home className="w-4 h-4" />
// //                     <span>Home</span>
// //                   </Link>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {favorites.length === 0 ? (
// //           <div className="text-center py-16">
// //             <motion.div
// //               initial={{ scale: 0.8, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               transition={{ duration: 0.5 }}
// //               className="max-w-md mx-auto"
// //             >
// //               <div className="relative">
// //                 <Heart className="w-32 h-32 text-gray-200 mx-auto mb-6" />
// //                 <motion.div
// //                   animate={{ scale: [1, 1.1, 1] }}
// //                   transition={{ repeat: Infinity, duration: 2 }}
// //                   className="absolute inset-0 flex items-center justify-center"
// //                 >
// //                   <Heart className="w-16 h-16 text-red-400 fill-current" />
// //                 </motion.div>
// //               </div>
// //               <h2 className="text-3xl font-bold text-gray-600 mb-4">No Favorite Books Yet</h2>
// //               <p className="text-gray-500 mb-8 text-lg">
// //                 Your favorite books will appear here. Start exploring and add some books to your collection!
// //               </p>
// //               <Link
// //                 href="/"
// //                 className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
// //               >
// //                 <Home className="w-5 h-5" />
// //                 <span>Explore Books</span>
// //               </Link>
// //             </motion.div>
// //           </div>
// //         ) : (
// //           <div className="space-y-8">
// //             {/* Search and Filter Bar */}
// //             <div className="bg-white rounded-xl shadow-sm p-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {/* Search Input */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Search in favorites
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type="text"
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                       placeholder="Search by title, author, or category..."
// //                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     />
// //                     <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
// //                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                       </svg>
// //                     </div>
// //                     {searchTerm && (
// //                       <button
// //                         onClick={() => setSearchTerm("")}
// //                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                       >
// //                         <X className="w-4 h-4" />
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Sort Dropdown */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Sort by
// //                   </label>
// //                   <select
// //                     value={sortBy}
// //                     onChange={(e) => setSortBy(e.target.value)}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   >
// //                     <option value="addedAt">Recently Added</option>
// //                     <option value="title">Title (A-Z)</option>
// //                     <option value="author">Author (A-Z)</option>
// //                     <option value="rating">Highest Rated</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Stats */}
// //               <div className="mt-6 flex flex-wrap gap-4">
// //                 <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
// //                   <span className="font-medium">{filteredFavorites.length}</span> books found
// //                 </div>
// //                 {searchTerm && (
// //                   <div className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg">
// //                     Search: "{searchTerm}"
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Favorites Grid */}
// //             <AnimatePresence>
// //               {filteredFavorites.length === 0 ? (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   exit={{ opacity: 0 }}
// //                   className="text-center py-16 bg-white rounded-xl shadow-sm"
// //                 >
// //                   <p className="text-gray-500 text-lg">No books match your search criteria.</p>
// //                   <button
// //                     onClick={() => setSearchTerm("")}
// //                     className="mt-4 text-blue-600 hover:text-blue-800"
// //                   >
// //                     Clear search
// //                   </button>
// //                 </motion.div>
// //               ) : (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                   {filteredFavorites.map((book, index) => (
// //                     <motion.div
// //                       key={book.id}
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0, scale: 0.9 }}
// //                       transition={{ delay: index * 0.05 }}
// //                       className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
// //                     >
// //                       {/* Book Image Section */}
// //                       <div className="relative h-48 overflow-hidden">
// //                         {book.thumbnail ? (
// //                           <img
// //                             src={book.thumbnail}
// //                             alt={book.title}
// //                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                           />
// //                         ) : (
// //                           <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
// //                             <BookOpen className="w-16 h-16 text-gray-400" />
// //                           </div>
// //                         )}
                        
// //                         {/* Favorite Button */}
// //                         <button
// //                           onClick={() => removeFromFavorites(book.id)}
// //                           className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110"
// //                         >
// //                           <Heart className="w-5 h-5 text-red-500 fill-current" />
// //                         </button>
                        
// //                         {/* Category Badge */}
// //                         {book.categories && book.categories.length > 0 && (
// //                           <div className="absolute bottom-3 left-3">
// //                             <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
// //                               {book.categories[0]}
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
                      
// //                       {/* Book Info Section */}
// //                       <div className="p-5">
// //                         <div className="flex justify-between items-start mb-3">
// //                           <div className="flex-1">
// //                             <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-1">
// //                               {book.title}
// //                             </h3>
// //                             <p className="text-gray-600 text-sm">
// //                               by {book.author || "Unknown Author"}
// //                             </p>
// //                           </div>
// //                         </div>
                        
// //                         {/* Rating */}
// //                         {book.rating && (
// //                           <div className="flex items-center mb-4">
// //                             <StarRating rating={book.rating} />
// //                             {book.ratingsCount && (
// //                               <span className="ml-2 text-sm text-gray-500">
// //                                 ({book.ratingsCount} ratings)
// //                               </span>
// //                             )}
// //                           </div>
// //                         )}

// //                         {/* Book Details */}
// //                         <div className="space-y-2 text-sm text-gray-500 mb-4">
// //                           {book.publishedDate && (
// //                             <div className="flex items-center">
// //                               <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
// //                               <span>Published: {new Date(book.publishedDate).getFullYear()}</span>
// //                             </div>
// //                           )}
                          
// //                           {book.pageCount && (
// //                             <div className="flex items-center">
// //                               <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
// //                               <span>{book.pageCount.toLocaleString()} pages</span>
// //                             </div>
// //                           )}
                          
// //                           {book.categories && book.categories.length > 1 && (
// //                             <div className="flex items-start">
// //                               <Bookmark className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
// //                               <span className="line-clamp-2">
// //                                 {book.categories.slice(0, 2).join(', ')}
// //                                 {book.categories.length > 2 && '...'}
// //                               </span>
// //                             </div>
// //                           )}
// //                         </div>

// //                         {/* Added Date */}
// //                         {book.addedAt && (
// //                           <div className="pt-4 border-t border-gray-100">
// //                             <div className="flex items-center justify-between">
// //                               <span className="text-xs text-gray-400">
// //                                 Added {getTimeAgo(book.addedAt)}
// //                               </span>
// //                               <span className="text-xs text-gray-400">
// //                                 {formatDate(book.addedAt)}
// //                               </span>
// //                             </div>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               )}
// //             </AnimatePresence>

// //             {/* Quick Stats */}
// //             <div className="bg-white rounded-xl shadow-sm p-6">
// //               <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Favorites Stats</h3>
// //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //                 <div className="text-center p-4 bg-blue-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-blue-600">{favorites.length}</div>
// //                   <div className="text-sm text-gray-600">Total Books</div>
// //                 </div>
// //                 <div className="text-center p-4 bg-green-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-green-600">
// //                     {favorites.filter(b => b.rating >= 4).length}
// //                   </div>
// //                   <div className="text-sm text-gray-600">Highly Rated (4+ stars)</div>
// //                 </div>
// //                 <div className="text-center p-4 bg-purple-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-purple-600">
// //                     {new Set(favorites.map(b => b.author)).size}
// //                   </div>
// //                   <div className="text-sm text-gray-600">Different Authors</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// "use client"
// import { useState, useEffect } from "react";
// import Link from 'next/link';  // For Next.js 13+ App Router
// import { Heart, ChevronLeft, Star, X, BookOpen, Calendar, Bookmark, Trash2, Home } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function FavoritesPage() {
//   const [favorites, setFavorites] = useState([]);
//   const [filteredFavorites, setFilteredFavorites] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("addedAt");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   // Load favorites from localStorage on component mount
//   useEffect(() => {
//     const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//     setFavorites(savedFavorites);
//     setFilteredFavorites(savedFavorites);
//   }, []);

//   // Filter and sort favorites when search term or sort changes
//   useEffect(() => {
//     let result = [...favorites];
    
//     // Filter by search term
//     if (searchTerm.trim()) {
//       result = result.filter(book => 
//         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (book.categories && book.categories.some(cat => 
//           cat.toLowerCase().includes(searchTerm.toLowerCase())
//         ))
//       );
//     }
    
//     // Sort results
//     switch (sortBy) {
//       case "title":
//         result.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case "author":
//         result.sort((a, b) => a.author.localeCompare(b.author));
//         break;
//       case "rating":
//         result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//       case "addedAt":
//         result.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
//         break;
//       default:
//         break;
//     }
    
//     setFilteredFavorites(result);
//   }, [favorites, searchTerm, sortBy]);

//   // Remove from favorites
//   const removeFromFavorites = (bookId) => {
//     const updatedFavorites = favorites.filter(book => book.id !== bookId);
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   // Clear all favorites with confirmation
//   const clearAllFavorites = () => {
//     if (showDeleteConfirm) {
//       setFavorites([]);
//       setFilteredFavorites([]);
//       localStorage.setItem('favorites', '[]');
//       setShowDeleteConfirm(false);
//     } else {
//       setShowDeleteConfirm(true);
//       setTimeout(() => setShowDeleteConfirm(false), 3000);
//     }
//   };

//   const StarRating = ({ rating }) => {
//     return (
//       <div className="flex items-center">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//           />
//         ))}
//         {rating && <span className="ml-1 text-sm text-gray-600">{rating}</span>}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
    
//     if (date.toDateString() === today.toDateString()) {
//       return "Today";
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return "Yesterday";
//     } else {
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       });
//     }
//   };

//   const getTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 24) {
//       return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
//     } else {
//       const diffInDays = Math.floor(diffInHours / 24);
//       return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-4">
//               <Link 
//                 href="/sections/Homepage" 
//                 className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors group"
//               >
//                 <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//                 <span>Back to Home</span>
//               </Link>
//               <div className="flex items-center space-x-3">
//                 <Heart className="w-8 h-8 text-red-500 fill-current" />
//                 <h1 className="text-2xl font-bold text-gray-800">My Favorites</h1>
//                 {favorites.length > 0 && (
//                   <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
//                     {favorites.length} {favorites.length === 1 ? 'book' : 'books'}
//                   </span>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               {favorites.length > 0 && (
//                 <>
//                   <button
//                     onClick={clearAllFavorites}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
//                       showDeleteConfirm 
//                         ? 'bg-red-100 text-red-600 hover:bg-red-200' 
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     {showDeleteConfirm ? (
//                       <>
//                         <span>Click again to confirm</span>
//                         <Trash2 className="w-4 h-4" />
//                       </>
//                     ) : (
//                       <>
//                         <Trash2 className="w-4 h-4" />
//                         <span>Clear All</span>
//                       </>
//                     )}
//                   </button>
                  
//                   <Link
//                     href="/sections/Homepage"
//                     className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <Home className="w-4 h-4" />
//                     <span>Home</span>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {favorites.length === 0 ? (
//           <div className="text-center py-16">
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               className="max-w-md mx-auto"
//             >
//               <div className="relative">
//                 <Heart className="w-32 h-32 text-gray-200 mx-auto mb-6" />
//                 <motion.div
//                   animate={{ scale: [1, 1.1, 1] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                   className="absolute inset-0 flex items-center justify-center"
//                 >
//                   <Heart className="w-16 h-16 text-red-400 fill-current" />
//                 </motion.div>
//               </div>
//               <h2 className="text-3xl font-bold text-gray-600 mb-4">No Favorite Books Yet</h2>
//               <p className="text-gray-500 mb-8 text-lg">
//                 Your favorite books will appear here. Start exploring and add some books to your collection!
//               </p>
//               <Link
//                 href="/sections/Homepage"
//                 className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Explore Books</span>
//               </Link>
//             </motion.div>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {/* Search and Filter Bar */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Search Input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Search in favorites
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       placeholder="Search by title, author, or category..."
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                     </div>
//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm("")}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Sort Dropdown */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Sort by
//                   </label>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="addedAt">Recently Added</option>
//                     <option value="title">Title (A-Z)</option>
//                     <option value="author">Author (A-Z)</option>
//                     <option value="rating">Highest Rated</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="mt-6 flex flex-wrap gap-4">
//                 <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
//                   <span className="font-medium">{filteredFavorites.length}</span> books found
//                 </div>
//                 {searchTerm && (
//                   <div className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg">
//                     Search: "{searchTerm}"
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Favorites Grid */}
//             <AnimatePresence>
//               {filteredFavorites.length === 0 ? (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="text-center py-16 bg-white rounded-xl shadow-sm"
//                 >
//                   <p className="text-gray-500 text-lg">No books match your search criteria.</p>
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="mt-4 text-blue-600 hover:text-blue-800"
//                   >
//                     Clear search
//                   </button>
//                 </motion.div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredFavorites.map((book, index) => (
//                     <motion.div
//                       key={book.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
//                     >
//                       {/* Book Image Section */}
//                       <div className="relative h-48 overflow-hidden">
//                         {book.thumbnail ? (
//                           <img
//                             src={book.thumbnail}
//                             alt={book.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
//                             <BookOpen className="w-16 h-16 text-gray-400" />
//                           </div>
//                         )}
                        
//                         {/* Favorite Button */}
//                         <button
//                           onClick={() => removeFromFavorites(book.id)}
//                           className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110"
//                         >
//                           <Heart className="w-5 h-5 text-red-500 fill-current" />
//                         </button>
                        
//                         {/* Category Badge */}
//                         {book.categories && book.categories.length > 0 && (
//                           <div className="absolute bottom-3 left-3">
//                             <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
//                               {book.categories[0]}
//                             </span>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Book Info Section */}
//                       <div className="p-5">
//                         <div className="flex justify-between items-start mb-3">
//                           <div className="flex-1">
//                             <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-1">
//                               {book.title}
//                             </h3>
//                             <p className="text-gray-600 text-sm">
//                               by {book.author || "Unknown Author"}
//                             </p>
//                           </div>
//                         </div>
                        
//                         {/* Rating */}
//                         {book.rating && (
//                           <div className="flex items-center mb-4">
//                             <StarRating rating={book.rating} />
//                             {book.ratingsCount && (
//                               <span className="ml-2 text-sm text-gray-500">
//                                 ({book.ratingsCount} ratings)
//                               </span>
//                             )}
//                           </div>
//                         )}

//                         {/* Book Details */}
//                         <div className="space-y-2 text-sm text-gray-500 mb-4">
//                           {book.publishedDate && (
//                             <div className="flex items-center">
//                               <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
//                               <span>Published: {new Date(book.publishedDate).getFullYear()}</span>
//                             </div>
//                           )}
                          
//                           {book.pageCount && (
//                             <div className="flex items-center">
//                               <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
//                               <span>{book.pageCount.toLocaleString()} pages</span>
//                             </div>
//                           )}
                          
//                           {book.categories && book.categories.length > 1 && (
//                             <div className="flex items-start">
//                               <Bookmark className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
//                               <span className="line-clamp-2">
//                                 {book.categories.slice(0, 2).join(', ')}
//                                 {book.categories.length > 2 && '...'}
//                               </span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Added Date */}
//                         {book.addedAt && (
//                           <div className="pt-4 border-t border-gray-100">
//                             <div className="flex items-center justify-between">
//                               <span className="text-xs text-gray-400">
//                                 Added {getTimeAgo(book.addedAt)}
//                               </span>
//                               <span className="text-xs text-gray-400">
//                                 {formatDate(book.addedAt)}
//                               </span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </AnimatePresence>

//             {/* Quick Stats */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Favorites Stats</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center p-4 bg-blue-50 rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">{favorites.length}</div>
//                   <div className="text-sm text-gray-600">Total Books</div>
//                 </div>
//                 <div className="text-center p-4 bg-green-50 rounded-lg">
//                   <div className="text-2xl font-bold text-green-600">
//                     {favorites.filter(b => b.rating >= 4).length}
//                   </div>
//                   <div className="text-sm text-gray-600">Highly Rated (4+ stars)</div>
//                 </div>
//                 <div className="text-center p-4 bg-purple-50 rounded-lg">
//                   <div className="text-2xl font-bold text-purple-600">
//                     {new Set(favorites.map(b => b.author)).size}
//                   </div>
//                   <div className="text-sm text-gray-600">Different Authors</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Heart, ChevronLeft, Star, X, BookOpen, Calendar, Bookmark, Trash2, Home, Search, Filter, Sparkles, BookmarkCheck, TrendingUp, Award } from "lucide-react";

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
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-in font-medium';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 transition-all ${star <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      {rating && <span className="ml-2 text-sm text-gray-600 font-medium">{rating}</span>}
    </div>
  );

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
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="relative">
          <Heart className="w-16 h-16 text-pink-500 animate-pulse" />
          <div className="absolute inset-0 bg-pink-200 rounded-full blur-xl opacity-50 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}} />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link href="/sections/Homepage" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-all duration-300 group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Heart className="w-10 h-10 text-red-500 fill-red-500 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-red-400 rounded-full blur-md opacity-30 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">My Favorites</h1>
                  <p className="text-sm text-gray-600">Your personal book collection</p>
                </div>
                {favorites.length > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    {favorites.length} {favorites.length === 1 ? 'book' : 'books'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {favorites.length > 0 && (
                <>
                  <button
                    onClick={clearAllFavorites}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      showDeleteConfirm 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {showDeleteConfirm ? (
                      <>
                        <span className="text-sm font-medium">Click again to confirm</span>
                        <Trash2 className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Clear All</span>
                      </>
                    )}
                  </button>
                  
                  <Link href="/sections/Homepage" className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all duration-200">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
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
            <div className="relative max-w-md mx-auto">
              <Heart className="w-48 h-48 text-gray-200 mx-auto mb-6" />
              <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <Heart className="w-24 h-24 text-pink-400 fill-pink-400 drop-shadow-2xl" />
              </div>
              <div className="absolute -top-4 -right-4 animate-float">
                <Sparkles className="w-12 h-12 text-yellow-400" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Your Library Awaits
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              Start your reading journey! Add books you love and build your personal collection.
            </p>
            <Link href="/sections/Homepage" className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <Home className="w-5 h-5" />
              <span className="text-lg">Explore Books</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Search and Filter Bar */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Search className="w-4 h-4 mr-2 text-indigo-600" />
                    Search in favorites
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by title, author, or category..."
                      className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    {searchTerm && (
                      <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-indigo-600" />
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="addedAt">Recently Added</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="author">Author (A-Z)</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">View Mode</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        viewMode === "grid" 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        viewMode === "list" 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">
                  <span className="font-bold">{filteredFavorites.length}</span> books found
                </div>
                {searchTerm && (
                  <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full border border-purple-200">
                    Search: "{searchTerm}"
                  </div>
                )}
              </div>
            </div>

            {/* Favorites Grid/List */}
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl">
                <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No books found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
                <button onClick={() => setSearchTerm("")} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-xl transition-all">
                  Clear search
                </button>
              </div>
            ) : (
              <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"}`}>
                {filteredFavorites.map((book, index) => (
                  <div
                    key={book.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "h-64"} overflow-hidden`}>
                      {book.thumbnail ? (
                        <img
                          src={book.thumbnail}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                          <BookOpen className="w-20 h-20 text-gray-400" />
                        </div>
                      )}
                      
                      <button
                        onClick={() => removeFromFavorites(book.id, book.title)}
                        className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200"
                      >
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      </button>
                      
                      {book.categories && book.categories.length > 0 && (
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                            {book.categories[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-gray-800 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            by <span className="font-medium">{book.author || "Unknown Author"}</span>
                          </p>
                        </div>
                        <BookmarkCheck className="w-5 h-5 text-green-500 ml-4" />
                      </div>
                      
                      {book.rating && (
                        <div className="flex items-center mb-4">
                          <StarRating rating={book.rating} />
                          {book.ratingsCount && (
                            <span className="ml-2 text-sm text-gray-500">
                              ({book.ratingsCount.toLocaleString()} ratings)
                            </span>
                          )}
                        </div>
                      )}

                      <div className="space-y-3 text-sm text-gray-600 mb-6">
                        {book.publishedDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>Published: {new Date(book.publishedDate).getFullYear()}</span>
                          </div>
                        )}
                        
                        {book.pageCount && (
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                            <span>{book.pageCount.toLocaleString()} pages</span>
                          </div>
                        )}
                        
                        {book.categories && book.categories.length > 1 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {book.categories.slice(0, 3).map((category, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-xs border border-gray-200">
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {book.addedAt && (
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Added {getTimeAgo(book.addedAt)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatDate(book.addedAt)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                  <TrendingUp className="w-7 h-7 mr-3 text-indigo-600" />
                  Your Reading Journey
                </h3>
                <Award className="w-10 h-10 text-yellow-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{favorites.length}</div>
                  <div className="text-sm text-blue-700 font-medium">Total Books</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 text-center hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {favorites.filter(b => b.rating >= 4).length}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Highly Rated (4+ ⭐)</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 text-center hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {new Set(favorites.map(b => b.author)).size}
                  </div>
                  <div className="text-sm text-purple-700 font-medium">Different Authors</div>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200 text-center hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-4xl font-bold text-pink-600 mb-2">
                    {stats.totalPages.toLocaleString()}
                  </div>
                  <div className="text-sm text-pink-700 font-medium">Total Pages</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/60 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Average Rating</div>
                  <div className="text-xl font-bold text-gray-800">
                    {stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'} ⭐
                  </div>
                </div>
                <div className="bg-white/60 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Favorite Genre</div>
                  <div className="text-xl font-bold text-gray-800">
                    {stats.topGenre || 'None'}
                  </div>
                </div>
                <div className="bg-white/60 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Books per Month</div>
                  <div className="text-xl font-bold text-gray-800">
                    {Math.round(favorites.length / 12) || 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link href="/sections/Homepage" className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 animate-float">
        <Home className="w-7 h-7" />
      </Link>
    </div>
  );
}